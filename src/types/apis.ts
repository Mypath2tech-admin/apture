import type { Prisma } from "../../generated/prisma"

/**
 * Interface for expense query filters
 */
export interface ExpenseWhereClause {
  userId?: string
  organizationId?: string
  title?: {
    contains: string
    mode: "insensitive" | "default"
  }
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

/**
 * Interface for expense query parameters from URL
 */
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

/**
 * Type for expense sort options
 */
export type ExpenseSortField = keyof Prisma.ExpenseOrderByWithRelationInput
