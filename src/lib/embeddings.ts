/**
 * Embeddings utility for generating and storing vector embeddings
 * Supports multiple embedding providers (Gemini, OpenAI, or custom)
 */

export interface EmbeddingResult {
  embedding: number[]
  model: string
}

/**
 * Generate embedding for text using the configured embedding service
 * Default: Uses Gemini text-embedding-004 (768 dimensions)
 * Can be configured to use OpenAI or other providers
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  const embeddingProvider = process.env.EMBEDDING_PROVIDER || 'gemini'
  
  // Use Gemini embeddings by default
  if (embeddingProvider === 'gemini' || embeddingProvider === 'supabase') {
    return generateGeminiEmbedding(text)
  }
  
  // OpenAI embeddings (if configured)
  if (embeddingProvider === 'openai' && process.env.OPENAI_API_KEY) {
    const embeddingModel = process.env.EMBEDDING_MODEL || 'text-embedding-3-small'
    return generateOpenAIEmbedding(text, embeddingModel)
  }
  
  // Fallback: Return error
  throw new Error(
    `Embedding provider "${embeddingProvider}" not configured. ` +
    `Please set EMBEDDING_PROVIDER (gemini, openai) and required API keys in environment variables.`
  )
}

/**
 * Generate embedding using OpenAI API
 */
async function generateOpenAIEmbedding(text: string, model: string): Promise<EmbeddingResult> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      input: text,
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI embedding API error: ${error}`)
  }
  
  const data = await response.json()
  return {
    embedding: data.data[0].embedding,
    model: data.model,
  }
}

/**
 * Generate embedding using Google Gemini's text-embedding-004 model
 * This uses the Google Generative AI API
 */
async function generateGeminiEmbedding(text: string): Promise<EmbeddingResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured. Please set it in your environment variables.')
  }

  try {
    // Use Google's text-embedding-004 model via the Generative AI API
    // API endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:embedContent
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: {
            parts: [
              {
                text: text,
              },
            ],
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = `Gemini embedding API error: ${response.status}`
      try {
        const errorData = JSON.parse(errorText)
        errorMessage += ` - ${errorData.error?.message || errorText}`
      } catch {
        errorMessage += ` - ${errorText}`
      }
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    // Extract embedding from response
    // Response structure: { embedding: { values: number[] } }
    const embedding = data.embedding?.values
    
    if (!embedding || !Array.isArray(embedding)) {
      console.error('Unexpected embedding response structure:', JSON.stringify(data, null, 2))
      throw new Error('Invalid embedding response format from Gemini API. Expected embedding.values array.')
    }

    return {
      embedding: embedding as number[],
      model: 'text-embedding-004',
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
      throw error
    }
    throw new Error(
      `Failed to generate Gemini embedding: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Convert embedding array to JSON string for database storage
 */
export function embeddingToJson(embedding: number[]): string {
  return JSON.stringify(embedding)
}

/**
 * Parse embedding JSON string from database
 */
export function embeddingFromJson(json: string): number[] {
  return JSON.parse(json) as number[]
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must have the same dimension')
  }
  
  let dotProduct = 0
  let norm1 = 0
  let norm2 = 0
  
  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i]
    norm1 += embedding1[i] * embedding1[i]
    norm2 += embedding2[i] * embedding2[i]
  }
  
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2))
}

