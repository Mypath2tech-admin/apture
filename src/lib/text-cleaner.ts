/**
 * Text cleaning utility for preparing text before embedding
 * Removes headers, footers, page numbers, and other artifacts that waste tokens
 */

/**
 * Clean text for embedding by removing unnecessary elements
 * @param text - Raw text from document
 * @returns Cleaned text ready for embedding
 */
export function cleanTextForEmbedding(text: string): string {
  if (!text || text.trim().length === 0) {
    return text
  }

  let cleaned = text

  // Remove page numbers (common patterns: "Page 1", "1/10", "Page 1 of 10", etc.)
  cleaned = cleaned.replace(/\bPage\s+\d+\s+of\s+\d+\b/gi, '')
  cleaned = cleaned.replace(/\bPage\s+\d+\b/gi, '')
  cleaned = cleaned.replace(/\b\d+\s*\/\s*\d+\b/g, '') // "1/10" format
  cleaned = cleaned.replace(/\b\d+\s*of\s*\d+\b/gi, '') // "1 of 10" format

  // Remove common header/footer patterns (repeated text at start/end of lines)
  // Remove lines that are just numbers or very short repeated text
  const lines = cleaned.split('\n')
  const cleanedLines: string[] = []
  const lineFrequency = new Map<string, number>()
  
  // Count line frequency to identify headers/footers
  lines.forEach(line => {
    const trimmed = line.trim()
    if (trimmed.length > 0) {
      lineFrequency.set(trimmed, (lineFrequency.get(trimmed) || 0) + 1)
    }
  })

  // Filter out lines that appear too frequently (likely headers/footers)
  const threshold = Math.max(3, Math.floor(lines.length * 0.1)) // Lines appearing in >10% of document
  
  lines.forEach(line => {
    const trimmed = line.trim()
    
    // Skip empty lines
    if (trimmed.length === 0) {
      return
    }

    // Skip lines that are just numbers
    if (/^\d+$/.test(trimmed)) {
      return
    }

    // Skip very short lines that appear frequently (likely headers/footers)
    if (trimmed.length < 20 && (lineFrequency.get(trimmed) || 0) > threshold) {
      return
    }

    // Skip common document metadata patterns
    if (
      /^(confidential|proprietary|internal use only|draft|final|version)/i.test(trimmed) ||
      /^(©|copyright|all rights reserved)/i.test(trimmed) ||
      /^generated on:/i.test(trimmed) ||
      /^last updated:/i.test(trimmed)
    ) {
      return
    }

    cleanedLines.push(line)
  })

  cleaned = cleanedLines.join('\n')

  // Remove excessive whitespace (3+ consecutive newlines)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  // Remove excessive spaces (3+ consecutive spaces)
  cleaned = cleaned.replace(/ {3,}/g, ' ')

  // Remove leading/trailing whitespace from each line
  cleaned = cleaned
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')

  // Remove common PDF artifacts
  cleaned = cleaned.replace(/\f/g, '') // Form feed characters
  cleaned = cleaned.replace(/\r\n/g, '\n') // Normalize line endings
  cleaned = cleaned.replace(/\r/g, '\n') // Normalize line endings

  // Remove URLs (they're usually not useful for semantic meaning)
  // But keep them if they're part of the content (we'll be conservative)
  // cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '')

  // Remove email addresses (optional - comment out if needed)
  // cleaned = cleaned.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '')

  // Final trim
  cleaned = cleaned.trim()

  return cleaned
}

/**
 * Clean a single chunk of text
 * This is a lighter version for individual chunks (assumes document-level cleaning already done)
 */
export function cleanChunkText(text: string): string {
  if (!text || text.trim().length === 0) {
    return text
  }

  let cleaned = text

  // Remove excessive whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')
  cleaned = cleaned.replace(/ {3,}/g, ' ')

  // Normalize line endings
  cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // Trim each line
  cleaned = cleaned
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')

  return cleaned.trim()
}

