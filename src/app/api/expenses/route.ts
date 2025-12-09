import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import type { ExpenseWhereClause, ExpenseQueryParams, ExpenseSortField } from "@/types/apis"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// GET all expenses
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const queryParams: ExpenseQueryParams = {
      search: searchParams.get("search") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      minAmount: searchParams.get("minAmount") ? Number(searchParams.get("minAmount")) : undefined,
      maxAmount: searchParams.get("maxAmount") ? Number(searchParams.get("maxAmount")) : undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      budgetId: searchParams.get("budgetId") || undefined,
      status: searchParams.get("status") || undefined,
      sortBy: searchParams.get("sortBy") || "date",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    }

    // Build where clause
    const where: ExpenseWhereClause = {}

    // IMPORTANT CHANGE: If user belongs to an organization, show all organization expenses
    if (user.organizationId) {
      // Show all expenses from the user's organization
      where.organizationId = user.organizationId
    } else if (user.role !== "ADMIN") {
      // Non-admin users without an organization only see their own expenses
      where.userId = user.id
    }
    // Global admins can see all expenses (no filter)

    if (queryParams.search) {
      where.title = { contains: queryParams.search, mode: "insensitive" }
    }

    if (queryParams.startDate || queryParams.endDate) {
      where.date = {}
      if (queryParams.startDate) where.date.gte = new Date(queryParams.startDate)
      if (queryParams.endDate) where.date.lte = new Date(queryParams.endDate)
    }

    if (queryParams.minAmount !== undefined || queryParams.maxAmount !== undefined) {
      where.amount = {}
      if (queryParams.minAmount !== undefined) where.amount.gte = queryParams.minAmount
      if (queryParams.maxAmount !== undefined) where.amount.lte = queryParams.maxAmount
    }

    if (queryParams.categoryId && queryParams.categoryId !== "all") {
      where.categoryId = queryParams.categoryId
    }

    if (queryParams.budgetId && queryParams.budgetId !== "all") {
      where.budgetId = queryParams.budgetId
    }

    if (queryParams.status && queryParams.status !== "all") {
      where.status = queryParams.status
    }

    // Validate sort field
    const validSortFields = ["date", "amount", "title", "createdAt", "updatedAt", "status"]
    const sortBy = validSortFields.includes(queryParams.sortBy || "")
      ? (queryParams.sortBy as ExpenseSortField)
      : "date"

    const sortOrder = queryParams.sortOrder || "desc"

    console.log("Expense query where clause:", JSON.stringify(where, null, 2))
    console.log("Sorting by:", sortBy, sortOrder)

    const expenses = await prisma.expense.findMany({
      where,
      include: {
        category: true,
        budget: {
          select: { id: true, name: true },
        },
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        organization: {
          select: { id: true, name: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
    })

    const formattedExpenses = expenses.map((expense) => {
      // Calculate tax amount and total if tax rate is present
      const taxRate = expense.tax_rate !== null ? Number(expense.tax_rate) : null
      const amount = Number(expense.amount)
      const taxAmount = taxRate !== null ? (amount * taxRate) / 100 : null
      const totalAmount = taxAmount !== null ? amount + taxAmount : amount

      return {
        id: expense.id,
        title: expense.title,
        amount: amount,
        taxRate: taxRate,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        date: expense.date.toISOString(),
        description: expense.description || undefined,
        receipt: expense.receiptUrl || undefined,
        // status: expense.status || "PENDING",
        categoryId: expense.categoryId,
        budgetId: expense.budgetId || undefined,
        userId: expense.userId,
        organizationId: expense.organizationId || undefined,
        createdAt: expense.createdAt.toISOString(),
        updatedAt: expense.updatedAt.toISOString(),
        category: expense.category
          ? {
            id: expense.category.id,
            name: expense.category.name,
          }
          : undefined,
        budget: expense.budget
          ? {
            id: expense.budget.id,
            name: expense.budget.name,
          }
          : undefined,
        user: expense.user
          ? {
            id: expense.user.id,
            name:
              `${expense.user.firstName || ""} ${expense.user.lastName || ""}`.trim() ||
              expense.user.email.split("@")[0],
            email: expense.user.email,
          }
          : undefined,
        organization: expense.organization
          ? {
            id: expense.organization.id,
            name: expense.organization.name,
          }
          : undefined,
        // Add a flag to indicate if the current user can edit this expense
        canEdit: user.role === "ADMIN" || user.role === "ORGANIZATION_ADMIN" || expense.userId === user.id,
      }
    })

    return NextResponse.json(formattedExpenses)
  } catch (error) {
    console.error("Fetch expenses error:", error)
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

// POST create a new expense
export async function POST(request: NextRequest) {
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

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { title, amount, taxRate, date, description, categoryId, budgetId, createAnother = false } = body
    console.log("Tax", title, taxRate)
    // Validate required fields
    if (!title || !amount || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate that budgetId is provided
    if (!budgetId) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 })
    }

    // Verify the budget exists
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
    })

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    // Handle category
    let finalCategoryId = categoryId

    if (!categoryId) {
      // If no category is provided, find or create an "Uncategorized" category for this budget
      let uncategorizedCategory = await prisma.budgetCategory.findFirst({
        where: {
          name: "Uncategorized",
          budgetId: budgetId,
        },
      })

      if (!uncategorizedCategory) {
        // Create an "Uncategorized" category for this budget
        uncategorizedCategory = await prisma.budgetCategory.create({
          data: {
            name: "Uncategorized",
            description: "Default category for expenses",
            allocatedAmount: 0,
            budgetId: budgetId,
          },
        })
      }

      finalCategoryId = uncategorizedCategory.id
    } else {
      // Verify the category exists and belongs to the selected budget
      const categoryExists = await prisma.budgetCategory.findFirst({
        where: {
          id: categoryId,
          budgetId: budgetId,
        },
      })

      if (!categoryExists) {
        return NextResponse.json(
          {
            error: "Invalid category or category does not belong to the selected budget",
          },
          { status: 400 },
        )
      }
    }

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        tax_rate: taxRate !== undefined && taxRate !== "" ? Number(taxRate) : null,
        date: new Date(date),
        description,
        receiptUrl: null, // Handle file upload separately if needed
        categoryId: finalCategoryId,
        budgetId,
        userId: user.id,
        organizationId: user.organizationId,
      },
      include: {
        category: true,
        budget: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
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
    // Calculate tax amount and total
    const expenseTaxRate = expense.tax_rate !== null ? Number(expense.tax_rate) : null
    const expenseAmount = Number(expense.amount)
    const taxAmount = expenseTaxRate !== null ? (expenseAmount * expenseTaxRate) / 100 : null
    const totalAmount = taxAmount !== null ? expenseAmount + taxAmount : expenseAmount

    return NextResponse.json({
      id: expense.id,
      title: expense.title,
      amount: Number(expense.amount),
      taxRate: expenseTaxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      date: expense.date.toISOString(),
      description: expense.description || undefined,
      receipt: expense.receiptUrl || undefined,
      categoryId: expense.categoryId,
      budgetId: expense.budgetId || undefined,
      userId: expense.userId,
      organizationId: expense.organizationId || undefined,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
      category: expense.category
        ? {
          id: expense.category.id,
          name: expense.category.name,
        }
        : undefined,
      budget: expense.budget
        ? {
          id: expense.budget.id,
          name: expense.budget.name,
        }
        : undefined,
      user: expense.user
        ? {
          id: expense.user.id,
          name:
            `${expense.user.firstName || ""} ${expense.user.lastName || ""}`.trim() ||
            expense.user.email.split("@")[0],
          email: expense.user.email,
        }
        : undefined,
      organization: expense.organization
        ? {
          id: expense.organization.id,
          name: expense.organization.name,
        }
        : undefined,
      createAnother, // Return this flag so the frontend knows whether to redirect or stay
    })
  } catch (error) {
    console.error("Create expense error:", error)
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
