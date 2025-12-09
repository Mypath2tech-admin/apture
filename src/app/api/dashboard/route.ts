import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import type { User, UserRole } from "../../../../generated/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Define types for the dashboard data
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
  isMasked: boolean
}

interface RecentExpense {
  id: string
  name: string
  amount: string
  date: string
  category: string
  isMasked: boolean
}

interface OrganizationData {
  id: string
  name: string
  logo: string | null
  email: string | null
  website: string | null
  description: string | null
  memberCount: number
  totalBudgets: number
  totalExpenses: number
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
  organization?: OrganizationData
  viewingOrgData: boolean // Flag to indicate if viewing org-wide data
  shouldMaskFinancials: boolean // Flag to indicate if financial data should be masked
}

// Define type for user with organization
interface UserWithOrganization extends User {
  organization?: {
    id: string
    name: string
    logo: string | null
    email: string | null
    website: string | null
    description: string | null
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
    canViewOrgDashboard: boolean
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

    // Get view type from query params (personal or organization)
    const { searchParams } = new URL(request.url)
    const viewType = searchParams.get("view") || "organization"
    const forcePersonal = viewType === "organization"

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
            email: true,
            website: true,
            description: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Determine if user can view organization data
    const canViewOrgData =
      user.role === "ADMIN" || user.role === "ORGANIZATION_ADMIN" || user.canViewOrgDashboard === true

    // Determine if financial data should be masked
    // Mask financials for regular organization members
    const shouldMaskFinancials =
      user.organizationId !== null && user.role === "ORGANIZATION_MEMBER" && !user.canViewOrgDashboard

    // Fetch dashboard data based on user role and permissions
    const dashboardData = await getDashboardData(user, canViewOrgData && !forcePersonal, shouldMaskFinancials)

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
        canViewOrgDashboard: user.canViewOrgDashboard || false,
        organization: user.organization
          ? {
              id: user.organization.id,
              name: user.organization.name,
              logo: user.organization.logo,
            }
          : null,
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

async function getDashboardData(
  user: UserWithOrganization,
  viewOrgData: boolean,
  shouldMaskFinancials: boolean,
): Promise<DashboardData> {
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
    viewingOrgData: viewOrgData,
    shouldMaskFinancials: shouldMaskFinancials,
  }

  // Check if user belongs to an organization and fetch organization data
  if (user.organizationId && user.organization) {
    // Get organization member count
    const memberCount = await prisma.user.count({
      where: { organizationId: user.organizationId },
    })

    // Get organization total budgets
    const totalBudgets = await prisma.budget.count({
      where: { organizationId: user.organizationId },
    })

    // Get organization total expenses
    const totalExpenses = await prisma.expense.count({
      where: { organizationId: user.organizationId },
    })

    // Add organization data to dashboard
    dashboardData.organization = {
      id: user.organization.id,
      name: user.organization.name,
      logo: user.organization.logo,
      email: user.organization.email,
      website: user.organization.website,
      description: user.organization.description,
      memberCount,
      totalBudgets,
      totalExpenses,
    }
  }

  // If user can view org data and viewOrgData is true, show organization-wide data
  if (viewOrgData && user.organizationId) {
    // Get total budget amount for the organization
    const budgets = await prisma.budget.findMany({
      where: { organizationId: user.organizationId },
      select: { amount: true },
    })
    dashboardData.totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0)

    // Get total expenses for the organization
    const expenses = await prisma.expense.findMany({
      where: { organizationId: user.organizationId },
      select: { amount: true },
    })
    dashboardData.totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

    // Get timesheet hours for the organization
    const timesheetEntries = await prisma.timesheetEntry.findMany({
      where: {
        timesheet: {
          organizationId: user.organizationId,
        },
      },
      select: { duration: true },
    })
    dashboardData.timesheetHours = Math.round(timesheetEntries.reduce((sum, entry) => sum + Number(entry.duration), 0))

    // Get team members count
    dashboardData.teamMembers = dashboardData.organization?.memberCount || 0

    // Get recent budgets for the organization
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
        amount: shouldMaskFinancials ? "******" : `$${Number(budget.amount).toFixed(2)}`,
        spent: shouldMaskFinancials ? "******" : `$${spent.toFixed(2)}`,
        progress,
        isMasked: shouldMaskFinancials,
      }
    })

    // Get recent expenses for the organization
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
      amount: shouldMaskFinancials ? "******" : `$${Number(expense.amount).toFixed(2)}`,
      date: expense.date.toISOString().split("T")[0],
      category: expense.category?.name || "Uncategorized",
      isMasked: shouldMaskFinancials,
    }))
  } else if (user.organizationId) {
    // For organization members viewing personal data
    // Get total budget amount for user within organization
    const budgets = await prisma.budget.findMany({
      where: {
        userId: user.id,
        organizationId: user.organizationId,
      },
      select: { amount: true },
    })
    dashboardData.totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0)

    // Get total expenses for user within organization
    const expenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
        organizationId: user.organizationId,
      },
      select: { amount: true },
    })
    dashboardData.totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

    // Get timesheet hours for user within organization
    const timesheetEntries = await prisma.timesheetEntry.findMany({
      where: {
        timesheet: {
          userId: user.id,
          organizationId: user.organizationId,
        },
      },
      select: { duration: true },
    })
    dashboardData.timesheetHours = Math.round(timesheetEntries.reduce((sum, entry) => sum + Number(entry.duration), 0))

    // Team members is the organization's member count
    dashboardData.teamMembers = dashboardData.organization?.memberCount || 0

    // Get recent budgets for user within organization
    const recentBudgets = await prisma.budget.findMany({
      where: {
        userId: user.id,
        organizationId: user.organizationId,
      },
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
        amount: shouldMaskFinancials ? "******" : `$${Number(budget.amount).toFixed(2)}`,
        spent: shouldMaskFinancials ? "******" : `$${spent.toFixed(2)}`,
        progress,
        isMasked: shouldMaskFinancials,
      }
    })

    // Get recent expenses for user within organization
    const recentExpenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
        organizationId: user.organizationId,
      },
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
      amount: shouldMaskFinancials ? "******" : `$${Number(expense.amount).toFixed(2)}`,
      date: expense.date.toISOString().split("T")[0],
      category: expense.category?.name || "Uncategorized",
      isMasked: shouldMaskFinancials,
    }))
  } else {
    // For regular users without organization, get personal data
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
        isMasked: false,
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
      isMasked: false,
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
