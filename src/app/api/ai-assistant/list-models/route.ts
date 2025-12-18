import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to list models: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Filter models that support generateContent
    const availableModels = data.models
      ?.filter((model: any) => 
        model.supportedGenerationMethods?.includes("generateContent")
      )
      .map((model: any) => ({
        name: model.name,
        displayName: model.displayName,
        description: model.description,
        supportedMethods: model.supportedGenerationMethods,
      })) || [];

    return NextResponse.json({
      models: availableModels,
      allModels: data.models, // Include all models for reference
    });
  } catch (error) {
    console.error("Error listing models:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list models" },
      { status: 500 }
    );
  }
}

