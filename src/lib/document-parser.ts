/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFParser from 'pdf2json'
import { promises as fs } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import { randomUUID } from 'crypto'
import mammoth from 'mammoth'

export interface ParsedChunk {
  text: string
  year?: number
  month?: number
  week?: number
  sectionType: 'year' | 'month' | 'week' | 'content'
  metadata?: Record<string, unknown>
}

export interface ParsedDocument {
  chunks: ParsedChunk[]
  fullText: string
}

/**
 * Extract text from PDF file using pdf2json
 * Enhanced error handling and support for various PDF formats
 * Configured for Next.js server-side usage (cross-platform)
 */
export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  let tempFilePath: string | null = null
  try {
    // Validate buffer
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error('PDF file buffer is empty')
    }

    // Check if buffer looks like a PDF (PDF magic bytes: %PDF)
    const pdfHeader = fileBuffer.slice(0, 4).toString('ascii')
    if (pdfHeader !== '%PDF') {
      throw new Error('Invalid PDF file format: missing PDF header')
    }

    // Create temporary file (cross-platform using os.tmpdir())
    const tempDir = tmpdir()
    const tempFileName = `pdf-${randomUUID()}.pdf`
    tempFilePath = join(tempDir, tempFileName)

    // Write buffer to temporary file
    await fs.writeFile(tempFilePath, fileBuffer)

    // Parse PDF using pdf2json (no worker required)
    const pdfParser = new (PDFParser as any)(null, 1)
    
    // Wrap the event-based API in a Promise
    const parsedText = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: any) => {
        const errorMsg = errData?.parserError || 'Unknown PDF parsing error'
        reject(new Error(errorMsg))
      })

      pdfParser.on('pdfParser_dataReady', () => {
        try {
          const text = (pdfParser as any).getRawTextContent()
          if (!text || text.trim().length === 0) {
            reject(new Error('PDF file appears to be empty or contains no extractable text (may be image-based PDF)'))
          } else {
            resolve(text.trim())
          }
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Failed to extract text from PDF'))
        }
      })

      // Load and parse the PDF
      pdfParser.loadPDF(tempFilePath)
    })

    return parsedText
  } catch (error) {
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw new Error('PDF file is too large or corrupted. Please try a smaller file or ensure the PDF is not password-protected.')
      }
      if (error.message.includes('password') || error.message.includes('encrypted')) {
        throw new Error('PDF file is password-protected. Please remove the password and try again.')
      }
      if (error.message.includes('corrupt') || error.message.includes('invalid')) {
        throw new Error('PDF file appears to be corrupted. Please verify the file and try again.')
      }
      throw new Error(`Failed to extract text from PDF: ${error.message}`)
    }
    throw new Error(`Failed to extract text from PDF: Unknown error occurred`)
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

/**
 * Extract text from Word document
 */
