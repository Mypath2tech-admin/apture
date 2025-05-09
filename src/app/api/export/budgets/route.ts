import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import * as XLSX from "xlsx"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

// Define proper interfaces instead of using 'any'
interface BudgetCategory {
  id: string
  name: string
  allocatedAmount: number | null
}

interface BudgetExpense {
  id: string
  date: Date
  amount: number
  description: string
  categoryId: string | null
  category: {
    name: string
  } | null
}

interface BudgetUser {
  firstName: string | null
  lastName: string | null
  email: string
}

interface Budget {
  id: string
  name: string
  amount: number
  startDate: Date | null
  endDate: Date | null
  // status: string
  categories: BudgetCategory[]
  expenses?: BudgetExpense[]
  user: BudgetUser | null
  createdAt: Date
}

interface FormattedBudget {
  id: string
  name: string
  amount: number
  startDate: string
  endDate: string
  // status: string
  categories: string
  categoryCount: number
  totalAllocated: number
  totalSpent: number
  remaining: number
  percentSpent: number
  createdBy: string
  createdAt: string
  expenses: BudgetExpense[]
}
interface DateFilter {
  gte?: Date
  lte?: Date
}
interface WhereClause {
  // status: { in: string[] }
  organizationId: string | null
  startDate?: DateFilter
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
    const includeExpenses = searchParams.get("includeExpenses") === "true"

    // Get category and status filters
    const categories = searchParams.getAll("categories")
    // const statuses = searchParams.getAll("status")

    // Build the query
    const where: WhereClause = {
      organizationId: user.organizationId,
    }

    // Add date filters
    if (startDate || endDate) {
      where.startDate = {}
      if (startDate) where.startDate.gte = new Date(startDate)
      if (endDate) {
        // Set the end date to the end of the day
        const endDateTime = new Date(endDate)
        endDateTime.setHours(23, 59, 59, 999)
        where.startDate.lte = endDateTime
      }
    }

    // Add status filter
    // if (statuses.length > 0) {
    //   where.status = {
    //     in: statuses,
    //   }
    // }

    // Fetch budgets
    const budgets = await prisma.budget.findMany({
      where,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            allocatedAmount: true,
          },
        },
        expenses: includeExpenses
          ? {
              select: {
                id: true,
                date: true,
                amount: true,
                description: true,
                categoryId: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            }
          : false,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    }) as unknown as Budget[];

    // Filter by categories if specified
    let filteredBudgets = budgets
    if (categories.length > 0) {
      filteredBudgets = budgets.filter((budget) =>
        budget.categories.some((category) => categories.includes(category.id)),
      )
    }

    
    const formattedBudgets: FormattedBudget[] = filteredBudgets.map((budget) => {
     
      const totalSpent = budget.expenses ? budget.expenses.reduce((sum, expense) => sum + expense.amount, 0) : 0

      return {
        id: budget.id,
        name: budget.name,
        amount: budget.amount,
        startDate: budget.startDate ? format(budget.startDate, "yyyy-MM-dd") : "N/A",
        endDate: budget.endDate ? format(budget.endDate, "yyyy-MM-dd") : "N/A",
        // status: budget.status,
        categories: budget.categories.map((c) => c.name).join(", "),
        categoryCount: budget.categories.length,
        totalAllocated: budget.categories.reduce((sum, cat) => sum + (cat.allocatedAmount || 0), 0),
        totalSpent,
        remaining: budget.amount - totalSpent,
        percentSpent: budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0,
        createdBy: budget.user
          ? `${budget.user.firstName || ""} ${budget.user.lastName || ""}`.trim() || budget.user.email
          : "Unknown",
        createdAt: format(budget.createdAt, "yyyy-MM-dd"),
        expenses: budget.expenses || [],
      }
    })

    // Generate the export based on the requested format
    switch (exportFormat) {
      case "csv":
        return generateCsvExport(formattedBudgets, reportType)
      case "excel":
        return generateExcelExport(formattedBudgets, reportType, includeExpenses)
      case "pdf":
        return generatePdfExport(formattedBudgets, reportType)
      default:
        return NextResponse.json({ error: "Unsupported export format" }, { status: 400 })
    }
  } catch (error) {
    console.error("Export budgets error:", error)
    return NextResponse.json({ error: "Failed to export budgets" }, { status: 500 })
  }
}

