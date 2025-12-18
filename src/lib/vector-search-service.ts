import { prisma } from '@/lib/prisma'
import { generateEmbedding } from '@/lib/embeddings'

export interface SearchResult {
  id: string
  chunkText: string
  chunkIndex: number
  year: number | null
  month: number | null
  week: number | null
  similarity: number
  metadata: Record<string, unknown> | null
  matchType?: 'exact' | 'similar'
}

/**
 * Search for chunks using vector similarity (semantic search)
 * Uses cosine distance for similarity matching
 */
export async function searchSimilarChunks(
  query: string,
  documentId: string,
  filters?: {
    year?: number
    month?: number
    week?: number
  },
  limit: number = 5
): Promise<SearchResult[]> {
  try {
    // Generate embedding for the query
    const embeddingResult = await generateEmbedding(query)
    const embeddingArray = embeddingResult.embedding
    const embeddingStr = `[${embeddingArray.join(',')}]`

    // Build filter conditions
    const filterConditions: string[] = []
    const params: any[] = [embeddingStr, documentId]
    let paramIndex = 3

    if (filters?.year !== undefined) {
      filterConditions.push(`year = $${paramIndex}`)
      params.push(filters.year)
      paramIndex++
    }
    if (filters?.month !== undefined) {
      filterConditions.push(`month = $${paramIndex}`)
      params.push(filters.month)
      paramIndex++
    }
    if (filters?.week !== undefined) {
      filterConditions.push(`week = $${paramIndex}`)
      params.push(filters.week)
      paramIndex++
    }

    const whereClause = filterConditions.length > 0
      ? `AND ${filterConditions.join(' AND ')}`
      : ''

    // Perform vector similarity search with cosine distance
    // Using <=> operator for cosine distance (1 - cosine similarity)
    // Note: Table name is document_embeddings (snake_case) as per Prisma @@map
    const querySQL = `
      SELECT 
        id,
        chunk_text as "chunkText",
        chunk_index as "chunkIndex",
        year,
        month,
        week,
        metadata,
        1 - (embedding <=> $1::vector) as similarity
      FROM document_embeddings
      WHERE document_id = $2
        AND embedding IS NOT NULL
        ${whereClause}
      ORDER BY embedding <=> $1::vector
      LIMIT $${paramIndex}
    `

    const results = await prisma.$queryRawUnsafe<SearchResult[]>(
      querySQL,
      ...params,
      limit
    )

    return results.map(result => ({
      id: result.id,
      chunkText: result.chunkText,
      chunkIndex: result.chunkIndex,
      year: result.year,
      month: result.month,
      week: result.week,
      similarity: Number(result.similarity) || 0,
      metadata: result.metadata as Record<string, unknown> | null,
    }))
  } catch (error) {
    console.error('Vector similarity search error:', error)
    // Fallback to empty results if vector search fails
    return []
  }
}

/**
 * Search for chunks by exact Year/Month/Week match (metadata filtering)
 * This is the primary search method for structured plan documents
 */
export async function searchByYearMonthWeek(
  documentId: string,
  planYear: number,
  month: number,
  week: number
): Promise<SearchResult[]> {
  try {
    const results = await prisma.$queryRaw<SearchResult[]>`
      SELECT 
        id,
        chunk_text as "chunkText",
        chunk_index as "chunkIndex",
        year,
        month,
        week,
        metadata,
        1.0 as similarity
      FROM document_embeddings
      WHERE document_id = ${documentId}
        AND year = ${planYear}
        AND month = ${month}
        AND week = ${week}
      ORDER BY chunk_index ASC
    `

    return results.map(result => ({
      id: result.id,
      chunkText: result.chunkText,
      chunkIndex: result.chunkIndex,
      year: result.year,
      month: result.month,
      week: result.week,
      similarity: 1.0, // Exact match = 100% similarity
      metadata: result.metadata as Record<string, unknown> | null,
    }))
  } catch (error) {
    console.error('Exact match search error:', error)
    throw error
  }
}

/**
 * Hybrid search: Combines exact metadata matching + semantic similarity
 * Returns both exact matches and semantically similar chunks
 */
export async function hybridSearch(
  documentId: string,
  query: string,
  context: {
    planYear: number
    month: number
    week: number
  },
  options?: {
    exactMatchLimit?: number
    similarLimit?: number
    minSimilarity?: number
  }
): Promise<{
  exactMatches: SearchResult[]
  similarChunks: SearchResult[]
  allRelevant: SearchResult[]
}> {
  // 1. Get exact metadata matches (primary source)
  const exactMatches = await searchByYearMonthWeek(
    documentId,
    context.planYear,
    context.month,
    context.week
  )

  // 2. Get semantically similar chunks from same time period
  // Don't filter by year to find patterns across plan years
  const similarChunks = await searchSimilarChunks(
    query,
    documentId,
    {
      month: context.month,
      week: context.week,
      // Optionally filter by year: year: context.planYear
    },
    options?.similarLimit || 3
  )

  // Filter by minimum similarity threshold
  const minSimilarity = options?.minSimilarity || 0.7
  const filteredSimilar = similarChunks.filter(
    chunk => chunk.similarity >= minSimilarity
  )

  // 3. Combine and deduplicate
  const uniqueChunks = new Map<string, SearchResult & { matchType: string }>()

  // Add exact matches first (higher priority)
  exactMatches.forEach(chunk => {
    uniqueChunks.set(chunk.id, { ...chunk, matchType: 'exact' })
  })

  // Add similar chunks (avoid duplicates)
  filteredSimilar.forEach(chunk => {
    if (!uniqueChunks.has(chunk.id)) {
      uniqueChunks.set(chunk.id, { ...chunk, matchType: 'similar' })
    }
  })

  return {
    exactMatches,
    similarChunks: filteredSimilar,
    allRelevant: Array.from(uniqueChunks.values()),
  }
}

