import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { supabase, supabaseStorage } from '@/lib/supabase'
import { extractAndParseDocument } from '@/lib/document-parser'
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

    // Check if this is a "Plan" document - flexible detection
    // Document is marked as plan if filename contains "plan" or related terms
    const fileNameLower = file.name.toLowerCase()
    const planKeywords = ['plan', 'planning', 'strategy', 'roadmap', 'blueprint']
    const isYearPlan = planKeywords.some(keyword => fileNameLower.includes(keyword))
    
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // Note: isAiReadable is false by default - user must enable it manually
    const documentData = {
      name: file.name,
      fileName: file.name,
      filePath: filePath,
      fileSize: file.size,
      mimeType: file.type,
      userId: user.organizationId ? null : userId, // Per-user if no org, otherwise null
      organizationId: user.organizationId || null,
      isYearPlan,
      isAiReadable: false, // User must enable AI readability manually
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

    // If this is a plan document, set the plan start date
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

    // Note: Embeddings are NOT generated during upload
    // User must enable AI readability manually, which will trigger embedding generation

    return NextResponse.json({
      id: document.id,
      name: document.name,
      fileName: document.fileName,
      fileSize: document.fileSize,
      mimeType: document.mimeType,
      isAiReadable: document.isAiReadable,
      isYearPlan: document.isYearPlan,
      createdAt: document.createdAt,
      // Note: chunksProcessed removed - embeddings not generated during upload
    })
  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload document' },
      { status: 500 }
    )
  }
}

