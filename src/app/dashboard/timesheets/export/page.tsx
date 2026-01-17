"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Download, Loader2 } from "lucide-react"
import { format, startOfMonth, endOfMonth } from "date-fns"
import { toast } from "react-toastify"
import Link from "next/link"
import type { TimesheetListResponse } from "@/types/timesheet"
import { useOrganizationUsers } from "@/lib/hooks/use-organization-users"
import { useAuthStore } from "@/lib/store/authStore"

interface MonthOption {
  value: string // yyyy-MM
  label: string // e.g. December 2025
  hasTimesheets: boolean
}

export default function ExportTimesheetsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const { data: organizationUsers = [], isLoading: isLoadingUsers } = useOrganizationUsers()
  const { user: currentUser } = useAuthStore()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMonths, setIsLoadingMonths] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    // Default to current month in YYYY-MM format
    const now = new Date()
    return format(now, "yyyy-MM")
  })
  const [months, setMonths] = useState<MonthOption[]>([])

  // Initialize selectedUserId to current user when users are loaded
  useEffect(() => {
    if (currentUser?.id && !selectedUserId) {
      setSelectedUserId(currentUser.id)
    }
  }, [currentUser, selectedUserId])

  // Fetch timesheets to determine which months have data for selected user
  useEffect(() => {
    if (!selectedUserId) return

    const fetchMonths = async () => {
      setIsLoadingMonths(true)
      try {
        const response = await fetch("/api/timesheets?page=1&limit=500")
        if (!response.ok) {
          throw new Error("Failed to load timesheets for export")
        }

        const data = (await response.json()) as TimesheetListResponse
        // Filter timesheets for selected user
        const timesheets = (data.timesheets || []).filter(
          (ts) => ts.userId === selectedUserId
        )

        if (timesheets.length === 0) {
          // No timesheets at all – show only current month marked as empty
          const now = new Date()
          const monthValue = format(now, "yyyy-MM")
          setMonths([
            {
              value: monthValue,
              label: format(now, "MMMM yyyy"),
              hasTimesheets: false,
            },
          ])
          setSelectedMonth(monthValue)
          return
        }

        // Build a map of month -> count of timesheets
        const monthCounts = new Map<string, number>()
        const dates: Date[] = []

        timesheets.forEach((ts) => {
          const d = new Date(ts.startDate)
          dates.push(d)
          const key = format(d, "yyyy-MM")
          monthCounts.set(key, (monthCounts.get(key) || 0) + 1)
        })

        // Determine range of months from earliest to latest timesheet
        const minDate = dates.reduce((min, d) => (d < min ? d : min), dates[0])
        const maxDate = dates.reduce((max, d) => (d > max ? d : max), dates[0])

        let cursor = startOfMonth(minDate)
        const lastMonth = startOfMonth(maxDate)
        const monthOptions: MonthOption[] = []

        while (cursor <= lastMonth) {
          const value = format(cursor, "yyyy-MM")
          const label = format(cursor, "MMMM yyyy")
          const hasTimesheets = (monthCounts.get(value) || 0) > 0
          monthOptions.push({ value, label, hasTimesheets })
          // Move to next month
          cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
        }

        setMonths(monthOptions)

        // If current selectedMonth is not within range, default to first month
        const hasSelected = monthOptions.some((m) => m.value === selectedMonth)
        if (!hasSelected && monthOptions.length > 0) {
          setSelectedMonth(monthOptions[0].value)
        }
      } catch (error) {
        console.error("Error loading months for timesheet export:", error)
        toast.error("Failed to load months for export")
      } finally {
        setIsLoadingMonths(false)
      }
    }

    fetchMonths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId])

  const handleExport = async () => {
    if (!selectedMonth) {
      toast.error("Please select a month to export")
      return
    }

    const monthMeta = months.find((m) => m.value === selectedMonth)
    if (monthMeta && !monthMeta.hasTimesheets) {
      toast.warning("There are no timesheets for the selected month")
      return
    }

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
        userId: selectedUserId,
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
          {/* User Selection (for delegated export) */}
          {organizationUsers.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="user">Select User</Label>
              <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                disabled={isLoadingUsers}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {organizationUsers.map((user) => {
                    const displayName = user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName} (${user.email})`
                      : user.email
                    return (
                      <SelectItem key={user.id} value={user.id || ""}>
                        {displayName}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select the user whose timesheet you want to export
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="month">Select Month</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                disabled={isLoadingMonths}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white"
              >
                {isLoadingMonths ? (
                  <option>Loading months...</option>
                ) : months.length === 0 ? (
                  <option>No months available</option>
                ) : (
                  months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                      {month.hasTimesheets ? "" : " — No timesheets"}
                    </option>
                  ))
                )}
              </select>
            </div>
            {!isLoadingMonths && selectedMonth && (
              <p className="text-sm text-gray-500">
                {(() => {
                  const monthMeta = months.find((m) => m.value === selectedMonth)
                  if (!monthMeta) return null
                  if (!monthMeta.hasTimesheets) {
                    return `No timesheets recorded for ${monthMeta.label}.`
                  }
                  return `All timesheets for ${monthMeta.label} will be exported.`
                })()}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Link href="/dashboard/timesheets">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              onClick={handleExport}
              disabled={isLoading || isLoadingMonths || months.length === 0}
              className="bg-teal-600 hover:bg-teal-700"
            >
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

