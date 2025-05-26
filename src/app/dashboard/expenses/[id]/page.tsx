"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Receipt, Calendar, Tag, Edit, Percent, DollarSign } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { Expense } from "@/types/dashboard"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

export default function ExpenseDetail() {
  const params = useParams()
  const [expense, setExpense] = useState<Expense | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExpense()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchExpense = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/expenses/${params.id}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch expense")
      }

      const data = await response.json()
      setExpense(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast.error(err instanceof Error ? err.message : "Failed to fetch expense")
    } finally {
      setLoading(false)
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
  // Calculate tax amount and total
  const calculateTaxAmount = () => {
    if (!expense) return 0
    return expense.taxRate ? (expense.amount * expense.taxRate) / 100 : 0
  }

  const calculateTotal = () => {
    if (!expense) return 0
    const taxAmount = calculateTaxAmount()
    return expense.amount + taxAmount
  }


  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchExpense}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (!expense) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-4">Expense not found</p>
          <Link href="/dashboard/expenses">
            <Button>Back to Expenses</Button>
          </Link>
        </div>
      </div>
    )
  }
  const taxAmount = calculateTaxAmount()
  const totalAmount = calculateTotal()
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button and header */}
      <div className="mb-8">
        <Link
          href="/dashboard/expenses"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Expenses
        </Link>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{expense.title}</h1>
            {expense.budget && (
              <Link
                href={`/dashboard/budgets/${expense.budget.id}`}
                className="mt-2 inline-flex items-center text-sm text-teal-600 hover:text-teal-700"
              >
                <Tag className="mr-1 h-4 w-4" />
                {expense.budget.name}
              </Link>
            )}
          </div>


        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Expense details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Expense Details</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
                </div>
                {expense.taxRate !== null && expense.taxRate !== undefined && (
                  <>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <Percent className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-500">Tax Rate</h4>
                        <p className="text-base text-gray-900">{expense.taxRate}%</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-500">Tax Amount</h4>
                        <p className="text-base text-gray-900">{formatCurrency(taxAmount)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-500">Total (with tax)</h4>
                        <p className="text-base font-semibold text-gray-900">{formatCurrency(totalAmount)}</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-base text-gray-900">{formatDate(expense.date)}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-teal-500 mr-2"></div>
                    <p className="text-base text-gray-900">{expense?.category?.name}</p>
                  </div>
                </div>

                {expense.user && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Submitted By</p>
                    <p className="text-base text-gray-900">{expense.user.firstName}</p>
                  </div>
                )}
              </div>

              {expense.description && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                  <p className="text-base text-gray-900 whitespace-pre-line">{expense.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Receipt and actions */}
        <div className="lg:col-span-1">
          {expense.receipt && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Receipt</h2>
              </div>

              <div className="p-6">
                <div className="aspect-[3/4] bg-gray-50 rounded-lg flex items-center justify-center">
                  <a
                    href={expense.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Receipt className="h-12 w-12 mb-3" />
                    <span className="text-sm font-medium">View Receipt</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Actions</h2>
            </div>

            <div className="p-6">
              <Link href={`/dashboard/expenses/${expense.id}/edit`}>
                <Button className="w-full" variant="default">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Expense
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}