"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import type { Budget, ExpenseCategory } from "@/types/dashboard"

interface ExpenseFormData {
  title: string
  amount: string
  date: string
  categoryId: string
  budgetId: string
  description: string
  receipt?: File | null
}

export default function CreateExpense() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoadingBudgets, setIsLoadingBudgets] = useState(true)

  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const [formData, setFormData] = useState<ExpenseFormData>({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Today's date as default
    categoryId: "",
    budgetId: searchParams.get("budgetId") || "",
    description: "",
    receipt: null,
  })

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/users/me")
        if (response.ok) {
          const userData = await response.json()
          setUserRole(userData.role)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserRole()
  }, [])

  // Fetch categories and budgets when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Always fetch budgets
        const budgetsResponse = await fetch("/api/budget")

        if (!budgetsResponse.ok) {
          throw new Error("Failed to fetch budgets")
        }

        const budgetsData = await budgetsResponse.json()
        setBudgets(budgetsData)
        setIsLoadingBudgets(false)

        // Only fetch categories if user is admin or organization admin
        if (userRole === "ADMIN" || userRole === "ORGANIZATION_ADMIN") {
          const categoriesResponse = await fetch("/api/categories")

          if (!categoriesResponse.ok) {
            throw new Error("Failed to fetch categories")
          }

          const categoriesData = await categoriesResponse.json()
          setCategories(categoriesData)
        }

        setIsLoadingCategories(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
        setIsLoadingBudgets(false)
        setIsLoadingCategories(false)
      }
    }

    if (userRole !== null) {
      fetchData()
    }
  }, [userRole])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, receipt: e.target.files?.[0] || null }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Create request payload
      const payload = {
        title: formData.title,
        amount: Number.parseFloat(formData.amount),
        date: formData.date,
        categoryId: formData.categoryId || undefined, // Allow undefined for non-admin users
        budgetId: formData.budgetId || undefined,
        description: formData.description || undefined,
        // We'll handle file upload separately if needed
      }

      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create expense")
      }

      const data = await response.json()
      console.log(data)
      setSuccessMessage("Expense created successfully!")

      // Redirect after a brief delay to show success message
      setTimeout(() => {
        // Redirect to the budget detail page if a budget was selected
        if (formData.budgetId) {
          router.push(`/dashboard/budgets/${formData.budgetId}`)
        } else {
          router.push("/dashboard/expenses")
        }
      }, 1500)
    } catch (err) {
      console.error("Failed to create expense:", err)
      setError(err instanceof Error ? err.message : "Failed to create expense")
      toast.error(err instanceof Error ? err.message : "Failed to create expense")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Add Expense"
        description="Record a new expense"
        action={
          <Link
            href={formData.budgetId ? `/dashboard/budgets/${formData.budgetId}` : "/dashboard/expenses"}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </Link>
        }
      />

      <DashboardCard title="Expense Details">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Expense Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="block w-full pl-7 rounded-md p-2 border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            {/* Only show category selection for admin users */}
            {userRole === "ADMIN" || userRole === "ORGANIZATION_ADMIN" ? (
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  disabled={isLoadingCategories}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {isLoadingCategories && <p className="mt-1 text-sm text-gray-500">Loading categories...</p>}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <p className="mt-1 text-sm text-gray-500">Categories are assigned by administrators</p>
              </div>
            )}

            <div>
              <label htmlFor="budgetId" className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <select
                id="budgetId"
                name="budgetId"
                value={formData.budgetId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                disabled={isLoadingBudgets}
              >
                <option value="">Select a budget (optional)</option>
                {budgets.map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </select>
              {isLoadingBudgets && <p className="mt-1 text-sm text-gray-500">Loading budgets...</p>}
            </div>

            <div>
              <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
                Receipt (optional)
              </label>
              <input
                type="file"
                name="receipt"
                id="receipt"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Expense"}
            </button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
