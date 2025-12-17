import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { PDFDocument, StandardFonts } from "pdf-lib"
import { format, parseISO } from "date-fns"

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
    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 })
    }

    const monthStart = parseISO(startDateParam)
    const monthEnd = parseISO(endDateParam)

    // Fetch all timesheets for the selected month
    const timesheets = await prisma.timesheet.findMany({
      where: {
        userId,
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

    if (timesheets.length === 0) {
      return NextResponse.json({ error: "No timesheets found for the selected month" }, { status: 404 })
    }

    // Get user's first name for header
    const firstName = timesheets[0].user?.firstName || "User"
    const userName = firstName

    // Get hourly rate (assume same rate for all timesheets in month, use first one)
    const hourlyRate = timesheets[0].hourlyRate || 0

    // Get tax rate (MERC) from organization
    const taxRate = timesheets[0].organization?.tax_rate
      ? Number.parseFloat(timesheets[0].organization.tax_rate.toString())
      : 20 // Default 20%

    // Group timesheets by week and aggregate
    const weekMap = new Map<string, {
      weekStart: Date
      weekEnd: Date
      description: string
      hours: number
      pay: number
      merc: number
    }>()

    timesheets.forEach((timesheet) => {
      // Use the timesheet's actual start and end dates
      const weekStart = new Date(timesheet.startDate)
      const weekEnd = timesheet.endDate ? new Date(timesheet.endDate) : new Date(weekStart)
      // Use start date as key for grouping (timesheets are already grouped by week)
      const weekKey = format(weekStart, "yyyy-MM-dd")

      // Calculate total hours for this timesheet
      const totalHours = timesheet.entries.reduce((sum, entry) => sum + entry.duration, 0)
      const pay = totalHours * hourlyRate
      const merc = pay * (taxRate / 100)

      if (weekMap.has(weekKey)) {
        // Aggregate with existing week entry
        const existing = weekMap.get(weekKey)!
        existing.hours += totalHours
        existing.pay += pay
        existing.merc += merc
        // Use description from timesheet if it exists, otherwise keep existing
        if (timesheet.description && !existing.description) {
          existing.description = timesheet.description
        }
      } else {
        // Create new week entry
        weekMap.set(weekKey, {
          weekStart,
          weekEnd,
          description: timesheet.description || "",
          hours: totalHours,
          pay,
          merc,
        })
      }
    })

    // Convert map to array and sort by week start date
    const weekEntries = Array.from(weekMap.values()).sort(
      (a, b) => a.weekStart.getTime() - b.weekStart.getTime()
    )

    // Calculate totals
    const totalPay = weekEntries.reduce((sum, entry) => sum + entry.pay, 0)
    const totalMerc = weekEntries.reduce((sum, entry) => sum + entry.merc, 0)
    const grandTotal = totalPay + totalMerc

    // Format month/year for header
    const monthYear = format(monthStart, "MMMM yyyy")

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
      // Format week range (e.g., "Jul 1-4")
      const weekStartFormatted = format(entry.weekStart, "MMM d")
      const weekEndFormatted = format(entry.weekEnd, "d")
      const weekRange = `${weekStartFormatted}-${weekEndFormatted}`

      // Use full weekly description for export (no manual truncation)
      const descriptionLines = wrapText(entry.description || "")
      const rowHeight = Math.max(lineHeight, descriptionLines.length * lineHeight)

      page.drawText(weekRange, {
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
    page.drawText(`Subtotal (${userName}):`, {
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
        "Content-Disposition": `attachment; filename="Timesheet-Export-${monthYear.replace(" ", "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error exporting timesheets:", error)
    return NextResponse.json({ error: "Failed to export timesheets" }, { status: 500 })
  }
}

