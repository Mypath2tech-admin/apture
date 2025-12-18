import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { supabaseStorage } from '@/lib/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * GET /api/documents - List documents for the authenticated user/organization
 */
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

    // Update document
    const updated = await prisma.document.update({
      where: { id: documentId },
      data: {
        isAiReadable: isAiReadable !== undefined ? isAiReadable : document.isAiReadable,
      },
    })

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      isAiReadable: updated.isAiReadable,
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

