'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PageHeader from '@/components/dashboard/PageHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Link from 'next/link'

interface Budget {
  id: string
  name: string
}

interface ExpenseFormData {
  name: string
  amount: string
  date: string
  category: string
  budgetId: string
  description: string
  receipt?: File | null
}

export default function CreateExpense() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoadingBudgets, setIsLoadingBudgets] = useState(true)
  
  const [formData, setFormData] = useState<ExpenseFormData>({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Today's date as default
    category: '',
    budgetId: searchParams.get('budgetId') || '',
    description: '',
    receipt: null
  })

  useEffect(() => {
    const fetchBudgets = async () => {
      setIsLoadingBudgets(true)
      try {
        // In a real app, you would fetch this data from your API
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
        
        // Mock data - in a real app, this would come from your API
        const mockBudgets: Budget[] = [
          { id: '1', name: 'Q2 Marketing' },
          { id: '2', name: 'Office Supplies' },
          { id: '3', name: 'Development Tools' },
          { id: '4', name: 'Team Building' },
        ]
        
        setBudgets(mockBudgets)
      } catch (error) {
        console.error('Failed to fetch budgets:', error)
      } finally {
        setIsLoadingBudgets(false)
      }
    }

    fetchBudgets()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, receipt: e.target.files?.[0] || null }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would submit this data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      
      console.log('Expense created:', formData)
      
      // Redirect to the budget detail page if a budget was selected
      if (formData.budgetId) {
        router.push(`/dashboard/budgets/${formData.budgetId}`)
      } else {
        router.push('/dashboard/expenses')
      }
    } catch (error) {
      console.error('Failed to create expense:', error)
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Expense Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
                  className="block w-full pl-7 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Technology">Technology</option>
                <option value="Facilities">Facilities</option>
                <option value="Meals">Meals</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="budgetId" className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <select
                id="budgetId"
                name="budgetId"
                value={formData.budgetId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                disabled={isLoadingBudgets}
              >
                <option value="">Select a budget (optional)</option>
                {budgets.map(budget => (
                  <option key={budget.id} value={budget.id}>{budget.name}</option>
                ))}
              </select>
              {isLoadingBudgets && (
                <p className="mt-1 text-sm text-gray-500">Loading budgets...</p>
              )}
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
              {isSubmitting ? 'Saving...' : 'Save Expense'}
            </button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
