'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/dashboard/PageHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Link from 'next/link'

interface CategoryInput {
  name: string
  allocatedAmount: number
  description?: string
}

interface BudgetFormData {
  name: string
  amount: string
  startDate: string
  endDate: string
  description: string
  categories: CategoryInput[]
}

export default function CreateBudget() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BudgetFormData>({
    name: '',
    amount: '',
    startDate: '',
    endDate: '',
    description: '',
    categories: []
  })
  const [categoryName, setCategoryName] = useState('')
  const [categoryAmount, setCategoryAmount] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCategory = () => {
    if (!categoryName || !categoryAmount) return
    
    const newCategory: CategoryInput = {
      name: categoryName,
      allocatedAmount: parseFloat(categoryAmount),
      description: categoryDescription || undefined
    }
    
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }))
    
    // Reset inputs
    setCategoryName('')
    setCategoryAmount('')
    setCategoryDescription('')
  }

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare request body according to API expectations
      const requestBody = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        description: formData.description || undefined,
        categories: formData.categories.length > 0 ? formData.categories : undefined
      }

      // Send POST request to the API
      const response = await fetch('/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('Budget created:', data)
      router.push('/dashboard/budgets')
    } catch (error) {
      console.error('Failed to create budget:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <PageHeader 
        title="Create Budget" 
        description="Set up a new budget to track your expenses"
        action={
          <Link 
            href="/dashboard/budgets"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </Link>
        }
      />

      <DashboardCard title="Budget Details">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Budget Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Budget Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="block w-full pl-7 p-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Budget Categories Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Budget Categories</h3>
            <p className="text-sm text-gray-500">Allocate your budget into categories</p>
            
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="categoryAmount" className="block text-sm font-medium text-gray-700">
                  Allocated Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="categoryAmount"
                    step="0.01"
                    value={categoryAmount}
                    onChange={(e) => setCategoryAmount(e.target.value)}
                    className="block w-full pl-7 p-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mt-2">
              <button
                type="button"
                onClick={handleAddCategory}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Category
              </button>
            </div>
            
            {/* Display added categories */}
            {formData.categories.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Added Categories</h4>
                <div className="mt-2 divide-y divide-gray-200">
                  {formData.categories.map((category, index) => (
                    <div key={index} className="py-2 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-500">${category.allocatedAmount.toFixed(2)}</p>
                        {category.description && <p className="text-xs text-gray-400">{category.description}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Budget'}
            </button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}