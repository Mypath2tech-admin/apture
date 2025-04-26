export interface Budget {
  id: string
  name: string
  amount: number
  startDate: string
  endDate: string
  description?: string
  createdAt: string
  updatedAt: string
  organizationId?: string
  userId?: string
  projectId?: string
  spent: number
  remaining: number
  progress: number
  categories?: BudgetCategory[]
  expenses?: Expense[]
}

export interface BudgetCategory {
  id: string
  name: string
  allocatedAmount: number
  description?: string
}

export interface Expense {
  id: string
  title: string
  amount: number
  date: string
  description?: string
  receipt?: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  categoryId: string
  budgetId?: string
  userId: string
  organizationId?: string
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
  }
  budget?: {
    id: string
    name: string
  }
}

export interface ExpenseCategory {
  id: string
  name: string
}

export interface BudgetFilters {
  search?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  sortBy?: "name" | "amount" | "startDate" | "endDate" | "progress"
  sortOrder?: "asc" | "desc"
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