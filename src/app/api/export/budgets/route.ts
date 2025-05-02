import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import type { ExportRequestParams } from "@/types/export"
import { type Prisma } from "../../../../../generated/prisma"


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface BudgetWhereClause {
  organizationId?: string
  userId?: string
  name?: {
    contains: string
    mode: Prisma.QueryMode
  }
  startDate?: {
    gte: Date
  }
  endDate?: {
    lte: Date
  }
  amount?: {
    gte?: number
    lte?: number
  }
  projectId?: string
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const exportParams: ExportRequestParams = {
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      format: (searchParams.get("format") as "csv" | "excel" | "pdf") || "csv",
    }

    // Build where clause
    const where: BudgetWhereClause = {}

    // Filter by organization or user
    if (user.role === "ORGANIZATION_ADMIN" && user.organizationId) {
      where.organizationId = user.organizationId
    } else if (user.role === "USER") {
      where.userId = user.id
    }

    // Add date filters
    if (exportParams.startDate) {
      where.startDate = {
        gte: new Date(exportParams.startDate),
      }
    }

    if (exportParams.endDate) {
      where.endDate = {
        lte: new Date(exportParams.endDate),
      }
    }

    // Get budgets with expenses
    const budgets = await prisma.budget.findMany({
      where,
      include: {
        expenses: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Format data for export
    const formattedBudgets = budgets.map((budget) => {
      const spent = budget.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
      const remaining = Number(budget.amount) - spent
      const progress = budget.amount > 0 ? (spent / Number(budget.amount)) * 100 : 0

      return {
        id: budget.id,
        name: budget.name,
        description: budget.description || "",
        amount: Number(budget.amount),
        spent,
        remaining,
        progress: Math.round(progress),
        startDate: format(budget.startDate, "yyyy-MM-dd"),
        endDate: budget.endDate ? format(budget.endDate, "yyyy-MM-dd") : "",
        createdAt: format(budget.createdAt, "yyyy-MM-dd"),
        expenseCount: budget.expenses.length,
      }
    })

    // Generate CSV data
    let exportData: string | Buffer
    let contentType: string
    let filename: string

    const dateStr = format(new Date(), "yyyy-MM-dd")

    if (exportParams.format === "csv") {
      // CSV header
      const header =
        "ID,Name,Description,Amount,Spent,Remaining,Progress,Start Date,End Date,Created At,Expense Count\n"

      // CSV rows
      const rows = formattedBudgets
        .map(
          (b) =>
            `${b.id},"${b.name}","${b.description}",${b.amount},${b.spent},${b.remaining},${b.progress}%,${b.startDate},${b.endDate},${b.createdAt},${b.expenseCount}`,
        )
        .join("\n")

      exportData = header + rows
      contentType = "text/csv"
      filename = `budgets-export-${dateStr}.csv`
    } else if (exportParams.format === "excel") {
      // For Excel, we'd typically use a library like exceljs
      // This is a simplified version that returns CSV with Excel mime type
      const header =
        "ID,Name,Description,Amount,Spent,Remaining,Progress,Start Date,End Date,Created At,Expense Count\n"
      const rows = formattedBudgets
        .map(
          (b) =>
            `${b.id},"${b.name}","${b.description}",${b.amount},${b.spent},${b.remaining},${b.progress}%,${b.startDate},${b.endDate},${b.createdAt},${b.expenseCount}`,
        )
        .join("\n")

      exportData = header + rows
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      filename = `budgets-export-${dateStr}.xlsx`
    } else {
      // PDF would require a PDF generation library
      return NextResponse.json({ error: "PDF export not implemented yet" }, { status: 501 })
    }

    // Return the file as a download
    return new NextResponse(exportData, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export budgets error:", error)
    return NextResponse.json({ error: "Failed to export budgets" }, { status: 500 })
  }
}
