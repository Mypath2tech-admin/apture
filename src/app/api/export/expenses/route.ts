import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import * as XLSX from "xlsx"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

// Define proper interfaces instead of using 'any'
interface ExpenseCategory {
  name: string
}

interface ExpenseBudget {
  name: string
}

interface ExpenseUser {
  firstName: string | null
  lastName: string | null
  email: string
}

interface Expense {
  id: string
  date: Date
  description: string | null
  amount: number
  category: ExpenseCategory | null
  budget: ExpenseBudget | null
  user: ExpenseUser | null
  receiptUrl: string | null
//   status: string
  createdAt: Date
}

interface FormattedExpense {
  id: string
  date: string
  description: string
  amount: number
  category: string
  budget: string
  submittedBy: string
  email: string
  receiptUrl: string
//   status: string
  createdAt: string
}

interface CategorySummary {
  category: string
  count: number
  totalAmount: number
}

interface DateFilter {
  gte?: Date
  lte?: Date
}
interface WhereClause {
  organizationId: string | null
  date?: DateFilter
  categoryId?: {
    in: string[]
  }
  budgetId?: {
    in: string[]
  }
}


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        organizationId: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const exportFormat = searchParams.get("format") || "csv"
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined
    const reportType = searchParams.get("reportType") || "detailed"
    const includeReceipts = searchParams.get("includeReceipts") === "true"

    // Get category and budget filters
    const categories = searchParams.getAll("categories")
    const budgets = searchParams.getAll("budgets")

    // Build the query
    const where: WhereClause  = {
      organizationId: user.organizationId,
    }

    // Add date filters
    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = new Date(startDate)
      if (endDate) {
        // Set the end date to the end of the day
        const endDateTime = new Date(endDate)
        endDateTime.setHours(23, 59, 59, 999)
        where.date.lte = endDateTime
      }
    }

    // Add category filter
    if (categories.length > 0) {
      where.categoryId = {
        in: categories,
      }
    }
    // Add budget filter
    if (budgets.length > 0) {
      where.budgetId = {
        in: budgets,
      }
    }

    // Fetch expenses
    const expenses = await prisma.expense.findMany({
      where,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        budget: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    }) as unknown as Expense[];

    // Format the data for export
    const formattedExpenses: FormattedExpense[] = expenses.map((expense) => ({
      id: expense.id,
      date: format(expense.date, "yyyy-MM-dd"),
      description: expense.description || "",
      amount: expense.amount,
      category: expense.category?.name || "Uncategorized",
      budget: expense.budget?.name || "No Budget",
      submittedBy: expense.user
        ? `${expense.user.firstName || ""} ${expense.user.lastName || ""}`.trim() || expense.user.email
        : "Unknown",
      email: expense.user?.email || "",
      receiptUrl: expense.receiptUrl || "",
    //   status: expense.status,
      createdAt: format(expense.createdAt, "yyyy-MM-dd HH:mm:ss"),
    }))

    // Generate the export based on the requested format
    switch (exportFormat) {
      case "csv":
        return generateCsvExport(formattedExpenses, reportType)
      case "excel":
        return generateExcelExport(formattedExpenses, reportType)
      case "pdf":
        return generatePdfExport(formattedExpenses, reportType, includeReceipts)
      default:
        return NextResponse.json({ error: "Unsupported export format" }, { status: 400 })
    }
  } catch (error) {
    console.error("Export expenses error:", error)
    return NextResponse.json({ error: "Failed to export expenses" }, { status: 500 })
  }
}

// Generate CSV export
function generateCsvExport(expenses: FormattedExpense[], reportType: string) {
  let csvContent: string

  if (reportType === "summary") {
    // Group expenses by category
    const categorySummary: Record<string, CategorySummary> = expenses.reduce(
      (acc, expense) => {
        const category = expense.category
        if (!acc[category]) {
          acc[category] = {
            category,
            count: 0,
            totalAmount: 0,
          }
        }
        acc[category].count += 1
        acc[category].totalAmount += expense.amount
        return acc
      },
      {} as Record<string, CategorySummary>,
    )

    // Convert to array
    const summaryData = Object.values(categorySummary)

    // Create CSV header
    csvContent = "Category,Count,Total Amount\n"

    // Add data rows
    summaryData.forEach((item) => {
      csvContent += `"${item.category}",${item.count},${item.totalAmount.toFixed(2)}\n`
    })
  } else {
    // Create CSV header
    csvContent = "Date,Description,Amount,Category,Budget,Submitted By,Status\n"

    // Add data rows
    expenses.forEach((expense) => {
      csvContent += `"${expense.date}","${expense.description.replace(/"/g, '""')}",${expense.amount.toFixed(
        2,
      )},"${expense.category}","${expense.budget}","${expense.submittedBy}"\n`
    })
  }

  // Create response with CSV content
  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="expenses_${format(new Date(), "yyyy-MM-dd")}.csv"`,
    },
  })
}

// Generate Excel export
function generateExcelExport(expenses: FormattedExpense[], reportType: string) {
  let worksheetData: Record<string, string | number>[]

  if (reportType === "summary") {
    // Group expenses by category
    const categorySummary: Record<string, CategorySummary> = expenses.reduce(
      (acc, expense) => {
        const category = expense.category
        if (!acc[category]) {
          acc[category] = {
            Category: category,
            Count: 0,
            "Total Amount": 0,
          } as unknown as CategorySummary
        }
        acc[category].count += 1
        acc[category]["totalAmount"] += expense.amount
        return acc
      },
      {} as Record<string, CategorySummary>,
    )

    // Convert to array
    worksheetData = Object.values(categorySummary) as unknown as Record<string, string | number>[]
  } else {
    // Map expenses to worksheet data
    worksheetData = expenses.map((expense) => ({
      Date: expense.date,
      Description: expense.description,
      Amount: expense.amount,
      Category: expense.category,
      Budget: expense.budget,
      "Submitted By": expense.submittedBy,
    //   Status: expense.status,
    }))
  }

  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses")

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

  // Create response with Excel content
  return new NextResponse(excelBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="expenses_${format(new Date(), "yyyy-MM-dd")}.xlsx"`,
    },
  })
}

