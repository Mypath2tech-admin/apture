import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import * as XLSX from "xlsx"
import { PDFDocument, StandardFonts } from "pdf-lib"
import { format } from "date-fns"

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
    const searchParams = req.nextUrl.searchParams
    const exportFormat = searchParams.get("format") || "pdf"

    // Fetch timesheet with entries
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
      },
    })

    if (!timesheet) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    // Check if user has access to this timesheet
    if (timesheet.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Format dates
    const startDateFormatted = format(new Date(timesheet.startDate), "MMM d, yyyy")
    const endDateFormatted = timesheet.endDate ? format(new Date(timesheet.endDate), "MMM d, yyyy") : ""

    const weekRange = `${startDateFormatted} - ${endDateFormatted}`
    const userName =
      timesheet.user?.firstName && timesheet.user?.lastName
        ? `${timesheet.user.firstName} ${timesheet.user.lastName}`
        : timesheet.user?.email || "User"

    // Group entries by day of week
    const entriesByDay = Array(7)
      .fill(null)
      .map((_, i) => {
        // Calculate the date for this day of the week
        const dayDate = new Date(timesheet.startDate)
        dayDate.setDate(dayDate.getDate() + i)
        const dayFormatted = format(dayDate, "yyyy-MM-dd")

        // Find entries for this day
        const dayEntries = timesheet.entries.filter(
          (entry) => format(new Date(entry.startTime), "yyyy-MM-dd") === dayFormatted,
        )

        // Calculate total duration for this day
        const totalDuration = dayEntries.reduce((sum, entry) => sum + entry.duration, 0)

        // Combine descriptions if multiple entries
        const description = dayEntries.map((e) => e.description).join("; ")

        return {
          day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i],
          duration: totalDuration,
          description: description,
        }
      })

    // Calculate total duration
    const totalDuration = entriesByDay.reduce((sum, entry) => sum + entry.duration, 0)

    if (exportFormat === "xlsx") {
      // Create Excel workbook
      const wb = XLSX.utils.book_new()

      // Create worksheet data
      const wsData = [
        ["Timesheet", "", ""],
        ["Week:", weekRange, ""],
        ["User:", userName, ""],
        ["", "", ""],
        ["Day", "Hours", "Description"],
      ]

      // Add entries
      entriesByDay.forEach((entry) => {
        wsData.push([entry.day, entry.duration.toString(), entry.description])
      })

      // Add totals
      wsData.push(["", "", ""])
      wsData.push(["Total Hours:", totalDuration.toString(),])

      // Create worksheet and add to workbook
      const ws = XLSX.utils.aoa_to_sheet(wsData)
      XLSX.utils.book_append_sheet(wb, ws, "Timesheet")

      // Generate Excel file
      const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })

      return new NextResponse(excelBuffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="Timesheet-${timesheet.id}.xlsx"`,
        },
      })
    } else {
      // Create PDF document
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage()
      const { height } = page.getSize()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      // Add title
      page.drawText("Timesheet", {
        x: 50,
        y: height - 50,
        size: 24,
        font: boldFont,
      })

      // Add header info
      page.drawText(`Week: ${weekRange}`, {
        x: 50,
        y: height - 90,
        size: 12,
        font,
      })

      page.drawText(`User: ${userName}`, {
        x: 50,
        y: height - 110,
        size: 12,
        font,
      })

      // Add table header
      page.drawText("Day", {
        x: 50,
        y: height - 170,
        size: 12,
        font: boldFont,
      })

      page.drawText("Hours", {
        x: 150,
        y: height - 170,
        size: 12,
        font: boldFont,
      })

      page.drawText("Description", {
        x: 250,
        y: height - 170,
        size: 12,
        font: boldFont,
      })

      // Add entries
      entriesByDay.forEach((entry, index) => {
        const yPos = height - 200 - index * 20

        page.drawText(entry.day, {
          x: 50,
          y: yPos,
          size: 10,
          font,
        })

        page.drawText(entry.duration.toString(), {
          x: 150,
          y: yPos,
          size: 10,
          font,
        })

        // Truncate description if too long
        const desc = entry.description.length > 50 ? entry.description.substring(0, 47) + "..." : entry.description

        page.drawText(desc, {
          x: 250,
          y: yPos,
          size: 10,
          font,
        })
      })

      // Add totals
      const totalsY = height - 200 - entriesByDay.length * 20 - 30

      page.drawText("Total Hours:", {
        x: 50,
        y: totalsY,
        size: 12,
        font: boldFont,
      })

      page.drawText(totalDuration.toString(), {
        x: 150,
        y: totalsY,
        size: 12,
        font,
      })

      // Generate PDF
      const pdfBytes = await pdfDoc.save()

      return new NextResponse(pdfBytes, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="Timesheet-${timesheet.id}.pdf"`,
        },
      })
    }
  } catch (error) {
    console.error("Error exporting timesheet:", error)
    return NextResponse.json({ error: "Failed to export timesheet" }, { status: 500 })
  }
}
