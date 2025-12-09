"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { Expense, ExpenseFilters } from "@/types/dashboard"

// Query keys
export const expenseKeys = {
  all: ["expenses"] as const,
  lists: () => [...expenseKeys.all, "list"] as const,
  list: (filters: ExpenseFilters) => [...expenseKeys.lists(), { filters }] as const,
  details: () => [...expenseKeys.all, "detail"] as const,
  detail: (id: string) => [...expenseKeys.details(), id] as const,
}

export const categoriesKey = {
  all: ["categories"] as const,
  lists: () => [...categoriesKey.all, "list"] as const,
}
// Fetch functions
const fetchExpenses = async (filters: ExpenseFilters = {}): Promise<Expense[]> => {
  // Build query string from filters
  const queryParams = new URLSearchParams()
  if (filters.search) queryParams.append("search", filters.search)
  if (filters.startDate) queryParams.append("startDate", filters.startDate)
  if (filters.endDate) queryParams.append("endDate", filters.endDate)
  if (filters.minAmount !== undefined) queryParams.append("minAmount", filters.minAmount.toString())
  if (filters.maxAmount !== undefined) queryParams.append("maxAmount", filters.maxAmount.toString())
  if (filters.categoryId) queryParams.append("categoryId", filters.categoryId)
  if (filters.budgetId) queryParams.append("budgetId", filters.budgetId)
  if (filters.status) queryParams.append("status", filters.status)
  if (filters.sortBy) queryParams.append("sortBy", filters.sortBy)
  if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder)

  const response = await fetch(`/api/expenses?${queryParams.toString()}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to fetch expenses")
  }
  return response.json()
}

const fetchExpense = async (id: string): Promise<Expense> => {
  const response = await fetch(`/api/expenses/${id}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to fetch expense")
  }
  return response.json()
}
const fetchCategories = async () => {
  const response = await fetch("/api/categories")
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to fetch expense")
  }
  return response.json()
}

const deleteExpense = async (id: string): Promise<void> => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to delete expense")
  }
}

// Hooks
export function useExpenses(filters: ExpenseFilters = {}) {
  return useQuery({
    queryKey: expenseKeys.list(filters),
    queryFn: () => fetchExpenses(filters),
  })
}
export function useCategories() {
  return useQuery({
    queryKey: categoriesKey.lists(),
    queryFn: () => fetchCategories()
  })
}
export function useExpense(id: string) {
  return useQuery({
    queryKey: expenseKeys.detail(id),
    queryFn: () => fetchExpense(id),
    enabled: !!id, // Only run if id is provided
  })
}

export function useDeleteExpense() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      // Invalidate and refetch expenses list
      queryClient.invalidateQueries({ queryKey: expenseKeys.lists() })
      toast.success("Expense deleted successfully")
    },
    onError: (error) => {
      console.error("Error deleting expense:", error)
      toast.error("Failed to delete expense")
    },
  })
}
