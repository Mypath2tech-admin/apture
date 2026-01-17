import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { getWeekNumber } from "@/lib/date-utils"
import type { Timesheet, TimesheetEntry, WeeklyDescriptions } from "@/types/timesheet"
import type { Prisma } from "../../../../generated/prisma"

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
    
    // Get current user to check role and organization
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        organizationId: true,
      },
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is admin or organization admin
    const isAdmin = currentUser.role === "ADMIN" || currentUser.role === "ORGANIZATION_ADMIN"
    
    const searchParams = req.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit
    const filterUserId = searchParams.get("userId") // Optional user filter for admins

    // Build where clause
    const whereClause: Prisma.TimesheetWhereInput = {}
    
    if (isAdmin && currentUser.organizationId) {
      // Admins can see all timesheets in their organization
      whereClause.organizationId = currentUser.organizationId
      // If userId filter is provided, filter by that user
      if (filterUserId) {
        whereClause.userId = filterUserId
      }
    } else {
      // Regular users only see their own timesheets
      whereClause.userId = userId
    }

    const timesheets = await prisma.timesheet.findMany({
      where: whereClause,
      orderBy: { startDate: "desc" },
      skip,
      take: limit,
      include: {
        entries: true, // Include entries to calculate total hours
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        organization: {
          select: {
            tax_rate: true, // Using snake_case as per schema
          },
        },
      },
    })

    const total = await prisma.timesheet.count({ where: whereClause })

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

    const creatorUserId = decoded.userId
    const data = (await req.json()) as TimesheetRequestData

    // Validate required fields
    if (!data.startDate) {
      return NextResponse.json({ error: "Start date is required" }, { status: 400 })
    }

    // Determine target user (for whom the timesheet is being created)
    let targetUserId = creatorUserId

    // If targetUserId is provided, validate it
    if (data.targetUserId) {
      // Get creator's organization
      const creator = await prisma.user.findUnique({
        where: { id: creatorUserId },
        include: {
          organization: {
            select: {
              id: true,
              tax_rate: true,
            },
          },
        },
      })

      if (!creator) {
        return NextResponse.json({ error: "Creator not found" }, { status: 404 })
      }

      // Get target user and validate they're in the same organization
      const targetUser = await prisma.user.findUnique({
        where: { id: data.targetUserId },
        include: {
          organization: {
            select: {
              id: true,
              tax_rate: true,
            },
          },
        },
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

      targetUserId = data.targetUserId
    }

    // Get user's organization to fetch tax rate (use target user's organization)
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
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

    // Check for existing timesheet in the same month for the target user (prevent duplicates)
    const monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
    const monthEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)

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
      },
    })

    if (existingTimesheet) {
      return NextResponse.json(
        {
          error: "A timesheet already exists for this month",
          existingTimesheetId: existingTimesheet.id,
          existingTimesheetName: existingTimesheet.name,
        },
        { status: 409 } // Conflict
      )
    }

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
        weeklyDescriptions: data.weeklyDescriptions 
          ? (data.weeklyDescriptions as unknown as Prisma.InputJsonValue)
          : undefined,
        user: { connect: { id: targetUserId } },
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
    const totalHours = timesheet.entries.reduce((sum: number, entry: { duration: number }) => sum + entry.duration, 0)
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
