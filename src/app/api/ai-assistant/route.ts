import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { buildUserContext, formatContextForPrompt } from "@/lib/ai-context-builder";
import { searchSimilarChunks } from "@/lib/vector-search-service";

// Increase timeout for Vercel (max 60s on Pro plan, 10s on Hobby)
export const maxDuration = 30;

interface AppError extends Error {
  code?: string;
  stack?: string;
}

interface UploadedFile {
  name: string;
  type: string;
  content: string; // Assuming the file content is plain text or base64
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Initialize the Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token and get user info
    let userId: string;
    let organizationId: string | null = null;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      userId = decoded.userId;

      // Get user's organization
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, organizationId: true },
      });

      if (user) {
        organizationId = user.organizationId;
      }
    } catch (authError) {
      console.error("Authentication error:", authError);
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // Parse the request body
    const { messages, fileData } = await request.json();

    // Check if the API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    // Build user context (Year Plan, Timesheets, Budgets, Performance)
    const userContext = await buildUserContext(userId, organizationId);
    const contextText = formatContextForPrompt(userContext);

    // Get all AI-readable documents for semantic search
    const whereClause: {
      isAiReadable: boolean
      OR: Array<{
        userId?: string | null
        organizationId?: string | null
      }>
    } = {
      isAiReadable: true,
      OR: [],
    }

    if (userId) {
      whereClause.OR.push({
        userId: userId,
        organizationId: null,
      })
    }

    if (organizationId) {
      whereClause.OR.push({
        organizationId: organizationId,
        userId: null,
      })
    }

    const aiReadableDocs = await prisma.document.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
      },
    })

    // Prepare the chat history for Gemini
    const chatHistory = [];
    let userPrompt = "";

    // Format previous messages for chat history
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      chatHistory.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      });
    }

    // Get the latest user message
    let relevantDocumentContent = ""
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "user") {
        userPrompt = lastMsg.content;

        // Perform semantic search across all AI-readable documents
        if (aiReadableDocs.length > 0 && userPrompt.trim().length > 10) {
          // Search each document for relevant content
          const searchPromises = aiReadableDocs.map(async (doc) => {
            try {
              const results = await searchSimilarChunks(
                userPrompt,
                doc.id,
                undefined, // No filters
                3 // Top 3 most relevant chunks per document
              )
              return {
                documentName: doc.name,
                chunks: results,
              }
            } catch (error) {
              console.error(`Error searching document ${doc.id}:`, error)
              return null
            }
          })

          const searchResults = await Promise.allSettled(searchPromises)
          const relevantChunks: Array<{ documentName: string; chunkText: string; similarity: number }> = []

          searchResults.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
              result.value.chunks.forEach(chunk => {
                if (chunk.similarity > 0.7) { // Only include chunks with >70% similarity
                  relevantChunks.push({
                    documentName: result.value!.documentName,
                    chunkText: chunk.chunkText,
                    similarity: chunk.similarity,
                  })
                }
              })
            }
          })

          // Sort by similarity and take top 5 chunks
          relevantChunks.sort((a, b) => b.similarity - a.similarity)
          const topChunks = relevantChunks.slice(0, 5)

          if (topChunks.length > 0) {
            relevantDocumentContent = "\n\n**Relevant content from your documents:**\n\n"
            topChunks.forEach((chunk, idx) => {
              relevantDocumentContent += `[From "${chunk.documentName}" - ${(chunk.similarity * 100).toFixed(0)}% match]\n${chunk.chunkText}\n\n`
            })
          }
        }

        // Add file content if there are attachments
        if (fileData && fileData.length > 0) {
          const files: UploadedFile[] = fileData;
          const fileContents = files
            .map((file) => file.content)
            .join("\n");
          userPrompt += `\n\nAttached file contents:\n${fileContents}`;
        }
        
      }
    }

    // Build enhanced system instruction with context
    const systemInstructionText = `You are an AI assistant helping with budget management, timesheet tracking, and planning.

Your capabilities:
- Answer questions about budgets, expenses, and financial planning
- Provide insights about timesheet data and work performance
- Reference and explain content from the user's AI-readable documents (including plan documents)
- Compare actual performance against planned goals
- Suggest activities and strategies based on available documents

Please format your responses using markdown for better readability. Use headers, lists, code blocks, bold, and italic text where appropriate.

${contextText ? `You have access to the following user context:${contextText}` : "No additional context is available at this time."}`;

    const systemInstruction = {
      role: "model",
      parts: [
        {
          text: systemInstructionText,
        },
      ],
    };

    // Combine user prompt with relevant document content
    const enhancedUserPrompt = userPrompt + relevantDocumentContent

    // Generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [
        systemInstruction,
        ...chatHistory,
        { role: "user", parts: [{ text: enhancedUserPrompt }] },
      ],
    });

    const responseText = response.text;

    // Create the assistant message
    const assistantMessage = {
      id: Date.now().toString(),
      content: responseText,
      role: "assistant",
      timestamp: new Date(),
      isMarkdown: true, // Flag to indicate markdown content
    };

    return NextResponse.json({ message: assistantMessage });
  }  catch (error: unknown) {
    const err = error as AppError;
    console.error("Error calling Gemini API:", err);
    return NextResponse.json(
      { error: err.message || "Failed to get AI response" },
      { status: 500 }
    );
  }
  
}