export async function extractTextFromWord(fileBuffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer })
    return result.value
  } catch (error) {
    throw new Error(`Failed to extract text from Word document: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Parse document text to extract Year/Month/Week structure
 * This is a flexible parser that uses pattern matching to identify sections
 * Enhanced with better month detection and context preservation
 */
export function parseYearMonthWeekStructure(text: string): ParsedDocument {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  const chunks: ParsedChunk[] = []
  
  let currentYear: number | undefined
  let currentMonth: number | undefined
  let currentWeek: number | undefined
  let currentContent: string[] = []
  
  // Patterns to match - made more flexible
  const yearPattern = /(?:year|yr)[\s:]*(\d+)/i
  // More flexible month pattern - handles variations and word boundaries
  const monthPattern = /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\b/i
  const weekPattern = /(?:week|wk)[\s:]*(\d+)/i
  
  const monthMap: Record<string, number> = {
    january: 1, jan: 1,
    february: 2, feb: 2,
    march: 3, mar: 3,
    april: 4, apr: 4,
    may: 5,
    june: 6, jun: 6,
    july: 7, jul: 7,
    august: 8, aug: 8,
    september: 9, sep: 9, sept: 9,
    october: 10, oct: 10,
    november: 11, nov: 11,
    december: 12, dec: 12,
  }
  
  function flushCurrentContent() {
    if (currentContent.length > 0) {
      const contentText = currentContent.join('\n').trim()
      if (contentText.length > 0) {
        chunks.push({
          text: contentText,
          year: currentYear,
          month: currentMonth,
          week: currentWeek,
          sectionType: currentWeek ? 'week' : currentMonth ? 'month' : currentYear ? 'year' : 'content',
          metadata: {
            hasYear: currentYear !== undefined,
            hasMonth: currentMonth !== undefined,
            hasWeek: currentWeek !== undefined,
          },
        })
      }
      currentContent = []
    }
  }
  
  // Debug: Track what we're finding
  const debugLog: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check for year
    const yearMatch = line.match(yearPattern)
    if (yearMatch) {
      flushCurrentContent()
      currentYear = Number.parseInt(yearMatch[1], 10)
      // IMPORTANT: Don't reset currentMonth when year changes - keep it if it was set
      // Only reset if we're starting a completely new year section
      currentWeek = undefined
      chunks.push({
        text: line,
        year: currentYear,
        sectionType: 'year',
      })
      debugLog.push(`Found Year ${currentYear} at line ${i + 1}`)
      continue
    }
    
    // Check for month - try multiple approaches
    let monthMatch = line.match(monthPattern)
    
    // If no match, try checking if line contains month name (case-insensitive)
    if (!monthMatch) {
      const lowerLine = line.toLowerCase()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [monthName, monthNum] of Object.entries(monthMap)) {
        if (lowerLine.includes(monthName)) {
          // Create a synthetic match
          monthMatch = [monthName, monthName] as RegExpMatchArray
          break
        }
      }
    }
    
    if (monthMatch) {
      flushCurrentContent()
      const monthName = monthMatch[1]?.toLowerCase() || monthMatch[0]?.toLowerCase()
      currentMonth = monthMap[monthName]
      
      if (!currentMonth) {
        console.warn(`Could not map month name: ${monthName} at line ${i + 1}: "${line}"`)
      } else {
        debugLog.push(`Found Month ${currentMonth} (${monthName}) at line ${i + 1}`)
      }
      
      currentWeek = undefined
      chunks.push({
        text: line,
        year: currentYear,
        month: currentMonth,
        sectionType: 'month',
      })
      continue
    }
    
    // Check for week
    const weekMatch = line.match(weekPattern)
    if (weekMatch) {
      flushCurrentContent()
      currentWeek = Number.parseInt(weekMatch[1], 10)
      chunks.push({
        text: line,
        year: currentYear,
        month: currentMonth,
        week: currentWeek,
        sectionType: 'week',
      })
      debugLog.push(`Found Week ${currentWeek} at line ${i + 1}, Year ${currentYear}, Month ${currentMonth}`)
      continue
    }
    
    // Regular content line
    currentContent.push(line)
  }
  
  // Flush remaining content
  flushCurrentContent()
  
  // Debug: Log what we found
  console.log('Document Parser Debug Log:')
  console.log('Total chunks:', chunks.length)
  console.log('Months found:', [...new Set(chunks.filter(c => c.month).map(c => c.month))].sort())
  console.log('Years found:', [...new Set(chunks.filter(c => c.year).map(c => c.year))].sort())
  debugLog.forEach(log => console.log(log))
  
  // If no structured chunks were found, create a single chunk with all content
  if (chunks.length === 0) {
    chunks.push({
      text: text.trim(),
      sectionType: 'content',
    })
  }
  
  return {
    chunks,
    fullText: text,
  }
}

/**
 * Extract and parse document based on MIME type
 */
export async function extractAndParseDocument(
  fileBuffer: Buffer,
  mimeType: string
): Promise<ParsedDocument> {
  let text: string
  
  if (mimeType === 'application/pdf') {
    text = await extractTextFromPDF(fileBuffer)
  } else if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) {
    text = await extractTextFromWord(fileBuffer)
  } else if (mimeType === 'text/plain') {
    text = fileBuffer.toString('utf-8')
  } else {
    throw new Error(`Unsupported file type: ${mimeType}`)
  }
  
  return parseYearMonthWeekStructure(text)
}

