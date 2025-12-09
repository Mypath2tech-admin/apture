import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import type { Budget, BudgetCategory } from "@/types/dashboard"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Define interfaces for JWT token payload and query parameters
interface JwtPayload {
  userId: string
}

interface BudgetQueryParams {
  search?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  sortBy: string
  sortOrder: "asc" | "desc"
}

// Define interface for the where clause in budget queries
interface BudgetWhereClause {
  organizationId?: string
  userId?: string
  name?: {
    contains: string
    mode: "insensitive"
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
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        organization: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const queryParams: BudgetQueryParams = {
      search: searchParams.get("search") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      minAmount: searchParams.get("minAmount") ? Number(searchParams.get("minAmount")) : undefined,
      maxAmount: searchParams.get("maxAmount") ? Number(searchParams.get("maxAmount")) : undefined,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    }

    // Build where clause
    const where: BudgetWhereClause = {}

    // Filter by organization or user
    if ((user.role === "ORGANIZATION_ADMIN" || user.role === "ORGANIZATION_MEMBER") && user.organizationId) {
      where.organizationId = user.organizationId
    } else if (user.role === "USER") {
      where.userId = user.id
    }

    // Add search filter
    if (queryParams.search) {
      where.name = {
        contains: queryParams.search,
        mode: "insensitive",
      }
    }

    // Add date filters
    if (queryParams.startDate) {
      where.startDate = {
        gte: new Date(queryParams.startDate),
      }
    }

    if (queryParams.endDate) {
      where.endDate = {
        lte: new Date(queryParams.endDate),
      }
    }

    // Add amount filters
    if (queryParams.minAmount !== undefined) {
      where.amount = {
        ...where.amount,
        gte: queryParams.minAmount,
      }
    }

    if (queryParams.maxAmount !== undefined) {
      where.amount = {
        ...where.amount,
        lte: queryParams.maxAmount,
      }
    }

    // Create a type-safe sort object based on the queryParams
    const validSortFields = ["id", "name", "amount", "startDate", "endDate", "createdAt", "updatedAt", "description"]

    const sortField = validSortFields.includes(queryParams.sortBy) ? (queryParams.sortBy) : "createdAt"

    const orderBy = {
      [sortField]: queryParams.sortOrder,
    }

    // Get budgets with expenses and categories
    // Get budgets with expenses and categories
    const budgets = await prisma.budget.findMany({
      where,
      include: {
        expenses: true,
        categories: true,
      },
      orderBy,
    })

    // Calculate spent, remaining, and progress
    const formattedBudgets: Budget[] = budgets.map((budget) => {
        const spent = budget.expenses.reduce((sum, expense) => {
        const baseAmount = Number(expense.amount)
        const taxRate = expense.tax_rate ? Number(expense.tax_rate) / 100 : 0
        const totalWithTax = baseAmount + baseAmount * taxRate
        return sum + totalWithTax
      }, 0)


      const remaining = Number(budget.amount) - spent
      const progress = budget.amount > 0 ? (spent / Number(budget.amount)) * 100 : 0

      // Map database categories to BudgetCategory type
      const categories: BudgetCategory[] = budget.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        allocatedAmount: Number(cat.allocatedAmount),
        description: cat.description || undefined,
        budgetId: budget.id,
      }))

      return {
        id: budget.id,
        name: budget.name,
        amount: Number(budget.amount),
        startDate: budget.startDate.toISOString(),
        endDate: budget.endDate ? budget.endDate.toISOString() : undefined,
        description: budget.description || undefined,
        createdAt: budget.createdAt.toISOString(),
        updatedAt: budget.updatedAt.toISOString(),
        organizationId: budget.organizationId || undefined,
        userId: budget.userId || undefined,
        projectId: budget.projectId || undefined,
        spent,
        remaining,
        progress: Math.round(progress),
        categories: categories.length > 0 ? categories : undefined,
      }
    })

    return NextResponse.json(formattedBudgets)
  } catch (error) {
    console.error("Fetch budgets error:", error)
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
  }
}

interface CreateBudgetBody {
  name: string
  amount: number
  startDate: string
  endDate?: string
  description?: string
  projectId?: string
  categories?: Array<{
    name: string
    allocatedAmount: number
    description?: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = (await request.json()) as CreateBudgetBody
    const { name, amount, startDate, endDate, description, projectId, categories } = body

    // Validate required fields
    if (!name || amount === undefined || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create budget with optional categories
    const budget = await prisma.budget.create({
      data: {
        name,
        amount: Number(amount),
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
        userId: user.id,
        organizationId: user.organizationId,
        projectId,
        categories:
          categories && categories.length > 0
            ? {
              create: categories.map((cat) => ({
                name: cat.name,
                allocatedAmount: Number(cat.allocatedAmount),
                description: cat.description,
              })),
            }
            : undefined,

      },
      include: {
        categories: true,
      },
    })

    // Map categories to the proper type
    const mappedCategories: BudgetCategory[] = budget.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      allocatedAmount: Number(cat.allocatedAmount),
      description: cat.description || undefined,
      budgetId: budget.id,
    }))

    // Create response object that matches our updated Budget interface
    const response: Budget = {
      id: budget.id,
      name: budget.name,
      amount: Number(budget.amount),
      startDate: budget.startDate.toISOString(),
      endDate: budget.endDate ? budget.endDate.toISOString() : undefined,
      description: budget.description || undefined,
      createdAt: budget.createdAt.toISOString(),
      updatedAt: budget.updatedAt.toISOString(),
      organizationId: budget.organizationId || undefined,
      userId: budget.userId || undefined,
      remaining: 0,
      categories: mappedCategories,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Create budget error:", error)
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 })
  }
}
