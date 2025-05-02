export interface ExpenseWhereClause {
  userId?: string
  organizationId?: string
  title?: { contains: string; mode: "insensitive" }
  date?: {
    gte?: Date
    lte?: Date
  }
  amount?: {
    gte?: number
    lte?: number
  }
  categoryId?: string
  budgetId?: string
  status?: string
}

export interface ExpenseQueryParams {
  search?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  categoryId?: string
  budgetId?: string
  status?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export type ExpenseSortField = "date" | "amount" | "title" | "createdAt" | "updatedAt" | "status"

export interface BudgetWhereClause {
  userId?: string
  organizationId?: string
  name?: { contains: string; mode: "insensitive" }
  startDate?: {
    gte?: Date
    lte?: Date
  }
  amount?: {
    gte?: number
    lte?: number
  }
}

export interface BudgetQueryParams {
  search?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export type BudgetSortField = "name" | "amount" | "startDate" | "createdAt" | "updatedAt"
