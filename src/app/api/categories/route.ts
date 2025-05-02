import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import type { ExpenseCategory } from "@/types/dashboard"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
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
      include: {
        organization: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found", request }, { status: 404 })
    }

    // Only admin and organization admin can fetch categories
    if (user.role !== "ADMIN" && user.role !== "ORGANIZATION_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Get categories from BudgetCategory table
    const categories = await prisma.budgetCategory.findMany({
      where: {
        budget: {
          OR: [
            { organizationId: user.organizationId },
            { organizationId: null }, // Global categories
          ],
        },
      },
      include: {
        budget: {
          select: {
            name: true,
            organizationId: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    const formattedCategories: ExpenseCategory[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description || undefined,
      organizationId: category.budget.organizationId || undefined,
      budgetId: category.budgetId,
      budgetName: category.budget.name,
    }))

    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error("Fetch categories error:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

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

    // // Only admin and organization admin can create categories
    // if (user.role !== "ADMIN" && user.role !== "ORGANIZATION_ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    // }

    const body = await request.json()
    const { name, description, budgetId } = body

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    if (!budgetId) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 })
    }

    // Verify the budget exists and user has access to it
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
    })

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    // Check if user has access to this budget
    if (user.role !== "ADMIN" && budget.organizationId !== user.organizationId && budget.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized to add category to this budget" }, { status: 403 })
    }

    // Create category
    const category = await prisma.budgetCategory.create({
      data: {
        name,
        description,
        allocatedAmount: 0, // Default allocation
        budgetId,
      },
      include: {
        budget: {
          select: {
            name: true,
            organizationId: true,
          },
        },
      },
    })

    return NextResponse.json({
      id: category.id,
      name: category.name,
      description: category.description || undefined,
      organizationId: category.budget.organizationId || undefined,
      budgetId: category.budgetId,
      budgetName: category.budget.name,
    })
  } catch (error) {
    console.error("Create category error:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
