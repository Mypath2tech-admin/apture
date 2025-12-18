import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { GoogleGenAI } from '@google/genai'
import { prisma } from '@/lib/prisma'
import { findYearPlanDocument } from '@/lib/vector-search'
import { mapCalendarToPlanYear, getMonthName } from '@/lib/year-plan-service'
import { hybridSearch } from '@/lib/vector-search-service'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

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

    const body = await request.json()
    const { weekStarting, existingDescription } = body

    if (!weekStarting) {
      return NextResponse.json({ error: 'weekStarting date is required' }, { status: 400 })
    }

    // Find the user's or organization's 3-Year Plan document
    const yearPlan = await findYearPlanDocument(
      user.organizationId ? undefined : userId,
      user.organizationId || undefined
    )

    if (!yearPlan) {
      return NextResponse.json(
        { error: 'No 3-Year Plan document found. Please upload a 3-Year Plan document first.' },
        { status: 404 }
      )
    }

    // Get the document with planStartDate
    const planDocument = await prisma.document.findUnique({
      where: { id: yearPlan.id },
      select: { id: true, planStartDate: true, planYears: true },
    })

    if (!planDocument?.planStartDate) {
      return NextResponse.json(
        { error: '3-Year Plan document is missing start date. Please re-upload the document to set the plan start date.' },
        { status: 400 }
      )
    }

    // Map calendar date to plan year context
    const weekDate = new Date(weekStarting)
    const planYearContext = mapCalendarToPlanYear(weekDate, planDocument.planStartDate)

    // Build query for semantic search
    const searchQuery = `What activities and milestones are planned for ${getMonthName(planYearContext.planMonth)} week ${planYearContext.planWeek} in year ${planYearContext.planYear}?`

    // Perform hybrid search: exact metadata match + semantic similarity
    const searchResults = await hybridSearch(
      yearPlan.id,
      searchQuery,
      {
        planYear: planYearContext.planYear,
        month: planYearContext.planMonth,
        week: planYearContext.planWeek,
      },
      {
        exactMatchLimit: 10,
        similarLimit: 3,
        minSimilarity: 0.7, // Only include chunks with 70%+ similarity
      }
    )

    if (searchResults.allRelevant.length === 0) {
      return NextResponse.json(
        { 
          error: `No plan found for Plan Year ${planYearContext.planYear}, ${getMonthName(planYearContext.planMonth)} Week ${planYearContext.planWeek}. Please ensure your 3-Year Plan document contains this information.` 
        },
        { status: 404 }
      )
    }

    // Combine plan chunks into context, prioritizing exact matches
    // Type assertion: allRelevant includes matchType from hybridSearch
    type SearchResultWithMatchType = typeof searchResults.allRelevant[0]
    
    const planContent = (searchResults.allRelevant as SearchResultWithMatchType[])
      .sort((a, b) => {
        // Sort: exact matches first, then by similarity
        const aType = a.matchType || 'similar'
        const bType = b.matchType || 'similar'
        if (aType === 'exact' && bType !== 'exact') return -1
        if (aType !== 'exact' && bType === 'exact') return 1
        return b.similarity - a.similarity
      })
      .map(chunk => {
        const matchType = chunk.matchType || 'similar'
        const prefix = matchType === 'exact' ? '[EXACT MATCH]' : `[SIMILAR: ${(chunk.similarity * 100).toFixed(0)}%]`
        return `${prefix}\n${chunk.chunkText}`
      })
      .join('\n\n')
      .trim()

    // Build prompt for Gemini
    const systemInstruction = `You are an AI assistant that helps generate weekly timesheet descriptions based on planned goals from a 3-Year Plan document.

Your task is to:
1. Understand the planned goals and activities for the specified week
2. Generate a concise, actionable weekly description that maps planned goals to execution tasks
3. Keep the description professional and focused on work activities
4. If an existing description is provided, enhance it by adding relevant planned activities (do not replace the existing content)`

    const userPrompt = `Based on this 3-Year Plan excerpt for Plan Year ${planYearContext.planYear}, ${getMonthName(planYearContext.planMonth)} Week ${planYearContext.planWeek}:

${planContent}

${existingDescription && existingDescription.trim() 
  ? `Current description: ${existingDescription}\n\nPlease enhance this description by adding relevant planned activities from the plan above. Keep the existing content and add to it.`
  : 'Generate a weekly timesheet description that maps these planned goals to actual execution tasks. Keep it concise and actionable.'}`

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      )
    }

    // Generate description using Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: [
        {
          role: 'model',
          parts: [{ text: systemInstruction }],
        },
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
    })

    const generatedDescription = response.text?.trim() || ''

    return NextResponse.json({
      description: generatedDescription,
      planContext: {
        calendarYear: planYearContext.calendarYear,
        calendarMonth: planYearContext.calendarMonth,
        calendarWeek: planYearContext.calendarWeek,
        planYear: planYearContext.planYear,
        planMonth: planYearContext.planMonth,
        planWeek: planYearContext.planWeek,
        exactMatches: searchResults.exactMatches.length,
        similarMatches: searchResults.similarChunks.length,
        totalChunks: searchResults.allRelevant.length,
      },
      debug: {
        searchQuery,
        retrievedChunks: searchResults.allRelevant.length,
      },
    })
  } catch (error) {
    console.error('Error generating description:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate description' },
      { status: 500 }
    )
  }
}

