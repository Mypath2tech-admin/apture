import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const params = await context.params
    const { id } = params
    // Get budget with expenses
    const budget = await prisma.budget.findUnique({
      where: { id },
      include: {
        expenses: {
          include: {
            category: true,
          },
          orderBy: {
            date: "desc",
          },
        },
      },
    })

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    // Check if user has access to this budget
    if (user.role !== "ADMIN" && budget.userId !== user.id && budget.organizationId !== user.organizationId) {
      return NextResponse.json({ error: "You don't have access to this budget" }, { status: 403 })
    }

    // Calculate spent, remaining, and progress
    const spent = budget.expenses.reduce((sum, expense) => {
      const baseAmount = Number(expense.amount)
      const taxRate = expense.tax_rate ? Number(expense.tax_rate) / 100 : 0
      const totalWithTax = baseAmount + baseAmount * taxRate
      return sum + totalWithTax
    }, 0)
    const remaining = Number(budget.amount) - spent
    const progress = budget.amount > 0 ? (spent / Number(budget.amount)) * 100 : 0

    const formattedBudget = {
      id: budget.id,
      name: budget.name,
      amount: Number(budget.amount),
      startDate: budget.startDate.toISOString(),
      endDate: budget.endDate ? budget.endDate.toISOString() : '',
      description: budget.description,
      createdAt: budget.createdAt.toISOString(),
      updatedAt: budget.updatedAt.toISOString(),
      organizationId: budget.organizationId,
      userId: budget.userId,
      spent,
      remaining,
      progress: Math.round(progress),
      expenses: budget.expenses.map((expense) => ({
        id: expense.id,
        title: expense.title,
        amount: Number(expense.amount),
        date: expense.date.toISOString(),
        description: expense.description,
        receiptUrl: expense.receiptUrl,
        categoryId: expense.categoryId,
        category: {
          id: expense.category ? expense.category.id : "", 
          name: expense.category ? expense.category.name : "",
        },
      })),
    }

    return NextResponse.json(formattedBudget)
  } catch (error) {
    console.error("Fetch budget error:", error)
    return NextResponse.json({ error: "Failed to fetch budget" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await  cookies()
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

    // Get budget
    const params = await context.params
    const { id } = params
    const budget = await prisma.budget.findUnique({
      where: { id },
    })

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    // Check if user has access to this budget
    if (user.role !== "ADMIN" && budget.userId !== user.id && budget.organizationId !== user.organizationId) {
      return NextResponse.json({ error: "You don't have access to this budget" }, { status: 403 })
    }

    const body = await request.json()
    const { name, amount, startDate, endDate, description } = body

    // Update budget
    const updatedBudget = await prisma.budget.update({
      where: { id },
      data: {
        name,
        amount: amount !== undefined ? Number(amount) : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        description,
      },
    })

    return NextResponse.json(updatedBudget)
  } catch (error) {
    console.error("Update budget error:", error)
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const params = await context.params
    const { id } = params
    // Get budget
    const budget = await prisma.budget.findUnique({
      where: { id },
    })

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    // Check if user has access to this budget
    if (
      user.role !== "ADMIN" &&
      budget.userId !== user.id &&
      (user.role !== "ORGANIZATION_ADMIN" || budget.organizationId !== user.organizationId)
    ) {
      return NextResponse.json({ error: "You don't have access to this budget" }, { status: 403 })
    }

    // Delete budget
    await prisma.budget.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete budget error:", error)
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 })
  }
}
