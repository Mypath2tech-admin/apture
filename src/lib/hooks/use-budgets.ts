"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

// Types
interface Budget {
    id: string
    name: string
    amount: number
    spent: number
    remaining: number
    progress: number
    startDate: string
    endDate?: string
    description?: string
    categories?: { id: string; name: string }[]
    createdBy?: { name: string; email: string }
    organization?: { name: string }
    canEdit?: boolean
}

// Query keys
export const budgetKeys = {
    all: ["budgets"] as const,
    lists: () => [...budgetKeys.all, "list"] as const,
    list: (filters: unknown) => [...budgetKeys.lists(), { filters }] as const,
    details: () => [...budgetKeys.all, "detail"] as const,
    detail: (id: string) => [...budgetKeys.details(), id] as const,
}

// Fetch functions
const fetchBudgets = async (): Promise<Budget[]> => {
    const res = await fetch("/api/budget")
    if (!res.ok) throw new Error("Failed to fetch budgets")
    return res.json()
}

const fetchBudget = async (id: string): Promise<Budget> => {
    const res = await fetch(`/api/budget/${id}`)
    if (!res.ok) throw new Error("Failed to fetch budget")
    return res.json()
}

const deleteBudget = async (id: string): Promise<void> => {
    const res = await fetch(`/api/budget/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete budget")
}

// Hooks
export function useBudgets() {
    return useQuery({
        queryKey: budgetKeys.lists(),
        queryFn: fetchBudgets,
    })
}

export function useBudget(id: string) {
    return useQuery({
        queryKey: budgetKeys.detail(id),
        queryFn: () => fetchBudget(id),
        enabled: !!id, // Only run if id is provided
    })
}

export function useDeleteBudget() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteBudget,
        onSuccess: () => {
            // Invalidate and refetch budgets list
            queryClient.invalidateQueries({ queryKey: budgetKeys.lists() })
            toast.success("Budget deleted successfully")
        },
        onError: (error) => {
            console.error("Error deleting budget:", error)
            toast.error("Failed to delete budget")
        },
    })
}
