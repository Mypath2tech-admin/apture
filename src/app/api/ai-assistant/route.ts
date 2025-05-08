import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { messages, fileData } = await request.json();

    // Check if the API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    // Prepare the chat history for Gemini
    let chatHistory = [];
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
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "user") {
        userPrompt = lastMsg.content;

        // Add file content if there are attachments
        if (fileData && fileData.length > 0) {
          const fileContents = fileData
            .map((file: any) => file.content)
            .join("\n");
          userPrompt += `\n\nAttached file contents:\n${fileContents}`;
        }
      }
    }

    // Add instruction to format response as markdown
    const systemInstruction = {
      role: "model",
      parts: [
        {
          text: "Please format your responses using markdown for better readability. Use headers, lists, code blocks, bold, and italic text where appropriate.",
        },
      ],
    };

    // Generate content
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash-001",
      contents: [
        systemInstruction,
        ...chatHistory,
        { role: "user", parts: [{ text: userPrompt }] },
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
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get AI response" },
      { status: 500 }
    );
  }
}
