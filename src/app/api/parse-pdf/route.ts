import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromPDF } from '@/lib/document-parser'
import PDFParser from 'pdf2json'
import { promises as fs } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Extract text using the shared function
    const text = await extractTextFromPDF(buffer)
    
    // Get page count using pdf2json
    const tempDir = tmpdir()
    const tempFileName = `pdf-${randomUUID()}.pdf`
    tempFilePath = join(tempDir, tempFileName)
    await fs.writeFile(tempFilePath, buffer)
    
    const pageCount = await new Promise<number>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParser = new (PDFParser as any)(null, 1)
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfParser.on('pdfParser_dataError', (errData: any) => {
        reject(new Error(errData?.parserError || 'Failed to get page count'))
      })

      pdfParser.on('pdfParser_dataReady', () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pages = (pdfParser as any).getAllPageFields()
          resolve(pages?.length || 1)
        } catch {
          // If we can't get page count, default to 1
          resolve(1)
        }
      })

      pdfParser.loadPDF(tempFilePath)
    })
    
    return NextResponse.json({
      text,
      pages: pageCount
    })
  } catch (error) {
    console.error('PDF parsing error:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'PDF file is too large or corrupted. Please try a smaller file or ensure the PDF is not password-protected.' },
          { status: 500 }
        )
      }
      if (error.message.includes('password') || error.message.includes('encrypted')) {
        return NextResponse.json(
          { error: 'PDF file is password-protected. Please remove the password and try again.' },
          { status: 400 }
        )
      }
      if (error.message.includes('corrupt') || error.message.includes('invalid')) {
        return NextResponse.json(
          { error: 'PDF file appears to be corrupted. Please verify the file and try again.' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to parse PDF' },
      { status: 500 }
    )
  } finally {
    // Clean up temporary file
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath)
      } catch (cleanupError) {
        console.warn('Failed to clean up temporary PDF file:', cleanupError)
      }
    }
  }
}

