import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { supabase, supabaseStorage } from '@/lib/supabase'
import { extractAndParseDocument } from '@/lib/document-parser'
import { generateEmbedding } from '@/lib/embeddings'
import { v4 as uuidv4 } from 'uuid'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
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

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, Word documents, and text files are allowed.' },
        { status: 400 }
      )
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    // Check if this is a "3-Year Plan" document - flexible detection
    const fileNameLower = file.name.toLowerCase()
    // Check for common patterns: "3-year", "3 year", "year plan" with "3" or "three"
    const hasYear = fileNameLower.includes('year')
    const hasPlan = fileNameLower.includes('plan')
    const hasThree = fileNameLower.includes('3') || fileNameLower.includes('three')
    const isYearPlan = hasYear && hasPlan && hasThree
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'upload/route.ts:76',message:'Document upload - isYearPlan detection',data:{fileName:file.name,isYearPlan,userId,organizationId:user.organizationId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    // Verify storage bucket exists (optional check - will fail on upload if it doesn't)
    try {
      const { data: buckets, error: listError } = await supabase.storage.listBuckets()
      if (listError) {
        console.error('Error listing buckets:', listError)
      } else {
        const documentsBucket = buckets?.find(b => b.name === 'documents')
        if (!documentsBucket) {
          return NextResponse.json(
            { 
              error: 'Storage bucket "documents" does not exist',
              details: 'Please create a storage bucket named "documents" in your Supabase dashboard (Storage > Buckets > New bucket)'
            },
            { status: 500 }
          )
        }
      }
    } catch (checkError) {
      console.warn('Could not verify bucket existence, proceeding with upload:', checkError)
    }

    // Upload to Supabase Storage
    const fileExtension = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const filePath = `${user.organizationId || userId}/${fileName}`

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: uploadData, error: uploadError } = await supabaseStorage.upload(filePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      // Provide more detailed error message
      const errorMessage = uploadError.message || 'Unknown storage error'
      
      // Check for common issues
      if (errorMessage.includes('Bucket not found') || errorMessage.includes('does not exist')) {
        return NextResponse.json(
          { 
            error: 'Storage bucket "documents" does not exist. Please create it in your Supabase dashboard.',
            details: errorMessage 
          },
          { status: 500 }
        )
      }
      
      if (errorMessage.includes('JWT')) {
        return NextResponse.json(
          { 
            error: 'Supabase authentication failed. Please check your SUPABASE_SERVICE_ROLE_KEY.',
            details: errorMessage 
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to upload file to storage',
          details: errorMessage 
        },
        { status: 500 }
      )
    }

    // Extract and parse document
    let parsedDocument
    try {
      parsedDocument = await extractAndParseDocument(fileBuffer, file.type)
    } catch (parseError) {
      // If parsing fails, delete uploaded file
      await supabaseStorage.remove([filePath])
      return NextResponse.json(
        { error: `Failed to parse document: ${parseError instanceof Error ? parseError.message : 'Unknown error'}` },
        { status: 400 }
      )
    }

    // Create document record
    const documentData = {
      name: file.name,
      fileName: file.name,
      filePath: filePath,
      fileSize: file.size,
      mimeType: file.type,
      userId: user.organizationId ? null : userId, // Per-user if no org, otherwise null
      organizationId: user.organizationId || null,
      isYearPlan,
      isAiReadable: isYearPlan, // Auto-enable AI readability for year plans
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'upload/route.ts:159',message:'Document creation - before create',data:documentData,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    const document = await prisma.document.create({
      data: documentData,
    })
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/209a747d-6f6d-4b09-9475-b6d4294efafd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'upload/route.ts:172',message:'Document creation - after create',data:{id:document.id,name:document.name,isYearPlan:document.isYearPlan,userId:document.userId,organizationId:document.organizationId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    // If this is a year plan, set the plan start date
    if (isYearPlan) {
      // Default to January 1st of the current year
      // In the future, you could let users specify this during upload
      const planStartDate = new Date()
      planStartDate.setMonth(0) // January
      planStartDate.setDate(1)  // 1st
      planStartDate.setHours(0, 0, 0, 0)
      
      await prisma.document.update({
        where: { id: document.id },
        data: {
          planStartDate,
          planYears: 3,
        },
      })
    }

    // Generate embeddings for all chunks first
    const embeddingData = await Promise.all(
      parsedDocument.chunks.map(async (chunk, index) => {
        try {
          // Generate embedding using Gemini
          const embeddingResult = await generateEmbedding(chunk.text)
          const embeddingArray = embeddingResult.embedding

          // Convert to pgvector format: [1,2,3,...] as string
          const embeddingVector = `[${embeddingArray.join(',')}]`

          return {
            id: crypto.randomUUID(),
            documentId: document.id,
            chunkText: chunk.text,
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

    // Batch insert using raw SQL since Prisma doesn't fully support vector type
    if (embeddingData.length > 0) {
      try {
        // Insert in batches to avoid SQL parameter limits
        const batchSize = 50
        for (let i = 0; i < embeddingData.length; i += batchSize) {
          const batch = embeddingData.slice(i, i + batchSize)
          
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
        // Fallback: Try using Prisma createMany without vector (for migration period)
        // This allows the system to work even if pgvector isn't set up yet
        const fallbackData = embeddingData.map(d => ({
          documentId: d.documentId,
          chunkText: d.chunkText,
          chunkIndex: d.chunkIndex,
          year: d.year,
          month: d.month,
          week: d.week,
          metadata: d.metadata,
        }))

        await prisma.documentEmbedding.createMany({
          data: fallbackData,
          skipDuplicates: true,
        })

        console.warn('Stored embeddings without vector (migration mode). Run supabase-migration.sql to enable vector search.')
      }
    }

    return NextResponse.json({
      id: document.id,
      name: document.name,
      fileName: document.fileName,
      fileSize: document.fileSize,
      mimeType: document.mimeType,
      isAiReadable: document.isAiReadable,
      isYearPlan: document.isYearPlan,
      createdAt: document.createdAt,
      chunksProcessed: parsedDocument.chunks.length,
    })
  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload document' },
      { status: 500 }
    )
  }
}

