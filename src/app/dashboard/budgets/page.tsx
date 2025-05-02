"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import { useAuthStore } from "@/lib/store/authStore"

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
}

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const {user} = useAuthStore()
  console.log(user)

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await fetch("/api/budget")
        if (!res.ok) throw new Error("Failed to fetch budgets")
        const data = await res.json()
        setBudgets(data)
      } catch (error) {
        console.error("Error fetching budgets:", error)
        toast.error("Failed to load budgets.")
      } finally {
        setLoading(false)
      }
    }

    fetchBudgets()
  }, [])

  // Check if user has permission to create a budget
  const canCreateBudget = user?.role === "ADMIN" || user?.role === "ORGANIZATION_ADMIN"

  return (
    <div>
      <PageHeader
        title="Budgets"
        description="Manage and track your budgets"
        action={
          canCreateBudget ? (
            <Link
              href="/dashboard/budgets/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create Budget
            </Link>
          ) : (
            <div className="text-sm text-gray-500">
              You don&apos;t have permission to create budgets
            </div>
          )
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading budgets...</p>
        ) : budgets.length === 0 ? (
          <p className="text-center text-muted-foreground">No budgets found.</p>
        ) : (
          budgets.map((budget) => (
            <DashboardCard
              key={budget.id}
              title={budget.name}
              action={
                <Link
                  href={`/dashboard/budgets/${budget.id}`}
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                >
                  View Details
                </Link>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-xs font-medium uppercase text-gray-500">Total Budget</h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">${budget.amount.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium uppercase text-gray-500">Spent</h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">${budget.spent.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium uppercase text-gray-500">Remaining</h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">${budget.remaining.toLocaleString()}</p>
                </div>
                {budget.endDate ? (
                  <div>
                    <h4 className="text-xs font-medium uppercase text-gray-500">Period</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(budget.startDate).toLocaleDateString()} -{" "}
                      {new Date(budget.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-medium uppercase text-gray-500">Created</h4>
                    <p className="mt-1 text-sm text-gray-900">{new Date(budget.startDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div className="md:col-span-4 mt-2">
                  <div className="flex items-center">
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: `${budget.progress}%` }} />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{budget.progress}%</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))
        )}
      </div>
    </div>
  )
}