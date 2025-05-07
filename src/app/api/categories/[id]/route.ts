import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// GET a specific category
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
      include: {
        organization: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const params = await context.params
    const { id } = params

    // Get category
    const category = await prisma.budgetCategory.findUnique({
      where: { id },
      include: {
        budget: {
          select: {
            name: true,
            organizationId: true,
          },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if user has access to this category
    if (
      user.role !== "ADMIN" &&
      category.budget.organizationId !== user.organizationId &&
      !(await prisma.budget.findFirst({
        where: {
          id: category.budgetId,
          userId: user.id,
        },
      }))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({
      id: category.id,
      name: category.name,
      description: category.description || undefined,
      organizationId: category.budget.organizationId || undefined,
      budgetId: category.budgetId,
      budgetName: category.budget.name,
    })
  } catch (error) {
    console.error("Fetch category error:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

// UPDATE a category
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
    const body = await request.json()
    const { name, description, budgetId } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    // Get category
    const category = await prisma.budgetCategory.findUnique({
      where: { id },
      include: {
        budget: {
          select: {
            organizationId: true,
            userId: true,
          },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if user has access to this category
    if (
      user.role !== "ADMIN" &&
      category.budget.organizationId !== user.organizationId &&
      category.budget.userId !== user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // If changing budget, verify the new budget exists and user has access to it
    if (budgetId && budgetId !== category.budgetId) {
      const newBudget = await prisma.budget.findUnique({
        where: { id: budgetId },
      })

      if (!newBudget) {
        return NextResponse.json({ error: "Budget not found" }, { status: 404 })
      }

      // Check if user has access to the new budget
      if (user.role !== "ADMIN" && newBudget.organizationId !== user.organizationId && newBudget.userId !== user.id) {
        return NextResponse.json({ error: "Unauthorized to move category to this budget" }, { status: 403 })
      }
    }

    // Update category
    const updatedCategory = await prisma.budgetCategory.update({
      where: { id },
      data: {
        name,
        description,
        budgetId: budgetId || undefined,
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
      id: updatedCategory.id,
      name: updatedCategory.name,
      description: updatedCategory.description || undefined,
      organizationId: updatedCategory.budget.organizationId || undefined,
      budgetId: updatedCategory.budgetId,
      budgetName: updatedCategory.budget.name,
    })
  } catch (error) {
    console.error("Update category error:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE a category
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

    // Get category
    const category = await prisma.budgetCategory.findUnique({
      where: { id },
      include: {
        budget: {
          select: {
            organizationId: true,
            userId: true,
          },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if user has access to this category
    if (
      user.role !== "ADMIN" &&
      user.role !== "ORGANIZATION_ADMIN" &&
      category.budget.organizationId !== user.organizationId &&
      category.budget.userId !== user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if there are expenses using this category
    const expensesCount = await prisma.expense.count({
      where: { categoryId: id },
    })

    if (expensesCount > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete category that is being used by expenses. Reassign expenses to another category first.",
        },
        { status: 400 },
      )
    }

    // Delete category
    await prisma.budgetCategory.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete category error:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
