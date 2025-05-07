/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { Plus, Filter, Search, ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import type { Expense, ExpenseFilters, ExpenseCategory } from "@/types/dashboard"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"

export default function Expenses() {
  // const router = useRouter()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ExpenseFilters>({
    sortBy: "date",
    sortOrder: "desc",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null)

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      setError(null)

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

      const data = await response.json()
      setExpenses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast.error(err instanceof Error ? err.message : "Failed to fetch expenses")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch categories")
      }

      const data = await response.json()
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
    }
  }

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
  }, [filters])

  const handleSearch = () => {
    setFilters({ ...filters, search: searchTerm })
  }

  const handleSort = (field: "title" | "amount" | "date" | "category" | "status") => {
    setFilters({
      ...filters,
      sortBy: field,
      sortOrder: filters.sortBy === field && filters.sortOrder === "asc" ? "desc" : "asc",
    })
  }

  const handleDeleteExpense = async () => {
    if (!deletingExpenseId) return

    try {
      const response = await fetch(`/api/expenses/${deletingExpenseId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete expense")
      }

      // Remove the deleted expense from the state
      setExpenses(expenses.filter((expense) => expense.id !== deletingExpenseId))
      toast.success("Expense deleted successfully")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete expense")
    } finally {
      setDeletingExpenseId(null)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "APPROVED":
  //       return "bg-teal-100 text-teal-800"
  //     case "PENDING":
  //       return "bg-yellow-100 text-yellow-800"
  //     case "REJECTED":
  //       return "bg-red-100 text-red-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  const renderSortIcon = (field: string) => {
    if (filters.sortBy !== field) return null
    return filters.sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Track and manage your expenses"
        action={
          <Link
            href="/dashboard/expenses/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Expense
          </Link>
        }
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <DashboardCard className="mb-6" title={""}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                type="date"
                id="startDate"
                value={filters.startDate || ""}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                type="date"
                id="endDate"
                value={filters.endDate || ""}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select
                value={filters.categoryId || ""}
                onValueChange={(value) => setFilters({ ...filters, categoryId: value || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                value={filters.status || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    status: (value === "all" ? undefined : value as "PENDING" | "APPROVED" | "REJECTED")
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Min Amount
              </label>
              <Input
                type="number"
                id="minAmount"
                value={filters.minAmount || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minAmount: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
            <div>
              <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Max Amount
              </label>
              <Input
                type="number"
                id="maxAmount"
                value={filters.maxAmount || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxAmount: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  sortBy: "date",
                  sortOrder: "desc",
                })
                setSearchTerm("")
              }}
            >
              Reset
            </Button>
            <Button onClick={() => fetchExpenses()}>Apply Filters</Button>
          </div>
        </DashboardCard>
      )}

      <DashboardCard title="All Expenses">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchExpenses}>Try Again</Button>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No expenses found</p>
            <Link href="/dashboard/expenses/create">
              <Button>Add Your First Expense</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center">
                      Expense
                      {renderSortIcon("title")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      {renderSortIcon("category")}
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Budget
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {renderSortIcon("date")}
                    </div>
                  </th>
                  {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {renderSortIcon("status")}
                    </div>
                  </th> */}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center justify-end">
                      Amount
                      {renderSortIcon("amount")}
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <Link href={`/dashboard/expenses/${expense.id}`} className="text-teal-600 hover:text-teal-900">
                        {expense.title}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {expense.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {expense.budget ? expense.budget.name : "-"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(expense.date)}</td>
                    {/* <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}
                      >
                        {expense.status}
                      </span>
                    </td> */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/dashboard/expenses/${expense.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 relative z-50 hover:text-red-800 hover:bg-red-50 cursor-pointer"
                              onClick={() => setDeletingExpenseId(expense.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only cursor-pointer">Delete</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Expense</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this expense? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDeletingExpenseId(null)}>
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleDeleteExpense}>
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}