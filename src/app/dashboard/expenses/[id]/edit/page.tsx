"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Percent } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Expense, ExpenseCategory, Budget } from "@/types/dashboard"
import { DatePickerDemo } from "@/components/ui/date-picker"
import { useQueryClient } from "@tanstack/react-query"
import { expenseKeys } from "@/lib/hooks/use-expense"
import { dashboardKeys } from "@/lib/hooks/use-dashboard"
import { budgetKeys } from "@/lib/hooks/use-budgets"
export default function EditExpense() {
  const params = useParams()
  const router = useRouter()
  const [expense, setExpense] = useState<Expense | null>(null)
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
    taxRate: "",
    categoryId: "",
    budgetId: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch expense
        const expenseRes = await fetch(`/api/expenses/${params.id}`)
        if (!expenseRes.ok) throw new Error("Failed to fetch expense")
        const expenseData = await expenseRes.json()
        setExpense(expenseData)

        // Format date for input field (YYYY-MM-DD)
        const formattedDate = new Date(expenseData.date).toISOString().split("T")[0]

        setFormData({
          title: expenseData.title,
          description: expenseData.description || "",
          amount: expenseData.amount.toString(),
          date: formattedDate,
          categoryId: expenseData.categoryId || "",
          budgetId: expenseData.budgetId || "",
          taxRate: expenseData.taxRate !== null && expenseData.taxRate !== undefined ? expenseData.taxRate.toString() : "",
        })
        // Calculate tax amount and total
        const amount = expenseData.amount
        const taxRate = expenseData.taxRate || 0
        const calculatedTaxAmount = amount * (taxRate / 100)
        const calculatedTotalAmount = amount + calculatedTaxAmount

        setTaxAmount(calculatedTaxAmount)
        setTotalAmount(calculatedTotalAmount)
        // Fetch categories
        const categoriesRes = await fetch("/api/categories")
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData)
        }

        // Fetch budgets
        const budgetsRes = await fetch("/api/budget")
        if (budgetsRes.ok) {
          const budgetsData = await budgetsRes.json()
          setBudgets(budgetsData)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setError("Failed to load expense data. Please try again.")
        toast.error("Failed to load expense data.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchData()
    }
  }, [params.id])

  // Calculate tax and total amount when amount or tax rate changes
  useEffect(() => {
    const amount = parseFloat(formData.amount) || 0
    const taxRate = parseFloat(formData.taxRate) || 0

    const calculatedTaxAmount = amount * (taxRate / 100)
    const calculatedTotalAmount = amount + calculatedTaxAmount

    setTaxAmount(calculatedTaxAmount)
    setTotalAmount(calculatedTotalAmount)
  }, [formData.amount, formData.taxRate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const queryClient = useQueryClient()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error("Expense title is required")
      }

      if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
        throw new Error("Please enter a valid amount")
      }
      if (formData.taxRate && (isNaN(Number(formData.taxRate)) || Number(formData.taxRate) < 0)) {
        throw new Error("Please enter a valid tax rate")
      }

      if (!formData.date) {
        throw new Error("Date is required")
      }

      if (!formData.categoryId) {
        throw new Error("Please select a category")
      }

      const response = await fetch(`/api/expenses/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          amount: Number(formData.amount),
          taxRate: formData.taxRate ? Number(formData.taxRate) : null,
          date: formData.date,
          categoryId: formData.categoryId,
          budgetId: formData.budgetId || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update expense")
      }

      toast.success("Expense updated successfully")
      await queryClient.invalidateQueries({ queryKey: expenseKeys.lists() })
      await queryClient.invalidateQueries({ queryKey: budgetKeys.lists() })
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.lists() })
      router.push(`/dashboard/expenses`)
    } catch (err) {
      console.error("Error updating expense:", err)
      setError(err instanceof Error ? err.message : "Failed to update expense")
      toast.error(err instanceof Error ? err.message : "Failed to update expense")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (error && !expense) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Error Loading Expense</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <div className="mt-6">
          <Link
            href="/dashboard/expenses"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Back to Expenses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Edit Expense"
        description="Update your expense details"
        action={
          <Link
            href={`/dashboard/expenses/${params.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back
          </Link>
        }
      />

      <DashboardCard title="Edit Expense">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-2">
              <Label htmlFor="title">Expense Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1" required />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-7"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="pr-8"
                  min="0"
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Tax calculation summary */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${parseFloat(formData.amount || "0").toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Tax ({parseFloat(formData.taxRate || "0").toFixed(2)}%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium mt-1 pt-1 border-t border-gray-200">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              {/* <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1"
                required
              /> */}
              <DatePickerDemo
                name="date"
                id="date"
                // required={formData.hasTimeframe}
                value={formData.date}
                onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="categoryId">Category</Label>
              <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange("categoryId", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budgetId">Budget (Optional)</Label>
              <Select value={formData.budgetId} onValueChange={(value) => handleSelectChange("budgetId", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-budget">No Budget</SelectItem>
                  {budgets.map((budget) => (
                    <SelectItem key={budget.id} value={budget.id}>
                      {budget.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link href={`/dashboard/expenses/${params.id}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
