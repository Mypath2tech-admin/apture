import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { getWeekNumber } from "@/lib/date-utils"
import type { Timesheet, TimesheetEntry } from "@/types/timesheet"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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

    const userId = decoded.userId
    const searchParams = req.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const timesheets = await prisma.timesheet.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      skip,
      take: limit,
      include: {
        _count: {
          select: { entries: true },
        },
      },
    })

    const total = await prisma.timesheet.count({ where: { userId } })

    return NextResponse.json({
      timesheets,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching timesheets:", error)
    return NextResponse.json({ error: "Failed to fetch timesheets" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
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

    const userId = decoded.userId
    const data = (await req.json()) as Timesheet

    // Validate required fields
    if (!data.startDate) {
      return NextResponse.json({ error: "Start date is required" }, { status: 400 })
    }

    const startDate = new Date(data.startDate)
    const weekNumber = getWeekNumber(startDate)

    // Calculate end date (7 days from start)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 6)

    // Create timesheet
    const timesheet = await prisma.timesheet.create({
      data: {
        name: data.name || `Week ${weekNumber}, ${startDate.getFullYear()}`,
        description: data.description,
        startDate,
        endDate,
        // status: "DRAFT",
        user: { connect: { id: userId } },
        organization: data.organizationId ? { connect: { id: data.organizationId } } : undefined,
        entries: {
          create: data.entries.map((entry: TimesheetEntry) => ({
            description: entry.description,
            startTime: new Date(entry.startTime),
            endTime: new Date(entry.endTime),
            duration: entry.duration,
          })),
        },
      },
    })

    return NextResponse.json(timesheet, { status: 201 })
  } catch (error) {
    console.error("Error creating timesheet:", error)
    return NextResponse.json({ error: "Failed to create timesheet" }, { status: 500 })
  }
}
