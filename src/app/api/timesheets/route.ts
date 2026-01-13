import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { getWeekNumber } from "@/lib/date-utils"
import type { Timesheet, TimesheetEntry, WeeklyDescriptions } from "@/types/timesheet"

interface TimesheetRequestData extends Timesheet {
  weeklyDescriptions?: WeeklyDescriptions
}

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
        entries: true, // Include entries to calculate total hours
        organization: {
          select: {
            tax_rate: true, // Using snake_case as per schema
          },
        },
      },
    })

    const total = await prisma.timesheet.count({ where: { userId } })

    // Process timesheets to include calculated fields
    const processedTimesheets = timesheets.map((timesheet) => {
      const totalHours = timesheet.entries.reduce((sum, entry) => sum + entry.duration, 0)
      const hourlyRate = timesheet.hourlyRate || 0
      const taxRate = timesheet.organization?.tax_rate
        ? Number.parseFloat(timesheet.organization.tax_rate.toString())
        : 0
      const subtotal = totalHours * hourlyRate
      const taxAmount = subtotal * (taxRate / 100)
      const totalAmount = subtotal + taxAmount

      return {
        ...timesheet,
        totalHours,
        hourlyRate,
        taxRate,
        subtotal,
        taxAmount,
        totalAmount,
      }
    })

    return NextResponse.json({
      timesheets: processedTimesheets,
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
    const data = (await req.json()) as TimesheetRequestData

    // Validate required fields
    if (!data.startDate) {
      return NextResponse.json({ error: "Start date is required" }, { status: 400 })
    }

    // Get user's organization to fetch tax rate
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: {
          select: {
            id: true,
            tax_rate: true, // Using snake_case as per schema
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const startDate = new Date(data.startDate)
    const weekNumber = getWeekNumber(startDate)

    // Use provided end date or calculate from start date
    const endDate = data.endDate ? new Date(data.endDate) : (() => {
      const calculatedEndDate = new Date(startDate)
      calculatedEndDate.setDate(calculatedEndDate.getDate() + 6)
      return calculatedEndDate
    })()

    // Get hourly rate from request or use default
    const hourlyRate = data.hourlyRate ? Number.parseFloat(data.hourlyRate.toString()) : 0

    // Get organization tax rate
    const orgTaxRate = user.organization?.tax_rate ? Number.parseFloat(user.organization.tax_rate.toString()) : 0

    // Create timesheet with weeklyDescriptions if provided
    const timesheet = await prisma.timesheet.create({
      data: {
        name: data.name || `Week ${weekNumber}, ${startDate.getFullYear()}`,
        description: data.description,
        startDate,
        endDate,
        hourlyRate,
        weeklyDescriptions: data.weeklyDescriptions || null,
        user: { connect: { id: userId } },
        organization: user.organization ? { connect: { id: user.organization.id } } : undefined,
        entries: {
          create: data.entries.map((entry: TimesheetEntry) => {
            const duration = entry.duration || 0

            return {
              description: entry.description,
              startTime: new Date(entry.startTime),
              endTime: new Date(entry.endTime),
              duration,
            }
          }),
        },
      },
      include: {
        entries: true,
        organization: {
          select: {
            id: true,
            name: true,
            tax_rate: true,
          },
        },
      },
    })

    // Calculate totals
    const totalHours = timesheet.entries.reduce((sum, entry) => sum + entry.duration, 0)
    const subtotal = totalHours * hourlyRate
    const taxAmount = subtotal * (orgTaxRate / 100)
    const totalAmount = subtotal + taxAmount

    return NextResponse.json(
      {
        ...timesheet,
        totalHours,
        subtotal,
        taxAmount,
        totalAmount,
        hourlyRate,
        taxRate: orgTaxRate,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating timesheet:", error)
    return NextResponse.json({ error: "Failed to create timesheet" }, { status: 500 })
  }
}
