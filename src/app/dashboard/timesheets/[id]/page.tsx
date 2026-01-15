"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Edit, Trash2, AlertTriangle, DollarSign, Percent, ArrowLeft, Calendar, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { TimesheetResponse, WeeklyDescriptions } from "@/types/timesheet"
import { getMonthStructure } from "@/lib/timesheet-utils"

export default function TimesheetDetailPage() {
  const params = useParams()
  const [timesheet, setTimesheet] = useState<TimesheetResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  // Use a ref to prevent duplicate fetches
  const fetchedRef = useRef(false)
  const timesheetIdRef = useRef(params.id)

  useEffect(() => {
    // Only fetch if we haven't fetched yet or if the ID has changed
    if (!fetchedRef.current || timesheetIdRef.current !== params.id) {
      timesheetIdRef.current = params.id

      const fetchTimesheet = async () => {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/timesheets/${params.id}`)
          if (!response.ok) throw new Error("Failed to fetch timesheet")

          const data = (await response.json()) as TimesheetResponse
          setTimesheet(data)
          fetchedRef.current = true
        } catch (error) {
          console.error("Error fetching timesheet:", error)
          toast.error("Failed to load timesheet")
        } finally {
          setIsLoading(false)
        }
      }

      fetchTimesheet()
    }
  }, [params.id])

  // Detect if this is a monthly format timesheet
  const isMonthlyFormat = useMemo(() => {
    if (!timesheet) return false
    
    const hasWeeklyDescriptions = timesheet.weeklyDescriptions && 
      typeof timesheet.weeklyDescriptions === 'object' &&
      ('week1' in timesheet.weeklyDescriptions || 'week2' in timesheet.weeklyDescriptions)
    
    // Also check by date range - monthly timesheets span more than 7 days
    const startDate = new Date(timesheet.startDate)
    const endDate = timesheet.endDate ? new Date(timesheet.endDate) : startDate
    const daySpan = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    
    return hasWeeklyDescriptions || daySpan > 7
  }, [timesheet])

  // Get month structure for monthly format
  const monthData = useMemo(() => {
    if (!timesheet || !isMonthlyFormat) return null
    
    const startDate = new Date(timesheet.startDate)
    const year = startDate.getFullYear()
    const month = startDate.getMonth() + 1
    
    return {
      year,
      month,
      structure: getMonthStructure(year, month),
      weeklyDescriptions: (timesheet.weeklyDescriptions as WeeklyDescriptions) || {
        week1: "",
        week2: "",
        week3: "",
        week4: "",
      },
    }
  }, [timesheet, isMonthlyFormat])

  // Get hours for a specific day of month
  const getHoursForDay = (dayOfMonth: number) => {
    if (!timesheet || !monthData) return 0
    
    const targetDate = new Date(monthData.year, monthData.month - 1, dayOfMonth)
    const targetDateStr = format(targetDate, "yyyy-MM-dd")
    
    return timesheet.entries
      .filter((entry) => format(new Date(entry.startTime), "yyyy-MM-dd") === targetDateStr)
      .reduce((sum, entry) => sum + entry.duration, 0)
  }

  // Get total hours for a week
  const getWeekTotalHours = (weekNumber: number) => {
    const startDay = (weekNumber - 1) * 7 + 1
    const endDay = weekNumber * 7
    let total = 0
    for (let day = startDay; day <= endDay; day++) {
      total += getHoursForDay(day)
    }
    return total
  }

  // Get total hours for extra days
  const getExtraDaysTotalHours = () => {
    if (!monthData) return 0
    let total = 0
    for (let day = 29; day <= monthData.structure.totalDays; day++) {
      total += getHoursForDay(day)
    }
    return total
  }

  // Check if a week has any hours
  const weekHasHours = (weekNumber: number) => {
    return getWeekTotalHours(weekNumber) > 0
  }

  // Check if a week has description
  const weekHasDescription = (weekNumber: number) => {
    if (!monthData) return false
    const weekKey = `week${weekNumber}` as keyof WeeklyDescriptions
    return Boolean(monthData.weeklyDescriptions[weekKey]?.trim())
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/timesheets/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete timesheet")

      toast.success("Timesheet deleted successfully")
      router.push("/dashboard/timesheets")
    } catch (error) {
      console.error("Error deleting timesheet:", error)
      toast.error("Failed to delete timesheet")
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const startParsed = parseISO(startDate)
    const start = format(startParsed, "MMMM d, yyyy")
    
    if (!endDate) return start
    
    const endParsed = parseISO(endDate)
    
    if (format(startParsed, "yyyy-MM-dd") === format(endParsed, "yyyy-MM-dd")) {
      return start
    }
    
    if (
      startParsed.getFullYear() === endParsed.getFullYear() &&
      startParsed.getMonth() === endParsed.getMonth()
    ) {
      return `${format(startParsed, "MMMM d")}-${format(endParsed, "d, yyyy")}`
    }
    
    if (startParsed.getFullYear() === endParsed.getFullYear()) {
      return `${format(startParsed, "MMMM d")} - ${format(endParsed, "MMMM d, yyyy")}`
    }
    
    const end = format(endParsed, "MMMM d, yyyy")
    return `${start} - ${end}`
  }

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "$0.00"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Legacy: Group entries by day of week (for old weekly format)
  const getEntriesByDay = () => {
    if (!timesheet) return []

    return Array(7)
      .fill(null)
      .map((_, i) => {
        const dayDate = new Date(timesheet.startDate)
        dayDate.setDate(dayDate.getDate() + i)
        const dayFormatted = format(dayDate, "yyyy-MM-dd")

        const dayEntries = timesheet.entries.filter(
          (entry) => format(new Date(entry.startTime), "yyyy-MM-dd") === dayFormatted,
        )

        const totalDuration = dayEntries.reduce((sum, entry) => sum + entry.duration, 0)
        const description = dayEntries.map((e) => e.description).join("; ")

        return {
          day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i],
          date: dayDate,
          duration: totalDuration,
          description: description,
          entries: dayEntries,
        }
      })
  }

  // Calculate total duration
  const getTotalDuration = () => {
    if (!timesheet) return 0
    return timesheet.entries.reduce((sum, entry) => sum + entry.duration, 0)
  }

  const entriesByDay = timesheet ? getEntriesByDay() : []
  const totalDuration = timesheet ? getTotalDuration() : 0

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <DashboardCard title="">
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/4" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </DashboardCard>
      </div>
    )
  }

  if (!timesheet) {
    return (
      <div>
        <PageHeader
          title="Timesheet Not Found"
          description="The requested timesheet could not be found"
          action={
            <Link href="/dashboard/timesheets">
              <Button variant="outline">Back to Timesheets</Button>
            </Link>
          }
        />
        <DashboardCard title="">
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Timesheet Not Found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The timesheet you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
            </p>
          </div>
        </DashboardCard>
      </div>
    )
  }

  // Monthly format view
  if (isMonthlyFormat && monthData) {
    return (
      <div>
        <PageHeader
          title={timesheet.name}
          description={formatDateRange(timesheet.startDate, timesheet.endDate)}
          action={
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/timesheets"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
              >
                <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
                Back
              </Link>
              <Link href={`/dashboard/timesheets/${params.id}/edit`}>
                <Button variant="outline" className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Link href={`/api/timesheets/export/${params.id}?format=pdf`} target="_blank">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </Link>
              <Link href={`/api/timesheets/export/${params.id}?format=xlsx`} target="_blank">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
              </Link>
              <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          {/* Main Content - Weeks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week Sections - Only show weeks that have hours or descriptions */}
            {monthData.structure.weeks.map((week) => {
              const weekKey = `week${week.weekNumber}` as keyof WeeklyDescriptions
              const weekDescription = monthData.weeklyDescriptions[weekKey]
              const weekTotal = getWeekTotalHours(week.weekNumber)
              const hasContent = weekHasHours(week.weekNumber) || weekHasDescription(week.weekNumber)

              if (!hasContent) return null

              return (
                <div
                  key={week.weekNumber}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
                >
                  {/* Week Header */}
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <h3 className="text-lg font-semibold">{week.label}</h3>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {weekTotal} hrs
                      </span>
                    </div>
                  </div>

                  {/* Week Description */}
                  {weekDescription && weekDescription.trim() && (
                    <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-teal-800 dark:text-teal-200 mb-1">
                            Week {week.weekNumber} Description
                          </h4>
                          <p className="text-sm text-teal-700 dark:text-teal-300 whitespace-pre-wrap">
                            {weekDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Week Days Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="text-left py-2 px-4 border-b border-gray-200 dark:border-gray-700 font-medium text-sm text-gray-600 dark:text-gray-400">
                            Day
                          </th>
                          <th className="text-right py-2 px-4 border-b border-gray-200 dark:border-gray-700 font-medium text-sm text-gray-600 dark:text-gray-400">
                            Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {week.days.map((day) => {
                          const hours = getHoursForDay(day.dayOfMonth)

                          return (
                            <tr
                              key={day.dayOfMonth}
                              className={`border-b border-gray-100 dark:border-gray-800 ${
                                hours > 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"
                              }`}
                            >
                              <td className="py-3 px-4">
                                <div className={`font-medium ${hours > 0 ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}`}>
                                  {day.dayName}
                                </div>
                                <div className={`text-sm ${hours > 0 ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>
                                  {day.formattedDate}
                                </div>
                              </td>
                              <td className={`py-3 px-4 text-right font-medium ${
                                hours > 0 ? "text-gray-900 dark:text-gray-100" : "text-gray-300 dark:text-gray-600"
                              }`}>
                                {hours > 0 ? `${hours} hrs` : "-"}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}

            {/* Extra Days Section */}
            {monthData.structure.extraDays.length > 0 && getExtraDaysTotalHours() > 0 && (
              <div className="border border-amber-300 dark:border-amber-700 rounded-lg overflow-hidden bg-amber-50 dark:bg-amber-950/30">
                <div className="bg-amber-100 dark:bg-amber-900/50 px-4 py-3 border-b border-amber-300 dark:border-amber-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                        Extra Days (End of Month)
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded">
                      {getExtraDaysTotalHours()} hrs
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-amber-100/50 dark:bg-amber-900/30">
                        <th className="text-left py-2 px-4 border-b border-amber-200 dark:border-amber-800 font-medium text-sm text-amber-700 dark:text-amber-300">
                          Day
                        </th>
                        <th className="text-right py-2 px-4 border-b border-amber-200 dark:border-amber-800 font-medium text-sm text-amber-700 dark:text-amber-300">
                          Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthData.structure.extraDays.map((day) => {
                        const hours = getHoursForDay(day.dayOfMonth)

                        return (
                          <tr
                            key={day.dayOfMonth}
                            className="border-b border-amber-100 dark:border-amber-900"
                          >
                            <td className="py-3 px-4">
                              <div className="font-medium text-amber-800 dark:text-amber-200">{day.dayName}</div>
                              <div className="text-sm text-amber-600 dark:text-amber-400">
                                {day.formattedDate}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-medium text-amber-800 dark:text-amber-200">
                              {hours > 0 ? `${hours} hrs` : "-"}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <DashboardCard title="">
              <h3 className="text-lg font-medium mb-4">Summary</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-md bg-blue-50 dark:bg-blue-900/30 p-2 text-blue-600 dark:text-blue-400">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hourly Rate</h4>
                    <p className="text-lg font-semibold">{formatCurrency(timesheet.hourlyRate)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-md bg-green-50 dark:bg-green-900/30 p-2 text-green-600 dark:text-green-400">
                    <Percent className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tax Rate</h4>
                    <p className="text-lg font-semibold">{timesheet.taxRate}%</p>
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hours</h4>
                  <p className="text-xl font-semibold">{totalDuration}</p>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subtotal</h4>
                  <p className="text-lg font-semibold">{formatCurrency(timesheet.subtotal)}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tax Amount</h4>
                  <p className="text-lg font-semibold">{formatCurrency(timesheet.taxAmount)}</p>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</h4>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-400">{formatCurrency(timesheet.totalAmount)}</p>
                </div>

                {timesheet.user && (
                  <div className="pt-4 border-t dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted By</h4>
                    <p className="mt-1">
                      {timesheet.user.firstName && timesheet.user.lastName
                        ? `${timesheet.user.firstName} ${timesheet.user.lastName}`
                        : timesheet.user.email}
                    </p>
                  </div>
                )}
              </div>
            </DashboardCard>
          </div>
        </div>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Timesheet</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this timesheet? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Legacy weekly format view
  return (
    <div>
      <PageHeader
        title={timesheet.name}
        description={formatDateRange(timesheet.startDate, timesheet.endDate)}
        action={
          <div className="flex space-x-2">
            <Link
              href="/dashboard/timesheets"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
            >
              <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
              Back
            </Link>
            <Link href={`/dashboard/timesheets/${params.id}/edit`}>
              <Button variant="outline" className="flex items-center">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <div className="flex space-x-2">
              <Link href={`/api/timesheets/export/${params.id}?format=pdf`} target="_blank">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </Link>
              <Link href={`/api/timesheets/export/${params.id}?format=xlsx`} target="_blank">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
              </Link>
            </div>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <DashboardCard className="md:col-span-2" title="">
          {timesheet.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{timesheet.description}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-4">Time Entries</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left py-2 px-4 border-b dark:border-gray-700">Day</th>
                    <th className="text-left py-2 px-4 border-b dark:border-gray-700">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {entriesByDay.map((dayData, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4">
                        <div className="font-medium">{dayData.day}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{format(dayData.date, "MMM d, yyyy")}</div>
                      </td>
                      <td className="py-3 px-4">{dayData.duration}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 dark:bg-gray-800 font-medium">
                    <td className="py-3 px-4">Total</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <span>{totalDuration} hrs</span>
                        <div className="space-y-1 text-right">
                          <div className="flex justify-between text-sm gap-4">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(timesheet.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm gap-4">
                            <span>Tax ({timesheet.taxRate}%):</span>
                            <span>{formatCurrency(timesheet.taxAmount)}</span>
                          </div>
                          <div className="flex justify-between font-medium pt-1 border-t border-gray-200 dark:border-gray-700 gap-4">
                            <span>Total:</span>
                            <span className="text-green-600 dark:text-green-400">{formatCurrency(timesheet.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="">
          <h3 className="text-lg font-medium mb-4">Summary</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 dark:bg-blue-900/30 p-2 text-blue-600 dark:text-blue-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hourly Rate</h4>
                <p className="text-lg font-semibold">{formatCurrency(timesheet.hourlyRate)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-50 dark:bg-green-900/30 p-2 text-green-600 dark:text-green-400">
                <Percent className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tax Rate</h4>
                <p className="text-lg font-semibold">{timesheet.taxRate}%</p>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hours</h4>
              <p className="text-xl font-semibold">{totalDuration}</p>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subtotal</h4>
              <p className="text-lg font-semibold">{formatCurrency(timesheet.subtotal)}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tax Amount</h4>
              <p className="text-lg font-semibold">{formatCurrency(timesheet.taxAmount)}</p>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</h4>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">{formatCurrency(timesheet.totalAmount)}</p>
            </div>

            {timesheet.user && (
              <div className="pt-4 border-t dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted By</h4>
                <p className="mt-1">
                  {timesheet.user.firstName && timesheet.user.lastName
                    ? `${timesheet.user.firstName} ${timesheet.user.lastName}`
                    : timesheet.user.email}
                </p>
              </div>
            )}
          </div>
        </DashboardCard>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Timesheet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this timesheet? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
