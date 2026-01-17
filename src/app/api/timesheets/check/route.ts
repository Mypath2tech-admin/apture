import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

/**
 * Check if a timesheet already exists for a given month/year
 * GET /api/timesheets/check?year=2026&month=1
 */
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }

    const creatorUserId = decoded.userId
    const searchParams = req.nextUrl.searchParams
    const year = searchParams.get("year")
    const month = searchParams.get("month")
    const targetUserIdParam = searchParams.get("userId")

    if (!year || !month) {
      return NextResponse.json(
        { error: "Year and month are required" },
        { status: 400 }
      )
    }

    const yearNum = parseInt(year, 10)
    const monthNum = parseInt(month, 10)

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return NextResponse.json(
        { error: "Invalid year or month" },
        { status: 400 }
      )
    }

    // Determine which user to check for (target user or creator)
    let targetUserId = creatorUserId

    // If userId parameter is provided, validate it
    if (targetUserIdParam) {
      // Get creator's organization
      const creator = await prisma.user.findUnique({
        where: { id: creatorUserId },
        select: { organizationId: true },
      })

      if (!creator) {
        return NextResponse.json({ error: "Creator not found" }, { status: 404 })
      }

      // Get target user and validate they're in the same organization
      const targetUser = await prisma.user.findUnique({
        where: { id: targetUserIdParam },
        select: { id: true, organizationId: true },
      })

      if (!targetUser) {
        return NextResponse.json({ error: "Target user not found" }, { status: 404 })
      }

      // Validate both users are in the same organization
      if (creator.organizationId !== targetUser.organizationId) {
        return NextResponse.json(
          { error: "Target user must be in the same organization" },
          { status: 403 }
        )
      }

      targetUserId = targetUserIdParam
    }

    // Calculate date range for the month
    const monthStart = new Date(yearNum, monthNum - 1, 1)
    const monthEnd = new Date(yearNum, monthNum, 0) // Last day of month

    // Find any timesheet that overlaps with this month for the target user
    // A timesheet overlaps if its start date falls within the month
    const existingTimesheet = await prisma.timesheet.findFirst({
      where: {
        userId: targetUserId,
        startDate: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        startDate: "asc",
      },
    })

    if (existingTimesheet) {
      return NextResponse.json({
        exists: true,
        timesheet: {
          id: existingTimesheet.id,
          name: existingTimesheet.name,
          startDate: existingTimesheet.startDate.toISOString(),
          endDate: existingTimesheet.endDate?.toISOString() || null,
        },
      })
    }

    return NextResponse.json({ exists: false })
  } catch (error) {
    console.error("Error checking timesheet:", error)
    return NextResponse.json(
      { error: "Failed to check timesheet" },
      { status: 500 }
    )
  }
}
