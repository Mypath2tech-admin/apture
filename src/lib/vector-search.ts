import { prisma } from './prisma'

export interface ChunkSearchResult {
  id: string
  chunkText: string
  chunkIndex: number
  year?: number
  month?: number
  week?: number
  metadata?: Record<string, unknown>
  similarity?: number
}

/**
 * Search for document chunks by exact Plan Year/Month/Week match
 * This searches using the plan year (1, 2, 3) from the document structure,
 * not the calendar year (2024, 2025, etc.)
 */
export async function searchByYearMonthWeek(
  documentId: string,
  planYear: number, // Plan year (1, 2, or 3) - required
  month: number,
  week: number
): Promise<ChunkSearchResult[]> {
  const where = {
    documentId,
    year: planYear,  // Filter by plan year (1, 2, or 3)
    month,
    week,
  }
  
  const embeddings = await prisma.documentEmbedding.findMany({
    where,
    orderBy: [
      { year: 'asc' },
      { month: 'asc' },
      { week: 'asc' },
      { chunkIndex: 'asc' },
    ],
  })
  
  return embeddings.map(emb => ({
    id: emb.id,
    chunkText: emb.chunkText,
    chunkIndex: emb.chunkIndex,
    year: emb.year ?? undefined,
    month: emb.month ?? undefined,
    week: emb.week ?? undefined,
    metadata: emb.metadata as Record<string, unknown> | undefined,
  }))
}

/**
 * Semantic search using vector similarity
 * Finds chunks most similar to the query text
 */
export async function semanticSearch(
  queryText: string,
  documentId?: string,
  filters?: {
    year?: number
    month?: number
    week?: number
    limit?: number
  }
): Promise<ChunkSearchResult[]> {
  // Note: This function cannot access embedding field via Prisma
  // For semantic search with embeddings, use vector-search-service.ts instead
  
  // Build where clause
  const where: {
    documentId?: string
    year?: number
    month?: number
    week?: number
    embedding?: { not: null }
  } = {}
  
  if (documentId) {
    where.documentId = documentId
  }
  if (filters?.year !== undefined) {
    where.year = filters.year
  }
  if (filters?.month !== undefined) {
    where.month = filters.month
  }
  if (filters?.week !== undefined) {
    where.week = filters.week
  }
  where.embedding = { not: null }
  
  // Note: Prisma doesn't expose the embedding field directly (it's Unsupported("vector(768)"))
  // For semantic search, use vector-search-service.ts which uses raw SQL queries
  // This function is kept for compatibility but should use raw SQL for embedding access
  console.warn('semanticSearch in vector-search.ts: Embedding field not accessible via Prisma. Use vector-search-service.ts instead.')
  
  // Get all relevant chunks (without embedding field)
  const chunks = await prisma.documentEmbedding.findMany({
    where: {
      documentId: where.documentId,
      year: where.year,
      month: where.month,
      week: where.week,
    },
    take: filters?.limit || 10,
  })
  
  // Return chunks without similarity scores (embedding not accessible)
  // For actual semantic search, use vector-search-service.ts
  return chunks.map(chunk => ({
    id: chunk.id,
    chunkText: chunk.chunkText,
    chunkIndex: chunk.chunkIndex,
    year: chunk.year ?? undefined,
    month: chunk.month ?? undefined,
    week: chunk.week ?? undefined,
    metadata: chunk.metadata as Record<string, unknown> | undefined,
    similarity: 0, // Cannot calculate without embedding
  }))
}

/**
 * Find the "3-Year Plan" document for a user or organization
 */
export async function findYearPlanDocument(
  userId?: string,
  organizationId?: string
): Promise<{ id: string; name: string } | null> {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'vector-search.ts:142',message:'findYearPlanDocument - entry',data:{userId,organizationId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  // Build OR conditions to search for documents matching user or organization
  const orConditions: Array<{
    userId?: string | null
    organizationId?: string | null
  }> = []
  
  // If userId is provided, search for user's personal plan
  if (userId) {
    orConditions.push({
      userId: userId,
      organizationId: null, // User's personal plan (not org-wide)
    })
  }
  
  // If organizationId is provided, search for organization's plan
  // (userId can be null for org-wide plans)
  if (organizationId) {
    orConditions.push({
      organizationId: organizationId,
      userId: null, // Organization-wide plan
    })
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'vector-search.ts:168',message:'findYearPlanDocument - query conditions',data:{orConditions,conditionsCount:orConditions.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  // Check all documents with isYearPlan=true for debugging
  const allYearPlans = await prisma.document.findMany({
    where: { isYearPlan: true },
    select: { id: true, name: true, userId: true, organizationId: true },
  })
  
  // Check ALL documents for this org/user to see what exists
  const allDocuments = await prisma.document.findMany({
    where: {
      OR: [
        { organizationId: organizationId || undefined },
        { userId: userId || undefined },
      ],
    },
    select: { id: true, name: true, fileName: true, userId: true, organizationId: true, isYearPlan: true },
  })
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'vector-search.ts:175',message:'findYearPlanDocument - all year plans in DB',data:{count:allYearPlans.length,plans:allYearPlans},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'vector-search.ts:185',message:'findYearPlanDocument - ALL documents for user/org',data:{count:allDocuments.length,documents:allDocuments},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // If we have conditions, search for the year plan
  if (orConditions.length > 0) {
    const whereClause = {
      isYearPlan: true,
      OR: orConditions,
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'vector-search.ts:182',message:'findYearPlanDocument - executing query',data:{whereClause:JSON.stringify(whereClause)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    const plan = await prisma.document.findFirst({
      where: whereClause,
    })
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'vector-search.ts:190',message:'findYearPlanDocument - query result',data:{found:!!plan,planId:plan?.id,planName:plan?.name,planUserId:plan?.userId,planOrgId:plan?.organizationId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (plan) {
      return { id: plan.id, name: plan.name }
    }
  }
  
  return null
}

