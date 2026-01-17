import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { PDFDocument, StandardFonts } from "pdf-lib"
import { format, parseISO, getDaysInMonth } from "date-fns"
import type { WeeklyDescriptions } from "@/types/timesheet"

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

    const creatorUserId = decoded.userId
    const searchParams = req.nextUrl.searchParams
    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")
    const targetUserIdParam = searchParams.get("userId")

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 })
    }

    const monthStart = parseISO(startDateParam)
    const monthEnd = parseISO(endDateParam)

    // Determine target user (for whom the timesheet is being exported)
    let targetUserId = creatorUserId

    // If targetUserId is provided, validate it
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

    // Fetch the monthly timesheet for the selected user and month
    // Since only one timesheet per user per month exists, we should get at most one
    const timesheet = await prisma.timesheet.findFirst({
      where: {
        userId: targetUserId,
        startDate: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      include: {
        entries: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        organization: {
          select: {
            tax_rate: true,
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    })

    if (!timesheet) {
      return NextResponse.json({ error: "No timesheet found for the selected user and month" }, { status: 404 })
    }

    // Get user's full name for header
    const user = timesheet.user
    const userName = user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || "User"

    // Get hourly rate
    const hourlyRate = timesheet.hourlyRate || 0

    // Get tax rate (MERC) from organization
    const taxRate = timesheet.organization?.tax_rate
      ? Number.parseFloat(timesheet.organization.tax_rate.toString())
      : 20 // Default 20%

    // Extract weeklyDescriptions from timesheet
    const weeklyDescriptions = (timesheet.weeklyDescriptions as unknown as WeeklyDescriptions) || {
      week1: "",
      week2: "",
      week3: "",
      week4: "",
    }

    // Get month and year for calendar week calculations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const month = monthStart.getMonth() + 1 // 1-12
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const year = monthStart.getFullYear()
    const daysInMonth = getDaysInMonth(monthStart)

    // Group entries by day of month
    const entriesByDay = new Map<number, number>() // dayOfMonth -> total hours

    timesheet.entries.forEach((entry) => {
      const entryDate = new Date(entry.startTime)
      const dayOfMonth = entryDate.getDate()
      const existingHours = entriesByDay.get(dayOfMonth) || 0
      entriesByDay.set(dayOfMonth, existingHours + entry.duration)
    })

    // Calculate hours for each calendar week
    const week1Days = [1, 2, 3, 4, 5, 6, 7]
    const week2Days = [8, 9, 10, 11, 12, 13, 14]
    const week3Days = [15, 16, 17, 18, 19, 20, 21]
    const week4Days = [22, 23, 24, 25, 26, 27, 28]
    const extraDays = [29, 30, 31].filter((day) => day <= daysInMonth)

    const calculateWeekHours = (days: number[]) => {
      return days.reduce((sum, day) => sum + (entriesByDay.get(day) || 0), 0)
    }

    const week1Hours = calculateWeekHours(week1Days)
    const week2Hours = calculateWeekHours(week2Days)
    const week3Hours = calculateWeekHours(week3Days)
    const week4Hours = calculateWeekHours(week4Days)
    const extraDaysHours = calculateWeekHours(extraDays)

    // Build week entries array
    const weekEntries: Array<{
      weekRange: string
      description: string
      hours: number
      pay: number
      merc: number
    }> = []

    const monthName = format(monthStart, "MMMM")

    // Week 1
    if (week1Hours > 0 || weeklyDescriptions.week1) {
      const hours = week1Hours
      const pay = hours * hourlyRate
      const merc = pay * (taxRate / 100)
      weekEntries.push({
        weekRange: `${monthName} 1 – 7`,
        description: weeklyDescriptions.week1 || timesheet.description || "",
        hours,
        pay,
        merc,
      })
    }

    // Week 2
    if (week2Hours > 0 || weeklyDescriptions.week2) {
      const hours = week2Hours
      const pay = hours * hourlyRate
      const merc = pay * (taxRate / 100)
      weekEntries.push({
        weekRange: `${monthName} 8 – 14`,
        description: weeklyDescriptions.week2 || "",
        hours,
        pay,
        merc,
      })
    }

    // Week 3
    if (week3Hours > 0 || weeklyDescriptions.week3) {
      const hours = week3Hours
      const pay = hours * hourlyRate
      const merc = pay * (taxRate / 100)
      weekEntries.push({
        weekRange: `${monthName} 15 – 21`,
        description: weeklyDescriptions.week3 || "",
        hours,
        pay,
        merc,
      })
    }

    // Week 4
    if (week4Hours > 0 || weeklyDescriptions.week4) {
      const hours = week4Hours
      const pay = hours * hourlyRate
      const merc = pay * (taxRate / 100)
      weekEntries.push({
        weekRange: `${monthName} 22 – 28`,
        description: weeklyDescriptions.week4 || "",
        hours,
        pay,
        merc,
      })
    }

    // Extra Days (if applicable)
    if (extraDaysHours > 0 && extraDays.length > 0) {
      const hours = extraDaysHours
      const pay = hours * hourlyRate
      const merc = pay * (taxRate / 100)
      const lastDay = extraDays[extraDays.length - 1]
      weekEntries.push({
        weekRange: `${monthName} 29 – ${lastDay}`,
        description: "", // Extra days don't have weekly descriptions
        hours,
        pay,
        merc,
      })
    }

    // Calculate totals
    const totalPay = weekEntries.reduce((sum, entry) => sum + entry.pay, 0)
    const totalMerc = weekEntries.reduce((sum, entry) => sum + entry.merc, 0)
    const grandTotal = totalPay + totalMerc

    // Format month/year for header
    const monthYear = format(monthStart, "MMMM yyyy")
    // Get user's first name for filename (fallback to email if no first name)
    const userFirstName = user?.firstName || user?.email?.split("@")[0] || "User"

    // Create PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const descriptionFontSize = 10
    const lineHeight = 14
    const descriptionMaxWidth = 350 - 150 - 20

    const wrapText = (text: string) => {
      if (!text) return [""]

      const words = text.split(" ")
      const lines: string[] = []
      let currentLine = ""

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        const testWidth = font.widthOfTextAtSize(testLine, descriptionFontSize)

        if (testWidth <= descriptionMaxWidth) {
          currentLine = testLine
        } else {
          if (currentLine) lines.push(currentLine)
          currentLine = word
        }
      })

      if (currentLine) lines.push(currentLine)
      return lines
    }

    let yPos = height - 50

    // Header: "{FirstName} Timesheet - {Month Year}"
    page.drawText(`${userName} Timesheet - ${monthYear}`, {
      x: 50,
      y: yPos,
      size: 20,
      font: boldFont,
    })

    yPos -= 30

    // Top Section: Hourly Rate and MERC
    page.drawText(`Hourly Rate: $${hourlyRate.toFixed(2)}`, {
      x: 50,
      y: yPos,
      size: 12,
      font,
    })

    page.drawText(`MERC (${taxRate}%): Applied per week`, {
      x: 250,
      y: yPos,
      size: 12,
      font,
    })

    yPos -= 40

    // Table Header
    const headerY = yPos
    page.drawText("Week", {
      x: 50,
      y: headerY,
      size: 12,
      font: boldFont,
    })

    page.drawText("Description", {
      x: 150,
      y: headerY,
      size: 12,
      font: boldFont,
    })

    page.drawText("Hours", {
      x: 350,
      y: headerY,
      size: 12,
      font: boldFont,
    })

    page.drawText("Pay", {
      x: 400,
      y: headerY,
      size: 12,
      font: boldFont,
    })

    page.drawText("MERC", {
      x: 480,
      y: headerY,
      size: 12,
      font: boldFont,
    })

    yPos -= 25

    // Draw line under header
    page.drawLine({
      start: { x: 50, y: yPos + 5 },
      end: { x: width - 50, y: yPos + 5 },
      thickness: 1,
    })

    yPos -= 20

    // Table Rows
    weekEntries.forEach((entry) => {
      // Use full weekly description for export (no manual truncation)
      const descriptionLines = wrapText(entry.description || "")
      const rowHeight = Math.max(lineHeight, descriptionLines.length * lineHeight)

      page.drawText(entry.weekRange, {
        x: 50,
        y: yPos,
        size: 10,
        font,
      })

      descriptionLines.forEach((line, index) => {
        page.drawText(line || "-", {
          x: 150,
          y: yPos - index * lineHeight,
          size: descriptionFontSize,
          font,
        })
      })

      page.drawText(entry.hours.toFixed(1), {
        x: 350,
        y: yPos,
        size: 10,
        font,
      })

      page.drawText(`$${entry.pay.toFixed(2)}`, {
        x: 400,
        y: yPos,
        size: 10,
        font,
      })

      page.drawText(`$${entry.merc.toFixed(2)}`, {
        x: 480,
        y: yPos,
        size: 10,
        font,
      })

      yPos -= rowHeight
    })

    yPos -= 20

    // Summary Section
    page.drawText("Subtotal:", {
      x: 350,
      y: yPos,
      size: 12,
      font: boldFont,
    })

    page.drawText(`$${totalPay.toFixed(2)}`, {
      x: 480,
      y: yPos,
      size: 12,
      font: boldFont,
    })

    yPos -= 20

    page.drawText("MERC:", {
      x: 350,
      y: yPos,
      size: 12,
      font: boldFont,
    })

    page.drawText(`$${totalMerc.toFixed(2)}`, {
      x: 480,
      y: yPos,
      size: 12,
      font: boldFont,
    })

    yPos -= 20

    page.drawText("Grand Total:", {
      x: 350,
      y: yPos,
      size: 12,
      font: boldFont,
    })

    page.drawText(`$${grandTotal.toFixed(2)}`, {
      x: 480,
      y: yPos,
      size: 12,
      font: boldFont,
    })

    // Generate PDF
    const pdfBytes = await pdfDoc.save()

    return new NextResponse(pdfBytes as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Timesheet-${monthName}-${userFirstName}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error exporting timesheets:", error)
    return NextResponse.json({ error: "Failed to export timesheets" }, { status: 500 })
  }
}