// Generate PDF export
async function generatePdfExport(expenses: FormattedExpense[], reportType: string, includeReceipts: boolean) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()
  const firstPage = pdfDoc.addPage()
  const { width, height } = firstPage.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Set up some constants
  const margin = 50
  const fontSize = 10
  const headerFontSize = 14
  const lineHeight = fontSize * 1.5
  let yPosition = height - margin
  let currentPage = firstPage

  // Add title
  currentPage.drawText("Expense Report", {
    x: margin,
    y: yPosition,
    size: headerFontSize,
    font: boldFont,
  })
  yPosition -= lineHeight * 1.5

  // Add generation date
  currentPage.drawText(`Generated on: ${format(new Date(), "MMMM d, yyyy")}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
  })
  yPosition -= lineHeight * 2

  if (reportType === "summary") {
    // Group expenses by category
    const categorySummary: Record<string, CategorySummary> = expenses.reduce(
      (acc, expense) => {
        const category = expense.category
        if (!acc[category]) {
          acc[category] = {
            category,
            count: 0,
            totalAmount: 0,
          }
        }
        acc[category].count += 1
        acc[category].totalAmount += expense.amount
        return acc
      },
      {} as Record<string, CategorySummary>,
    )

    // Convert to array
    const summaryData = Object.values(categorySummary)

    // Draw table header
    currentPage.drawText("Category", {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Count", {
      x: margin + 200,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Total Amount", {
      x: margin + 300,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    yPosition -= lineHeight

    // Draw horizontal line
    currentPage.drawLine({
      start: { x: margin, y: yPosition + fontSize / 2 },
      end: { x: width - margin, y: yPosition + fontSize / 2 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    })
    yPosition -= lineHeight

    // Draw table rows
    for (const item of summaryData) {
      // Check if we need a new page
      if (yPosition < margin) {
        currentPage = pdfDoc.addPage()
        yPosition = height - margin
      }

      currentPage.drawText(item.category, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(item.count.toString(), {
        x: margin + 200,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(`$${item.totalAmount.toFixed(2)}`, {
        x: margin + 300,
        y: yPosition,
        size: fontSize,
        font,
      })
      yPosition -= lineHeight
    }

    // Draw total
    const totalAmount = summaryData.reduce((sum, item) => sum + item.totalAmount, 0)
    yPosition -= lineHeight
    currentPage.drawLine({
      start: { x: margin, y: yPosition + fontSize / 2 },
      end: { x: width - margin, y: yPosition + fontSize / 2 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    })
    yPosition -= lineHeight
    currentPage.drawText("Total", {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText(`$${totalAmount.toFixed(2)}`, {
      x: margin + 300,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
  } else {
    // Draw table header
    currentPage.drawText("Date", {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Description", {
      x: margin + 80,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Amount", {
      x: margin + 250,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Category", {
      x: margin + 320,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Status", {
      x: margin + 430,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    yPosition -= lineHeight

    // Draw horizontal line
    currentPage.drawLine({
      start: { x: margin, y: yPosition + fontSize / 2 },
      end: { x: width - margin, y: yPosition + fontSize / 2 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    })
    yPosition -= lineHeight

    // Draw table rows
    for (const expense of expenses) {
      // Check if we need a new page
      if (yPosition < margin) {
        currentPage = pdfDoc.addPage()
        yPosition = height - margin
      }

      currentPage.drawText(expense.date, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font,
      })

      // Truncate description if too long
      let description = expense.description
      if (description.length > 25) {
        description = description.substring(0, 22) + "..."
      }
      currentPage.drawText(description, {
        x: margin + 80,
        y: yPosition,
        size: fontSize,
        font,
      })

      currentPage.drawText(`$${expense.amount.toFixed(2)}`, {
        x: margin + 250,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(expense.category, {
        x: margin + 320,
        y: yPosition,
        size: fontSize,
        font,
      })
    //   currentPage.drawText(expense.status, {
    //     x: margin + 430,
    //     y: yPosition,
    //     size: fontSize,
    //     font,
    //   })
      yPosition -= lineHeight

      // Add receipt image if requested and available
      if (includeReceipts && expense.receiptUrl) {
        // In a real implementation, you would fetch the receipt image and embed it
        // For this example, we'll just add a placeholder text
        yPosition -= lineHeight
        currentPage.drawText("Receipt image would be displayed here", {
          x: margin + 80,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
        })
        yPosition -= lineHeight * 2
      }
    }

    // Draw total
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    yPosition -= lineHeight
    currentPage.drawLine({
      start: { x: margin, y: yPosition + fontSize / 2 },
      end: { x: width - margin, y: yPosition + fontSize / 2 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    })
    yPosition -= lineHeight
    currentPage.drawText("Total", {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText(`$${totalAmount.toFixed(2)}`, {
      x: margin + 250,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save()

  // Create response with PDF content
  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="expenses_${format(new Date(), "yyyy-MM-dd")}.pdf"`,
    },
  })
}