// Generate CSV export
function generateCsvExport(budgets: FormattedBudget[], reportType: string) {
  let csvContent: string

  if (reportType === "summary") {
    // Create CSV header
    csvContent = "Name,Amount,Start Date,End Date,Status,Category Count,Total Allocated,Total Spent,Remaining,% Spent\n"

    // Add data rows
    budgets.forEach((budget) => {
      csvContent += `"${budget.name}",${budget.amount.toFixed(2)},"${budget.startDate}","${budget.endDate}",
      }",${budget.categoryCount},${budget.totalAllocated.toFixed(2)},${budget.totalSpent.toFixed(
        2,
      )},${budget.remaining.toFixed(2)},${budget.percentSpent.toFixed(1)}\n`
    })
  } else {
    // Create CSV header
    csvContent = "Name,Amount,Start Date,End Date,Status,Categories,Created By,Created At\n"

    // Add data rows
    budgets.forEach((budget) => {
      csvContent += `"${budget.name}",${budget.amount.toFixed(2)},"${budget.startDate}","${budget.endDate}"
      }","${budget.categories}","${budget.createdBy}","${budget.createdAt}"\n`
    })
  }

  // Create response with CSV content
  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="budgets_${format(new Date(), "yyyy-MM-dd")}.csv"`,
    },
  })
}

// Generate Excel export
function generateExcelExport(budgets: FormattedBudget[], reportType: string, includeExpenses: boolean) {
  const workbook = XLSX.utils.book_new()

  // Create main budget worksheet
  let worksheetData: Record<string, string | number>[]

  if (reportType === "summary") {
    worksheetData = budgets.map((budget) => ({
      Name: budget.name,
      Amount: budget.amount,
      "Start Date": budget.startDate,
      "End Date": budget.endDate,
      // Status: budget.status,
      "Category Count": budget.categoryCount,
      "Total Allocated": budget.totalAllocated,
      "Total Spent": budget.totalSpent,
      Remaining: budget.remaining,
      "% Spent": `${budget.percentSpent.toFixed(1)}%`,
    }))
  } else {
    worksheetData = budgets.map((budget) => ({
      Name: budget.name,
      Amount: budget.amount,
      "Start Date": budget.startDate,
      "End Date": budget.endDate,
      // Status: budget.status,
      Categories: budget.categories,
      "Created By": budget.createdBy,
      "Created At": budget.createdAt,
    }))
  }

  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  XLSX.utils.book_append_sheet(workbook, worksheet, "Budgets")

  // Add expenses worksheet if requested
  if (includeExpenses) {
    const allExpenses: Record<string, string | number>[] = []

    budgets.forEach((budget) => {
      if (budget.expenses && budget.expenses.length > 0) {
        budget.expenses.forEach((expense) => {
          allExpenses.push({
            Budget: budget.name,
            Date: expense.date ? format(new Date(expense.date), "yyyy-MM-dd") : "N/A",
            Description: expense.description,
            Amount: expense.amount,
            Category: expense.category?.name || "Uncategorized",
          })
        })
      }
    })

    if (allExpenses.length > 0) {
      const expensesWorksheet = XLSX.utils.json_to_sheet(allExpenses)
      XLSX.utils.book_append_sheet(workbook, expensesWorksheet, "Expenses")
    }
  }

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

  // Create response with Excel content
  return new NextResponse(excelBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="budgets_${format(new Date(), "yyyy-MM-dd")}.xlsx"`,
    },
  })
}

// Generate PDF export
async function generatePdfExport(budgets: FormattedBudget[], reportType: string) {
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
  currentPage.drawText("Budget Report", {
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
    // Draw table header
    currentPage.drawText("Budget", {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Amount", {
      x: margin + 150,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Spent", {
      x: margin + 220,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("Remaining", {
      x: margin + 290,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText("% Used", {
      x: margin + 380,
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
    for (const budget of budgets) {
      // Check if we need a new page
      if (yPosition < margin) {
        currentPage = pdfDoc.addPage()
        yPosition = height - margin
      }

      // Truncate name if too long
      let name = budget.name
      if (name.length > 20) {
        name = name.substring(0, 17) + "..."
      }

      currentPage.drawText(name, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(`$${budget.amount.toFixed(2)}`, {
        x: margin + 150,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(`$${budget.totalSpent.toFixed(2)}`, {
        x: margin + 220,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(`$${budget.remaining.toFixed(2)}`, {
        x: margin + 290,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(`${budget.percentSpent.toFixed(1)}%`, {
        x: margin + 380,
        y: yPosition,
        size: fontSize,
        font,
      })
      yPosition -= lineHeight
    }

    // Draw total
    const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0)
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.totalSpent, 0)
    const totalRemaining = totalAmount - totalSpent
    const totalPercentSpent = totalAmount > 0 ? (totalSpent / totalAmount) * 100 : 0

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
      x: margin + 150,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText(`$${totalSpent.toFixed(2)}`, {
      x: margin + 220,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText(`$${totalRemaining.toFixed(2)}`, {
      x: margin + 290,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
    currentPage.drawText(`${totalPercentSpent.toFixed(1)}%`, {
      x: margin + 380,
      y: yPosition,
      size: fontSize,
      font: boldFont,
    })
  } else {
    // Detailed report
    for (const budget of budgets) {
      // Check if we need a new page
      if (yPosition < margin + 100) {
        currentPage = pdfDoc.addPage()
        yPosition = height - margin
      }

      // Budget header
      currentPage.drawText(budget.name, {
        x: margin,
        y: yPosition,
        size: fontSize + 2,
        font: boldFont,
      })
      yPosition -= lineHeight

      // Budget details
      currentPage.drawText(`Amount: $${budget.amount.toFixed(2)}`, {
        x: margin + 20,
        y: yPosition,
        size: fontSize,
        font,
      })
      // currentPage.drawText(`Status: ${budget.status}`, {
      //   x: margin + 200,
      //   y: yPosition,
      //   size: fontSize,
      //   font,
      // })
       yPosition -= lineHeight

      currentPage.drawText(`Period: ${budget.startDate} to ${budget.endDate}`, {
        x: margin + 20,
        y: yPosition,
        size: fontSize,
        font,
      })
      yPosition -= lineHeight

      currentPage.drawText(`Categories: ${budget.categories}`, {
        x: margin + 20,
        y: yPosition,
        size: fontSize,
        font,
      })
      yPosition -= lineHeight

      currentPage.drawText(`Spent: $${budget.totalSpent.toFixed(2)} (${budget.percentSpent.toFixed(1)}%)`, {
        x: margin + 20,
        y: yPosition,
        size: fontSize,
        font,
      })
      currentPage.drawText(`Remaining: $${budget.remaining.toFixed(2)}`, {
        x: margin + 200,
        y: yPosition,
        size: fontSize,
        font,
      })
      yPosition -= lineHeight * 2
    }
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save()

  // Create response with PDF content
  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="budgets_${format(new Date(), "yyyy-MM-dd")}.pdf"`,
    },
  })
}
