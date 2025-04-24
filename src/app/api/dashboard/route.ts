import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import type { User, UserRole } from "../../../../generated/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Define types for the dashboard data
interface BudgetChange {
  value: string
  isPositive: boolean
}

interface RecentBudget {
  id: string
  name: string
  amount: string
  spent: string
  progress: number
}

interface RecentExpense {
  id: string
  name: string
  amount: string
  date: string
  category: string
}

interface DashboardData {
  totalBudget: number
  totalExpenses: number
  timesheetHours: number
  teamMembers: number
  budgetChange: BudgetChange
  expenseChange: BudgetChange
  timesheetChange: BudgetChange
  recentBudgets: RecentBudget[]
  recentExpenses: RecentExpense[]
}

// Define type for user with organization
interface UserWithOrganization extends User {
  organization?: {
    id: string
    name: string
    logo: string | null
  } | null
}

// Define response type
interface DashboardResponse {
  user: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    username: string | null
    role: UserRole
    profileImage: string | null
    phoneNumber: string | null
    organization: {
      id: string
      name: string
      logo: string | null
    } | null
    createdAt: Date
  }
  dashboardData: DashboardData
}

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

    // Get user with organization details
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found", request }, { status: 404 })
    }

    // Fetch dashboard data based on user role
    const dashboardData = await getDashboardData(user)

    // Return user data and dashboard data
    const response: DashboardResponse = {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
        organization: user.organization,
        createdAt: user.createdAt,
      },
      dashboardData,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Fetch user error:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}

async function getDashboardData(user: UserWithOrganization): Promise<DashboardData> {
  // Base structure for dashboard data
  const dashboardData: DashboardData = {
    totalBudget: 0,
    totalExpenses: 0,
    timesheetHours: 0,
    teamMembers: 0,
    budgetChange: {
      value: "0%",
      isPositive: true,
    },
    expenseChange: {
      value: "0%",
      isPositive: true,
    },
    timesheetChange: {
      value: "0%",
      isPositive: true,
    },
    recentBudgets: [],
    recentExpenses: [],
  }

  // Get data based on user role
  if (user.role === "ORGANIZATION_ADMIN" || user.role === "ADMIN") {
    // For organization admins, get org-wide data
    if (user.organizationId) {
      // Get total budget amount
      const budgets = await prisma.budget.findMany({
        where: { organizationId: user.organizationId },
        select: { amount: true },
      })
      dashboardData.totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0)

      // Get total expenses
      const expenses = await prisma.expense.findMany({
        where: { organizationId: user.organizationId },
        select: { amount: true },
      })
      dashboardData.totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

      // Get timesheet hours
      const timesheetEntries = await prisma.timesheetEntry.findMany({
        where: {
          timesheet: {
            organizationId: user.organizationId,
          },
        },
        select: { duration: true },
      })
      dashboardData.timesheetHours = Math.round(
        timesheetEntries.reduce((sum, entry) => sum + Number(entry.duration), 0),
      )

      // Get team members count
      const membersCount = await prisma.user.count({
        where: { organizationId: user.organizationId },
      })
      dashboardData.teamMembers = membersCount

      // Get recent budgets
      const recentBudgets = await prisma.budget.findMany({
        where: { organizationId: user.organizationId },
        select: {
          id: true,
          name: true,
          amount: true,
          expenses: { select: { amount: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      })

      // Calculate spent amount and progress for each budget
      dashboardData.recentBudgets = recentBudgets.map((budget) => {
        const spent = budget.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
        const progress = Number(budget.amount) > 0 ? Math.round((spent / Number(budget.amount)) * 100) : 0
        return {
          id: budget.id,
          name: budget.name,
          amount: `$${Number(budget.amount).toFixed(2)}`,
          spent: `$${spent.toFixed(2)}`,
          progress,
        }
      })

      // Get recent expenses
      const recentExpenses = await prisma.expense.findMany({
        where: { organizationId: user.organizationId },
        select: {
          id: true,
          title: true,
          amount: true,
          date: true,
          category: { select: { name: true } },
        },
        orderBy: { date: "desc" },
        take: 3,
      })

      // Format expense data
      dashboardData.recentExpenses = recentExpenses.map((expense) => ({
        id: expense.id,
        name: expense.title,
        amount: `$${Number(expense.amount).toFixed(2)}`,
        date: expense.date.toISOString().split("T")[0],
        category: expense.category?.name || "Uncategorized",
      }))
    }
  } else {
    // For regular users, get personal data
    // Get total budget amount
    const budgets = await prisma.budget.findMany({
      where: { userId: user.id },
      select: { amount: true },
    })
    dashboardData.totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0)

    // Get total expenses
    const expenses = await prisma.expense.findMany({
      where: { userId: user.id },
      select: { amount: true },
    })
    dashboardData.totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

    // Get timesheet hours
    const timesheetEntries = await prisma.timesheetEntry.findMany({
      where: {
        timesheet: {
          userId: user.id,
        },
      },
      select: { duration: true },
    })
    dashboardData.timesheetHours = Math.round(timesheetEntries.reduce((sum, entry) => sum + Number(entry.duration), 0))

    // Get recent budgets
    const recentBudgets = await prisma.budget.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        amount: true,
        expenses: { select: { amount: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    })

    // Calculate spent amount and progress for each budget
    dashboardData.recentBudgets = recentBudgets.map((budget) => {
      const spent = budget.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
      const progress = Number(budget.amount) > 0 ? Math.round((spent / Number(budget.amount)) * 100) : 0
      return {
        id: budget.id,
        name: budget.name,
        amount: `$${Number(budget.amount).toFixed(2)}`,
        spent: `$${spent.toFixed(2)}`,
        progress,
      }
    })

    // Get recent expenses
    const recentExpenses = await prisma.expense.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
        amount: true,
        date: true,
        category: { select: { name: true } },
      },
      orderBy: { date: "desc" },
      take: 3,
    })

    // Format expense data
    dashboardData.recentExpenses = recentExpenses.map((expense) => ({
      id: expense.id,
      name: expense.title,
      amount: `$${Number(expense.amount).toFixed(2)}`,
      date: expense.date.toISOString().split("T")[0],
      category: expense.category?.name || "Uncategorized",
    }))
  }

  // Calculate percent changes (this would typically compare to previous period)
  // In a real app, you'd compare current month/quarter to previous period
  // For now, using placeholder values
  dashboardData.budgetChange = { value: "8%", isPositive: true }
  dashboardData.expenseChange = { value: "5%", isPositive: false }
  dashboardData.timesheetChange = { value: "12%", isPositive: true }

  return dashboardData
}
