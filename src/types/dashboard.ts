export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: "ADMIN" | "USER" | "ORGANIZATION_ADMIN" | "ORGANIZATION_MEMBER"
  organizationId?: string
  organization?: Organization
  canViewOrgDashboard?: boolean
}

export interface Organization {
  id: string
  name: string
  email?: string
  description?: string
  logo?: string
  website?: string
  memberCount?: number
  totalBudgets?: number
  totalExpenses?: number
}

export interface Budget {
  id: string
  name: string
  description?: string
  amount: number
  startDate: string
  endDate?: string
  userId?: string
  organizationId?: string
  categories?: BudgetCategory[]
  expenses?: Expense[]
  createdAt: string
  updatedAt: string
}

export interface BudgetCategory {
  id: string
  name: string
  description?: string
  allocatedAmount: number
  budgetId: string
  expenses?: Expense[]
}

export interface ExpenseCategory {
  id: string
  name: string
  description?: string
  organizationId?: string
  budgetId?: string
  budgetName?: string
}

export interface Expense {
  user: User
  id: string
  title: string
  description?: string
  amount: number
  date: string
  receipt?: string
  categoryId?: string
  category?: {
    id: string
    name: string
  }
  budgetId?: string
  budget?: {
    id: string
    name: string
  }
  userId: string
  organizationId?: string
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalExpenses: number
  totalBudgets: number
  totalCategories: number
  recentExpenses: Expense[]
  expensesByCategory: {
    categoryName: string
    amount: number
  }[]
  monthlyExpenses: {
    month: string
    amount: number
  }[]
  budgetUtilization: {
    budgetName: string
    allocated: number
    spent: number
    remaining: number
  }[]
}
export interface ExpenseFilters {
  search?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  categoryId?: string
  budgetId?: string
  status?: "PENDING" | "APPROVED" | "REJECTED"
  sortBy?: "title" | "amount" | "date" | "category" | "status"
  sortOrder?: "asc" | "desc"
}


export interface DashboardData {
  shouldMaskFinancials: boolean
  totalBudget: number
  totalExpenses: number
  timesheetHours: number
  teamMembers: number
  budgetChange: {
    value: string
    isPositive: boolean
  }
  expenseChange: {
    value: string
    isPositive: boolean
  }
  timesheetChange: {
    value: string
    isPositive: boolean
  }
  recentBudgets: {
    isMasked: boolean
    id: string
    name: string
    amount: string
    spent: string
    progress: number
  }[]
  recentExpenses: {
    isMasked: boolean
    id: string
    name: string
    amount: string
    date: string
    category: string
  }[]
  organization?: Organization
  viewingOrgData: boolean
}
