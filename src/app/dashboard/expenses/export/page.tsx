"use client"

import type React from "react"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
import { ArrowLeft, FileDown, Calendar, Download } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ExportRequestParams } from "@/types/export"
import type { ExpenseCategory, Budget } from "@/types/dashboard"

export default function ExportExpenses() {
//   const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState<ExportRequestParams>({
    startDate: "",
    endDate: "",
    categoryId: "",
    budgetId: "",
    format: "csv",
    includeReceipts: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch categories
        const categoriesRes = await fetch("/api/categories")
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData)
        }

        // Fetch budgets
        const budgetsRes = await fetch("/api/budgets")
        if (budgetsRes.ok) {
          const budgetsData = await budgetsRes.json()
          setBudgets(budgetsData)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast.error("Failed to load filter options.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsExporting(true)
    setError(null)

    try {
      // Build query string
      const queryParams = new URLSearchParams()
      if (formData.startDate) queryParams.append("startDate", formData.startDate)
      if (formData.endDate) queryParams.append("endDate", formData.endDate)
      if (formData.categoryId) queryParams.append("categoryId", formData.categoryId)
      if (formData.budgetId) queryParams.append("budgetId", formData.budgetId)
      queryParams.append("format", formData.format)
      if (formData.includeReceipts) queryParams.append("includeReceipts", "true")

      // Create URL for export
      const exportUrl = `/api/export/expenses?${queryParams.toString()}`

      // Trigger download
      window.location.href = exportUrl

      // Show success message
      toast.success("Export started. Your file will download shortly.")
    } catch (err) {
      console.error("Error exporting expenses:", err)
      setError(err instanceof Error ? err.message : "Failed to export expenses")
      toast.error(err instanceof Error ? err.message : "Failed to export expenses")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Export Expenses"
        description="Download your expense data in various formats"
        action={
          <Link
            href="/dashboard/expenses"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back to Expenses
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DashboardCard title="" className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <form onSubmit={handleExport} className="space-y-6">
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
                <div>
                  <Label htmlFor="startDate">Start Date (Optional)</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="categoryId">Category (Optional)</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleSelectChange("categoryId", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
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
                      <SelectValue placeholder="All Budgets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Budgets</SelectItem>
                      {budgets.map((budget) => (
                        <SelectItem key={budget.id} value={budget.id}>
                          {budget.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <Select value={formData.format} onValueChange={(value) => handleSelectChange("format", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="includeReceipts"
                    checked={formData.includeReceipts}
                    onCheckedChange={(checked) => handleCheckboxChange("includeReceipts", checked === true)}
                  />
                  <Label htmlFor="includeReceipts" className="cursor-pointer">
                    Include receipt links (where available)
                  </Label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Link href="/dashboard/expenses">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isExporting}>
                  {isExporting ? (
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
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileDown className="-ml-1 mr-2 h-5 w-5" />
                      Export Expenses
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DashboardCard>

        <DashboardCard title="Export Options">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Available Formats</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Download className="h-4 w-4 mr-2 text-gray-500" />
                  CSV (Comma Separated Values)
                </li>
                <li className="flex items-center">
                  <Download className="h-4 w-4 mr-2 text-gray-500" />
                  Excel Spreadsheet
                </li>
                <li className="flex items-center">
                  <Download className="h-4 w-4 mr-2 text-gray-500" />
                  PDF Document
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">Included Data</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Expense title and description</li>
                <li>• Amount and date</li>
                <li>• Category and budget</li>
                <li>• User information</li>
                <li>• Receipt links (optional)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Leaving filters empty will export all expenses you have access to.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
