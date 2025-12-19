"use client"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuthStore } from "@/lib/store/authStore"
import PageHeader  from "@/components/dashboard/PageHeader"
import { Calendar, Download, FileSpreadsheet, FileText, Filter, Loader2 } from "lucide-react"
import { format } from "date-fns"

export default function ExportExpensesPage() {
  // const router = useRouter()
  // const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "excel" | "pdf">("csv")
  const [dateRange, setDateRange] = useState<{
    startDate: string
    endDate: string
  }>({
    startDate: format(new Date(new Date().setDate(1)), "yyyy-MM-dd"), // First day of current month
    endDate: format(new Date(), "yyyy-MM-dd"), // Today
  })
  const [filters, setFilters] = useState({
    categories: [] as string[],
    budgets: [] as string[],
  })
  const [availableCategories, setAvailableCategories] = useState<Array<{ id: string; name: string }>>([])
  const [availableBudgets, setAvailableBudgets] = useState<Array<{ id: string; name: string }>>([])
  const [reportType, setReportType] = useState<"detailed" | "summary">("detailed")
  const [includeReceipts, setIncludeReceipts] = useState(false)

  // Fetch available categories and budgets for filtering
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Only fetch in browser (client-side)
        if (typeof window === 'undefined') return

        // Fetch categories
        const categoriesResponse = await fetch("/api/categories")
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setAvailableCategories(categoriesData)
        }

        // Fetch budgets
        const budgetsResponse = await fetch("/api/budget")
        if (budgetsResponse.ok) {
          const budgetsData = await budgetsResponse.json()
          setAvailableBudgets(budgetsData)
        }
      } catch (error) {
        console.error("Error fetching filter options:", error)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => {
      if (prev.categories.includes(categoryId)) {
        return {
          ...prev,
          categories: prev.categories.filter((id) => id !== categoryId),
        }
      } else {
        return {
          ...prev,
          categories: [...prev.categories, categoryId],
        }
      }
    })
  }

  const handleBudgetToggle = (budgetId: string) => {
    setFilters((prev) => {
      if (prev.budgets.includes(budgetId)) {
        return {
          ...prev,
          budgets: prev.budgets.filter((id) => id !== budgetId),
        }
      } else {
        return {
          ...prev,
          budgets: [...prev.budgets, budgetId],
        }
      }
    })
  }

  const handleExport = async () => {
    setIsLoading(true)

    try {
      // Build query parameters
      const params = new URLSearchParams({
        format: exportFormat,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        reportType,
        includeReceipts: includeReceipts.toString(),
      })

      // Add category filters
      filters.categories.forEach((categoryId) => {
        params.append("categories", categoryId)
      })

      // Add budget filters
      filters.budgets.forEach((budgetId) => {
        params.append("budgets", budgetId)
      })

      // Make the API request
      const response = await fetch(`/api/export/expenses?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to generate export")
      }

      // Get the blob from the response
      const blob = await response.blob()

      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url

      // Set the file name based on the export format
      const fileName = `expenses_${format(new Date(), "yyyy-MM-dd")}`
      a.download = `${fileName}.${exportFormat === "excel" ? "xlsx" : exportFormat}`

      // Trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Export error:", error)
      alert("Failed to generate export. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Export Expenses"
        description="Generate and download expense reports in various formats"
        action={
          <button
            onClick={handleExport}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              <>
                <Download className="-ml-1 mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </button>
        }
      />

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Report Options</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Configure your expense report settings</p>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Export Format */}
            <div className="sm:col-span-3">
              <label htmlFor="export-format" className="block text-sm font-medium text-gray-700">
                Export Format
              </label>
              <div className="mt-1 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setExportFormat("csv")}
                  className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                    exportFormat === "csv"
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  CSV
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat("excel")}
                  className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                    exportFormat === "excel"
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Excel
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat("pdf")}
                  className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                    exportFormat === "pdf"
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </button>
              </div>
            </div>

            {/* Report Type */}
            <div className="sm:col-span-3">
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <div className="mt-1 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setReportType("detailed")}
                  className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                    reportType === "detailed"
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Detailed
                </button>
                <button
                  type="button"
                  onClick={() => setReportType("summary")}
                  className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                    reportType === "summary"
                      ? "bg-teal-50 border-teal-500 text-teal-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Summary
                </button>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                    checked={includeReceipts}
                    onChange={(e) => setIncludeReceipts(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Include receipt images (PDF only)</span>
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div className="sm:col-span-6">
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="sm:col-span-6">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Filters</label>
                <button
                  type="button"
                  onClick={() => setFilters({ categories: [], budgets: [] })}
                  className="text-sm text-teal-600 hover:text-teal-500"
                >
                  Clear all filters
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <Filter className="h-4 w-4 mr-1" /> Categories
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableCategories.length > 0 ? (
                    availableCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          filters.categories.includes(category.id)
                            ? "bg-teal-100 text-teal-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No categories available</p>
                  )}
                </div>
              </div>

              {/* Budgets Filter */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <Filter className="h-4 w-4 mr-1" /> Budgets
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableBudgets.length > 0 ? (
                    availableBudgets.map((budget) => (
                      <button
                        key={budget.id}
                        type="button"
                        onClick={() => handleBudgetToggle(budget.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          filters.budgets.includes(budget.id)
                            ? "bg-teal-100 text-teal-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {budget.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No budgets available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            onClick={handleExport}
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              <>
                <Download className="-ml-1 mr-2 h-4 w-4" />
                Generate & Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Report Preview</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">This is a preview of what your report will include</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-700">Your report will include:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                Expenses from {format(new Date(dateRange.startDate), "MMMM d, yyyy")} to{" "}
                {format(new Date(dateRange.endDate), "MMMM d, yyyy")}
              </li>
              <li>
                {reportType === "detailed"
                  ? "Detailed information for each expense (date, amount, category, description, etc.)"
                  : "Summary information grouped by category"}
              </li>
              {filters.categories.length > 0 && (
                <li>
                  Filtered by {filters.categories.length} categor{filters.categories.length === 1 ? "y" : "ies"}
                </li>
              )}
              {filters.budgets.length > 0 && (
                <li>
                  Filtered by {filters.budgets.length} budget{filters.budgets.length === 1 ? "" : "s"}
                </li>
              )}
              {includeReceipts && exportFormat === "pdf" && <li>Receipt images will be included</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
