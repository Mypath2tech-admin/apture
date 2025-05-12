import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { type TimesheetEntry } from "@/types/timesheet"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const params = await context.params
    const { id } = params

    const timesheet = await prisma.timesheet.findUnique({
      where: { id },
      include: {
        entries: true,
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
            id: true,
            name: true,
          },
        },
      },
    })

    if (!timesheet) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    // Check if user has access to this timesheet
    if (timesheet.userId !== userId) {
      // Check if user is part of the organization
      if (timesheet.organizationId) {
        const userOrg = await prisma.user.findUnique({
          where: { id: userId },
          select: { organizationId: true },
        })

        if (userOrg?.organizationId !== timesheet.organizationId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }
    }

    return NextResponse.json(timesheet)
  } catch (error) {
    console.error("Error fetching timesheet:", error)
    return NextResponse.json({ error: "Failed to fetch timesheet" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const params = await context.params
    const { id } = params
    const data = await req.json()

    // Check if timesheet exists and user has access
    const existingTimesheet = await prisma.timesheet.findUnique({
      where: { id },
      include: { entries: true },
    })

    if (!existingTimesheet) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    if (existingTimesheet.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update timesheet
    const updatedTimesheet = await prisma.timesheet.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        // status: data.status,
      },
    })

    // Handle entries updates
    if (data.entries) {
      // Delete existing entries
      await prisma.timesheetEntry.deleteMany({
        where: { timesheetId: id },
      })

      // Create new entries
      for (const entry of data.entries as TimesheetEntry[]) {
        await prisma.timesheetEntry.create({
          data: {
            description: entry.description,
            // dayOfWeek: entry.dayOfWeek,
            // hours: entry.hours,
            startTime: new Date(entry.startTime),
            endTime: new Date(entry.endTime),
            duration: entry.duration,
            timesheet: { connect: { id } },
          },
        })
      }
    }

    return NextResponse.json(updatedTimesheet)
  } catch (error) {
    console.error("Error updating timesheet:", error)
    return NextResponse.json({ error: "Failed to update timesheet" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest,  context: { params: Promise<{ id: string }> }) {
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
      const params = await context.params
    const { id } = params

    // Check if timesheet exists and user has access
    const timesheet = await prisma.timesheet.findUnique({
      where: { id },
    })

    if (!timesheet) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    if (timesheet.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Delete timesheet (entries will be cascade deleted)
    await prisma.timesheet.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting timesheet:", error)
    return NextResponse.json({ error: "Failed to delete timesheet" }, { status: 500 })
  }
}
