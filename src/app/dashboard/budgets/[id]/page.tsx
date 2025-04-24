'use client'

import { useState, useEffect } from 'react'
import { 
    useParams, 
    // useRouter 
}from 'next/navigation'
import { Plus, ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '@/components/dashboard/PageHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Link from 'next/link'

interface Expense {
  id: string
  name: string
  amount: string
  date: string
  category: string
  status: 'Approved' | 'Pending' | 'rejected'
}

interface Budget {
  id: string
  name: string
  amount: string
  spent: string
  remaining: string
  progress: number
  startDate: string
  endDate: string
  description: string
  category: string
  expenses: Expense[]
}

export default function BudgetDetail() {
  const params = useParams()
//   const router = useRouter()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBudget = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch this data from your API
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
        
        // Mock data - in a real app, this would come from your API
        const mockBudget: Budget = {
          id: params.id as string,
          name: 'Q2 Marketing',
          amount: '$5,000.00',
          spent: '$2,340.00',
          remaining: '$2,660.00',
          progress: 47,
          startDate: '2023-04-01',
          endDate: '2023-06-30',
          description: 'Budget for Q2 marketing campaigns including social media ads, content creation, and email marketing.',
          category: 'Marketing',
          expenses: [
            { id: '1', name: 'Facebook Ads', amount: '$800.00', date: '2023-04-15', category: 'Marketing', status: 'Approved' },
            { id: '2', name: 'Content Writer', amount: '$600.00', date: '2023-04-20', category: 'Marketing', status: 'Approved' },
            { id: '3', name: 'Email Campaign', amount: '$450.00', date: '2023-05-01', category: 'Marketing', status: 'Approved' },
            { id: '4', name: 'LinkedIn Ads', amount: '$490.00', date: '2023-05-10', category: 'Marketing', status: 'Pending' },
          ]
        }
        
        setBudget(mockBudget)
      } catch (error) {
        console.error('Failed to fetch budget:', error)
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
        <p className="mt-2 text-gray-600">The budget you&apos;e looking for doesn&apos; exist or you don&apos; have access to it.</p>
        <div className="mt-6">
          <Link
            href="/dashboard/budgets"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
        description={`Budget for ${budget.category}`}
        action={
          <div className="flex space-x-3">
            <Link 
              href={`/dashboard/budgets/${budget.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Pencil className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Edit
            </Link>
            <Link 
              href="/dashboard/budgets"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Back
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <DashboardCard title="Budget Overview">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Total Budget</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{budget.amount}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Spent</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{budget.spent}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Remaining</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{budget.remaining}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-medium text-gray-500">Progress</h4>
                <span className="text-xs font-medium text-gray-900">{budget.progress}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 rounded-full" 
                  style={{ width: `${budget.progress}%` }}
                />
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Budget Details" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Period</h4>
              <p className="mt-1 text-sm text-gray-900">
                {budget.startDate} to {budget.endDate}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Category</h4>
              <p className="mt-1 text-sm text-gray-900">{budget.category}</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xs font-medium uppercase text-gray-500">Description</h4>
              <p className="mt-1 text-sm text-gray-900">{budget.description}</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard 
        title="Budget Expenses"
        action={
          <Link 
            href={`/dashboard/expenses/create?budgetId=${budget.id}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
            Add Expense
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Expense
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budget.expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {expense.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{expense.category}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{expense.date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        expense.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : expense.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">{expense.amount}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                      href={`/dashboard/expenses/${expense.id}`}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      View<span className="sr-only">, {expense.name}</span>
                    </Link>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this expense?')) {
                          // In a real app, you would call your API to delete the expense
                          console.log('Delete expense:', expense.id)
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Delete {expense.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
              {budget.expenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                    No expenses found for this budget.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  )
}
