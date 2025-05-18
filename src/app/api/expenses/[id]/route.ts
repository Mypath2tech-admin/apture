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
    // Get expense
    const expense = await prisma.expense.findUnique({
      where: { id },
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

    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    // Check if user has access to this expense
    if (user.role !== "ADMIN" && expense.userId !== user.id && expense.organizationId !== user.organizationId) {
      return NextResponse.json({ error: "You don't have access to this expense" }, { status: 403 })
    }
    const taxRate = expense.tax_rate !== null ? Number(expense.tax_rate) : null
    const amount = Number(expense.amount)
    const taxAmount = taxRate !== null ? (amount * taxRate) / 100 : null
    const totalAmount = taxAmount !== null ? amount + taxAmount : amount

    return NextResponse.json({
      id: expense.id,
      title: expense.title,
      amount: Number(expense.amount),
      date: expense.date.toISOString(),
      description: expense.description,
      taxRate: taxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      receipt: expense.receiptUrl,
      //   status: expense.status,
      categoryId: expense.categoryId,
      budgetId: expense.budgetId,
      userId: expense.userId,
      organizationId: expense.organizationId,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
      category: {
        id: expense.category ? expense.category.id : "",
        name: expense.category ? expense.category.name : "",
      },
      budget: expense.budget
        ? {
          id: expense.budget.id,
          name: expense.budget.name,
        }
        : undefined,
    })
  } catch (error) {
    console.error("Fetch expense error:", error)
    return NextResponse.json({ error: "Failed to fetch expense" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    // Get expense
    const expense = await prisma.expense.findUnique({
      where: { id },
    })

    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    // Check if user has access to this expense
    if (
      user.role !== "ADMIN" &&
      expense.userId !== user.id &&
      (user.role !== "ORGANIZATION_ADMIN" || expense.organizationId !== user.organizationId)
    ) {
      return NextResponse.json({ error: "You don't have access to this expense" }, { status: 403 })
    }

    const body = await request.json()
    const { title, taxRate, amount, date, description, receipt, categoryId, budgetId } = body

    // Update expense
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        title,
        amount: amount !== undefined ? Number(amount) : undefined,
        tax_rate: taxRate !== undefined && taxRate !== "" ? Number(taxRate) : null,
        date: date ? new Date(date) : undefined,
        description,
        receiptUrl: receipt,
        categoryId,
        budgetId,
        // status,
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
    // Calculate tax amount and total
    const expenseTaxRate = expense.tax_rate !== null ? Number(expense.tax_rate) : null
    const expenseAmount = Number(expense.amount)
    const taxAmount = expenseTaxRate !== null ? (expenseAmount * expenseTaxRate) / 100 : null
    const totalAmount = taxAmount !== null ? expenseAmount + taxAmount : expenseAmount
    return NextResponse.json({
      id: updatedExpense.id,
      title: updatedExpense.title,
      amount: Number(updatedExpense.amount),
      date: updatedExpense.date.toISOString(),
      taxRate: expenseTaxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      description: updatedExpense.description || undefined,
      receipt: updatedExpense.receiptUrl || undefined,
      categoryId: updatedExpense.categoryId,
      budgetId: updatedExpense.budgetId || undefined,
      userId: updatedExpense.userId,
      organizationId: updatedExpense.organizationId || undefined,
      createdAt: updatedExpense.createdAt.toISOString(),
      updatedAt: updatedExpense.updatedAt.toISOString(),
      category: updatedExpense.category ? {
        id: updatedExpense.category.id,
        name: updatedExpense.category.name,
      } : null,
      budget: updatedExpense.budget
        ? {
          id: updatedExpense.budget.id,
          name: updatedExpense.budget.name,
        }
        : undefined,
    })
  } catch (error) {
    console.error("Update expense error:", error)
    return NextResponse.json({ error: "Failed to update expense" }, { status: 500 })
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
    // Get expense
    const expense = await prisma.expense.findUnique({
      where: { id },
    })

    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    // Check if user has access to this expense
    if (
      user.role !== "ADMIN" &&
      expense.userId !== user.id &&
      (user.role !== "ORGANIZATION_ADMIN" || expense.organizationId !== user.organizationId)
    ) {
      return NextResponse.json({ error: "You don't have access to this expense" }, { status: 403 })
    }

    // Delete expense
    await prisma.expense.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete expense error:", error)
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 })
  }
}
