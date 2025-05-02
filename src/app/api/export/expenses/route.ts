import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import type { ExportRequestParams } from "@/types/export"


interface ExpenseFilter {
    organizationId?: string;
    userId?: string;
    date?: {

        gte?: Date;


        lte?: Date;
    };
    categoryId?: string;
    budgetId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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
            categoryId: searchParams.get("categoryId") || undefined,
            budgetId: searchParams.get("budgetId") || undefined,
            format: (searchParams.get("format") as "csv" | "excel" | "pdf") || "csv",
        }

        // Build where clause
        const where: ExpenseFilter = {}

        // Filter by organization or user
        if (user.role === "ORGANIZATION_ADMIN" && user.organizationId) {
            where.organizationId = user.organizationId
        } else if (user.role === "USER") {
            where.userId = user.id
        }

        // Add date filters
        if (exportParams.startDate || exportParams.endDate) {
            where.date = {}
            if (exportParams.startDate) where.date.gte = new Date(exportParams.startDate)
            if (exportParams.endDate) where.date.lte = new Date(exportParams.endDate)
        }

        // Add category filter
        if (exportParams.categoryId) {
            where.categoryId = exportParams.categoryId
        }

        // Add budget filter
        if (exportParams.budgetId) {
            where.budgetId = exportParams.budgetId
        }

        // Get expenses with related data
        const expenses = await prisma.expense.findMany({
            where,
            include: {
                category: true,
                budget: true,
                user: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: {
                date: "desc",
            },
        })

        // Format data for export
        const formattedExpenses = expenses.map((expense) => {
            const userName = expense.user
                ? `${expense.user.firstName || ""} ${expense.user.lastName || ""}`.trim() || expense.user.email
                : "Unknown"

            return {
                id: expense.id,
                title: expense.title,
                description: expense.description || "",
                amount: Number(expense.amount),
                date: format(expense.date, "yyyy-MM-dd"),
                category: expense.category ? expense.category.name : "Uncategorized",
                budget: expense.budget ? expense.budget.name : "No Budget",
                user: userName,
                createdAt: format(expense.createdAt, "yyyy-MM-dd"),
            }
        })

        // Generate export data
        let exportData: string | Buffer
        let contentType: string
        let filename: string

        const dateStr = format(new Date(), "yyyy-MM-dd")

        if (exportParams.format === "csv") {
            // CSV header
            const header = "ID,Title,Description,Amount,Date,Category,Budget,User,Created At\n"

            // CSV rows
            const rows = formattedExpenses
                .map(
                    (e) =>
                        `${e.id},"${e.title}","${e.description}",${e.amount},${e.date},"${e.category}","${e.budget}","${e.user}",${e.createdAt}`,
                )
                .join("\n")

            exportData = header + rows
            contentType = "text/csv"
            filename = `expenses-export-${dateStr}.csv`
        } else if (exportParams.format === "excel") {
            // For Excel, we'd typically use a library like exceljs
            // This is a simplified version that returns CSV with Excel mime type
            const header = "ID,Title,Description,Amount,Date,Category,Budget,User,Created At\n"
            const rows = formattedExpenses
                .map(
                    (e) =>
                        `${e.id},"${e.title}","${e.description}",${e.amount},${e.date},"${e.category}","${e.budget}","${e.user}",${e.createdAt}`,
                )
                .join("\n")

            exportData = header + rows
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            filename = `expenses-export-${dateStr}.xlsx`
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
        console.error("Export expenses error:", error)
        return NextResponse.json({ error: "Failed to export expenses" }, { status: 500 })
    }
}
