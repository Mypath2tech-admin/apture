"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar, Download, Loader2 } from "lucide-react"
import { format, startOfMonth, endOfMonth } from "date-fns"
import { toast } from "react-toastify"
import Link from "next/link"

export default function ExportTimesheetsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    // Default to current month in YYYY-MM format
    const now = new Date()
    return format(now, "yyyy-MM")
  })

  const handleExport = async () => {
    setIsLoading(true)

    try {
      // Parse selected month to get start and end dates
      const [year, month] = selectedMonth.split("-").map(Number)
      const monthStart = startOfMonth(new Date(year, month - 1))
      const monthEnd = endOfMonth(new Date(year, month - 1))

      // Build query parameters
      const params = new URLSearchParams({
        format: "pdf",
        startDate: format(monthStart, "yyyy-MM-dd"),
        endDate: format(monthEnd, "yyyy-MM-dd"),
      })

      // Trigger download
      const response = await fetch(`/api/timesheets/export?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to export timesheets")
      }

      // Get the blob and create download link
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Timesheet-Export-${selectedMonth}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success("Timesheet export downloaded successfully")
    } catch (error) {
      console.error("Error exporting timesheets:", error)
      toast.error(error instanceof Error ? error.message : "Failed to export timesheets")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Export Timesheets"
        description="Export all timesheets for a selected month"
        action={
          <Link href="/dashboard/timesheets">
            <Button variant="outline">Back</Button>
          </Link>
        }
      />

      <DashboardCard title="Export Settings">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="month">Select Month</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <p className="text-sm text-gray-500">
              All timesheets for {format(new Date(selectedMonth + "-01"), "MMMM yyyy")} will be exported
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Link href="/dashboard/timesheets">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleExport} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}

