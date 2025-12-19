import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { supabaseStorage } from '@/lib/supabase'
import { extractAndParseDocument } from '@/lib/document-parser'
import { generateEmbedding } from '@/lib/embeddings'
import {  cleanChunkText } from '@/lib/text-cleaner'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * GET /api/documents - List documents for the authenticated user/organization
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const userId = decoded.userId

    // Get user to check organization
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, organizationId: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch documents (user's personal documents or organization's documents)
    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { userId: userId },
          { organizationId: user.organizationId || undefined },
        ],
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        fileName: true,
        fileSize: true,
        mimeType: true,
        isAiReadable: true,
        isYearPlan: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Get embedding counts for each document using raw SQL
    // (Prisma can't filter by embedding field since it's Unsupported("vector"))
    const documentIds = documents.map(doc => doc.id)
    let embeddingCountMap = new Map<string, number>()

    if (documentIds.length > 0) {
      try {
        // Use raw SQL to count embeddings where embedding IS NOT NULL
        const embeddingCounts = await prisma.$queryRaw<Array<{ document_id: string; count: bigint }>>`
          SELECT document_id, COUNT(*)::int as count
          FROM document_embeddings
          WHERE document_id = ANY(${documentIds}::text[])
            AND embedding IS NOT NULL
          GROUP BY document_id
        `

        embeddingCountMap = new Map(
          embeddingCounts.map(item => [item.document_id, Number(item.count)])
        )
      } catch (error) {
        console.error('Error fetching embedding counts:', error)
        // If query fails, just use empty map (all counts will be 0)
      }
    }

    // Format response
    const formattedDocuments = documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      fileName: doc.fileName,
      size: formatFileSize(doc.fileSize),
      date: doc.createdAt.toISOString().split('T')[0],
      mimeType: doc.mimeType,
      isAiReadable: doc.isAiReadable,
      isYearPlan: doc.isYearPlan,
      embeddingCount: embeddingCountMap.get(doc.id) || 0,
      hasEmbeddings: (embeddingCountMap.get(doc.id) || 0) > 0,
    }))

    return NextResponse.json({ documents: formattedDocuments })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/documents - Update document (e.g., toggle AI readable)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const userId = decoded.userId

    const body = await request.json()
    const { documentId, isAiReadable } = body

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
    }

    // Verify user has access to this document
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, organizationId: true },
    })

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        OR: [
          { userId: userId },
          { organizationId: user?.organizationId || undefined },
        ],
      },
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found or access denied' }, { status: 404 })
    }

    const currentIsAiReadable = document.isAiReadable
    const newIsAiReadable = isAiReadable !== undefined ? isAiReadable : currentIsAiReadable

    // If enabling AI readability, generate embeddings
    if (newIsAiReadable && !currentIsAiReadable) {
      try {
        // Check if embeddings already exist using raw SQL
        // (Prisma can't filter by embedding field since it's Unsupported("vector"))
        let existingEmbeddings = 0
        try {
          const result = await prisma.$queryRaw<Array<{ count: bigint }>>`
            SELECT COUNT(*)::int as count
            FROM document_embeddings
            WHERE document_id = ${document.id}
              AND embedding IS NOT NULL
          `
          existingEmbeddings = result.length > 0 ? Number(result[0].count) : 0
        } catch (error) {
          console.error('Error checking existing embeddings:', error)
          // If query fails, assume no embeddings exist and proceed
        }

        // Only generate if embeddings don't exist
        if (existingEmbeddings === 0) {
          // Fetch file from Supabase Storage
          const { data: fileData, error: downloadError } = await supabaseStorage.download(document.filePath)

          if (downloadError || !fileData) {
            return NextResponse.json(
              { error: `Failed to fetch document file: ${downloadError?.message || 'File not found'}` },
              { status: 500 }
            )
          }

          // Convert blob to buffer
          const arrayBuffer = await fileData.arrayBuffer()
          const fileBuffer = Buffer.from(arrayBuffer)

          // Parse document
          let parsedDocument
          try {
            parsedDocument = await extractAndParseDocument(fileBuffer, document.mimeType)
          } catch (parseError) {
            return NextResponse.json(
              { error: `Failed to parse document: ${parseError instanceof Error ? parseError.message : 'Unknown error'}` },
              { status: 400 }
            )
          }

          // Clean and generate embeddings for all chunks
          const embeddingData = await Promise.all(
            parsedDocument.chunks.map(async (chunk, index) => {
              try {
                // Clean the chunk text before embedding
                const cleanedText = cleanChunkText(chunk.text)

                // Skip empty chunks after cleaning
                if (!cleanedText || cleanedText.trim().length === 0) {
                  return null
                }

                // Generate embedding using Gemini
                const embeddingResult = await generateEmbedding(cleanedText)
                const embeddingArray = embeddingResult.embedding

                // Convert to pgvector format: [1,2,3,...] as string
                const embeddingVector = `[${embeddingArray.join(',')}]`

                return {
                  id: crypto.randomUUID(),
                  documentId: document.id,
                  chunkText: chunk.text, // Store original text (not cleaned) for display
                  chunkIndex: index,
                  year: chunk.year ?? null,
                  month: chunk.month ?? null,
                  week: chunk.week ?? null,
                  embedding: embeddingVector, // pgvector format
                  metadata: JSON.parse(JSON.stringify(chunk.metadata || {})),
                  createdAt: new Date(),
                }
              } catch (error) {
                console.error(`Failed to generate embedding for chunk ${index}:`, error)
                // Store chunk without embedding if embedding generation fails
                return {
                  id: crypto.randomUUID(),
                  documentId: document.id,
                  chunkText: chunk.text,
                  chunkIndex: index,
                  year: chunk.year ?? null,
                  month: chunk.month ?? null,
                  week: chunk.week ?? null,
                  embedding: null,
                  metadata: JSON.parse(JSON.stringify(chunk.metadata || {})),
                  createdAt: new Date(),
                }
              }
            })
          )

          // Filter out null entries (empty chunks)
          const validEmbeddingData = embeddingData.filter(item => item !== null)

          // Batch insert using raw SQL since Prisma doesn't fully support vector type
          if (validEmbeddingData.length > 0) {
            try {
              // Insert in batches to avoid SQL parameter limits
              const batchSize = 50
              for (let i = 0; i < validEmbeddingData.length; i += batchSize) {
                const batch = validEmbeddingData.slice(i, i + batchSize)

                // Build parameterized query for batch insert
                const values = batch.map((_, idx) => {
                  const baseIdx = idx * 10
                  return `($${baseIdx + 1}, $${baseIdx + 2}, $${baseIdx + 3}, $${baseIdx + 4}, $${baseIdx + 5}, $${baseIdx + 6}, $${baseIdx + 7}, $${baseIdx + 8}::vector, $${baseIdx + 9}::jsonb, $${baseIdx + 10})`
                }).join(', ')

                const params = batch.flatMap(d => [
                  d.id,
                  d.documentId,
                  d.chunkText,
                  d.chunkIndex,
                  d.year,
                  d.month,
                  d.week,
                  d.embedding || null, // Will be cast to vector in SQL
                  JSON.stringify(d.metadata), // Will be cast to jsonb in SQL
                  d.createdAt,
                ])

                const query = `
                  INSERT INTO document_embeddings 
                  (id, document_id, chunk_text, chunk_index, year, month, week, embedding, metadata, created_at)
                  VALUES ${values}
                  ON CONFLICT (id) DO NOTHING
                `

                await prisma.$executeRawUnsafe(query, ...params)
              }
            } catch (dbError) {
              console.error('Error inserting embeddings:', dbError)
              // If embedding insertion fails, don't enable AI readability
              return NextResponse.json(
                { error: 'Failed to generate embeddings. Please try again.' },
                { status: 500 }
              )
            }
          }
        }
      } catch (error) {
        console.error('Error generating embeddings:', error)
        return NextResponse.json(
          { error: `Failed to enable AI readability: ${error instanceof Error ? error.message : 'Unknown error'}` },
          { status: 500 }
        )
      }
    }

    // Update document flag (whether enabling or disabling)
    const updated = await prisma.document.update({
      where: { id: documentId },
      data: {
        isAiReadable: newIsAiReadable,
      },
    })

    // Get embedding count for response using raw SQL
    // (Prisma can't filter by embedding field since it's Unsupported("vector"))
    let embeddingCount = 0
    try {
      const result = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*)::int as count
        FROM document_embeddings
        WHERE document_id = ${document.id}
          AND embedding IS NOT NULL
      `
      embeddingCount = result.length > 0 ? Number(result[0].count) : 0
    } catch (error) {
      console.error('Error fetching embedding count:', error)
      // If query fails, count will be 0
    }

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      isAiReadable: updated.isAiReadable,
      embeddingCount,
      hasEmbeddings: embeddingCount > 0,
    })
  } catch (error) {
    console.error('Error updating document:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update document' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/documents - Delete a document
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const userId = decoded.userId

    const searchParams = request.nextUrl.searchParams
    const documentId = searchParams.get('id')

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
    }

    // Verify user has access to this document
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, organizationId: true },
    })

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        OR: [
          { userId: userId },
          { organizationId: user?.organizationId || undefined },
        ],
      },
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found or access denied' }, { status: 404 })
    }

    // Delete from Supabase Storage
    try {
      await supabaseStorage.remove([document.filePath])
    } catch (storageError) {
      console.error('Error deleting file from storage:', storageError)
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database (cascades to embeddings)
    await prisma.document.delete({
      where: { id: documentId },
    })

    return NextResponse.json({ success: true, message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete document' },
      { status: 500 }
    )
  }
}

/**
 * Helper function to format file size
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

