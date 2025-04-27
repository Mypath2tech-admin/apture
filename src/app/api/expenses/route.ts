import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import type { ExpenseWhereClause, ExpenseQueryParams, ExpenseSortField } from "../../../types/apis"

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
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })

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
      sortBy: searchParams.get("sortBy") || "date",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    }

    // Build where clause
    const where: ExpenseWhereClause = {}

    if (user.role === "ORGANIZATION_ADMIN" && user.organizationId) {
      where.organizationId = user.organizationId
    } else if (user.role === "USER") {
      where.userId = user.id
    }

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

    if (queryParams.categoryId) {
      where.categoryId = queryParams.categoryId
    }

    if (queryParams.budgetId) {
      where.budgetId = queryParams.budgetId
    }

    const sortBy = (queryParams.sortBy as ExpenseSortField) || "date"
    const sortOrder = queryParams.sortOrder || "desc"

    const expenses = await prisma.expense.findMany({
      where,
      include: {
        category: true,
        budget: {
          select: { id: true, name: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
    })

    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      title: expense.title,
      amount: Number(expense.amount),
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
    }))

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
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { title, amount, date, description, categoryId, budgetId } = body

    // Validate required fields
    if (!title || !amount || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Handle category permissions
    let finalCategoryId = categoryId

    // If user is not admin or organization admin, they can't select categories
    if (user.role !== "ADMIN" && user.role !== "ORGANIZATION_ADMIN") {
      // Find or create a default "Uncategorized" category
      let defaultCategory = await prisma.budgetCategory.findFirst({
        where: {
          name: "Uncategorized",
          budget: {
            OR: [{ organizationId: user.organizationId }, { organizationId: null }],
          },
        },
      })

      if (!defaultCategory) {
        // We need to create a default budget first if it doesn't exist
        const defaultBudget =
          (await prisma.budget.findFirst({
            where: {
              name: "Default Budget",
              OR: [{ organizationId: user.organizationId }, { organizationId: null }],
            },
          })) ||
          (await prisma.budget.create({
            data: {
              name: "Default Budget",
              description: "Default budget for uncategorized expenses",
              amount: 0,
              startDate: new Date(),
              organizationId: user.organizationId,
              userId: user.id,
            },
          }))

        // Create default category if it doesn't exist
        defaultCategory = await prisma.budgetCategory.create({
          data: {
            name: "Uncategorized",
            description: "Default category for expenses",
            allocatedAmount: 0,
            budgetId: defaultBudget.id,
          },
        })
      }

      finalCategoryId = defaultCategory.id
    } else if (categoryId) {
      // For admins, verify the category exists
      const categoryExists = await prisma.budgetCategory.findUnique({
        where: { id: categoryId },
      })

      if (!categoryExists) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 })
      }
    } else {
      // Even for admins, if no category is provided, use default
      let defaultCategory = await prisma.budgetCategory.findFirst({
        where: {
          name: "Uncategorized",
          budget: {
            OR: [{ organizationId: user.organizationId }, { organizationId: null }],
          },
        },
      })

      if (!defaultCategory) {
        // We need to create a default budget first if it doesn't exist
        const defaultBudget =
          (await prisma.budget.findFirst({
            where: {
              name: "Default Budget",
              OR: [{ organizationId: user.organizationId }, { organizationId: null }],
            },
          })) ||
          (await prisma.budget.create({
            data: {
              name: "Default Budget",
              description: "Default budget for uncategorized expenses",
              amount: 0,
              startDate: new Date(),
              organizationId: user.organizationId,
              userId: user.id,
            },
          }))

        defaultCategory = await prisma.budgetCategory.create({
          data: {
            name: "Uncategorized",
            description: "Default category for expenses",
            allocatedAmount: 0,
            budgetId: defaultBudget.id,
          },
        })
      }

      finalCategoryId = defaultCategory.id
    }

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
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
      },
    })

    return NextResponse.json({
      id: expense.id,
      title: expense.title,
      amount: Number(expense.amount),
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
    })
  } catch (error) {
    console.error("Create expense error:", error)
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
