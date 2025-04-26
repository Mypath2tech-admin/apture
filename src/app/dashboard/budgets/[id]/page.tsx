'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Plus, ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '@/components/dashboard/PageHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Link from 'next/link'
import {toast} from 'react-toastify'

interface Expense {
  id: string
  title: string
  amount: number
  date: string
  category: { id: string, name: string }
}

interface Budget {
  id: string
  name: string
  amount: number
  spent: number
  remaining: number
  progress: number
  startDate: string
  endDate: string
  description: string
  expenses: Expense[]
}

export default function BudgetDetail() {
  const params = useParams()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBudget = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/budget/${params.id}`)
        if (!res.ok) throw new Error('Failed to fetch budget')

        const data = await res.json()

        const formattedBudget: Budget = {
          id: data.id,
          name: data.name,
          amount: data.amount,
          spent: data.spent,
          remaining: data.remaining,
          progress: data.progress,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description,
          expenses: data.expenses.map((exp: Expense) => ({
            id: exp.id,
            title: exp.title,
            amount: exp.amount,
            date: exp.date,
            category: exp.category,
          })),
        }

        setBudget(formattedBudget)
      } catch (error) {
        console.error('Failed to fetch budget:', error)
        toast.error('Failed to load budget.')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchBudget()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!budget) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Budget not found</h2>
        <p className="mt-2 text-gray-600">The budget you're looking for doesn't exist or you don't have access to it.</p>
        <div className="mt-6">
          <Link
            href="/dashboard/budgets"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Back to Budgets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title={budget.name}
        description="Detailed budget overview"
        action={
          <div className="flex space-x-3">
            <Link
              href={`/dashboard/budgets/${budget.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Pencil className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Edit
            </Link>
            <Link
              href="/dashboard/budgets"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
              Back
            </Link>
          </div>
        }
      />

      {/* Budget Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <DashboardCard title="Budget Overview">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Total Budget</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">₦{budget.amount.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Spent</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">₦{budget.spent.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Remaining</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">₦{budget.remaining.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-medium text-gray-500">Progress</h4>
                <span className="text-xs font-medium text-gray-900">{budget.progress}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: `${budget.progress}%` }} />
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Budget Details */}
        <DashboardCard title="Budget Details" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Period</h4>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xs font-medium uppercase text-gray-500">Description</h4>
              <p className="mt-1 text-sm text-gray-900">{budget.description || "No description provided."}</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Budget Expenses */}
      <DashboardCard
        title="Budget Expenses"
        action={
          <Link
            href={`/dashboard/expenses/create?budgetId=${budget.id}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="-ml-1 mr-1 h-4 w-4" />
            Add Expense
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Expense</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budget.expenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                budget.expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900">
                      {expense.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {expense.category.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                      ₦{expense.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  )
}
