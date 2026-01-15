/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, Calendar, Sparkles, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { TimesheetResponse, WeeklyDescriptions, MonthlyDayEntry } from "@/types/timesheet"
import {
  getMonthStructure,
  getDaysInMonth,
} from "@/lib/timesheet-utils"

export default function EditTimesheetPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timesheet, setTimesheet] = useState<TimesheetResponse | null>(null)
  const [generatingWeek, setGeneratingWeek] = useState<number | null>(null)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  // State for monthly format
  const [isMonthlyFormat, setIsMonthlyFormat] = useState(false)
  const [name, setName] = useState("")
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [weeklyDescriptions, setWeeklyDescriptions] = useState<WeeklyDescriptions>({
    week1: "",
    week2: "",
    week3: "",
    week4: "",
  })
  const [entries, setEntries] = useState<MonthlyDayEntry[]>([])

  // Get month structure when in monthly format
  const monthStructure = useMemo(() => {
    if (!isMonthlyFormat) return null
    return getMonthStructure(selectedYear, selectedMonth)
  }, [isMonthlyFormat, selectedYear, selectedMonth])

  useEffect(() => {
    const fetchTimesheet = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/timesheets/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch timesheet")

        const data = (await response.json()) as TimesheetResponse
        setTimesheet(data)
        setName(data.name)

        // Detect if this is a monthly format timesheet
        const hasWeeklyDescriptions = data.weeklyDescriptions && 
          typeof data.weeklyDescriptions === 'object' &&
          ('week1' in data.weeklyDescriptions || 'week2' in data.weeklyDescriptions)
        
        // Also check by date range - monthly timesheets span more than 7 days
        const startDate = new Date(data.startDate)
        const endDate = data.endDate ? new Date(data.endDate) : startDate
        const daySpan = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        const isMonthly = hasWeeklyDescriptions || daySpan > 7

        setIsMonthlyFormat(isMonthly)

        if (isMonthly) {
          // Monthly format
          const year = startDate.getFullYear()
          const month = startDate.getMonth() + 1
          setSelectedYear(year)
          setSelectedMonth(month)

          // Set weekly descriptions if available
          if (data.weeklyDescriptions && typeof data.weeklyDescriptions === 'object') {
            const wd = data.weeklyDescriptions as WeeklyDescriptions
            setWeeklyDescriptions({
              week1: wd.week1 || "",
              week2: wd.week2 || "",
              week3: wd.week3 || "",
              week4: wd.week4 || "",
            })
          }

          // Initialize entries for all days in the month
          const totalDays = getDaysInMonth(year, month)
          const monthlyEntries: MonthlyDayEntry[] = Array.from({ length: totalDays }, (_, i) => ({
            dayOfMonth: i + 1,
            duration: "",
          }))

          // Map existing entries to days
          data.entries.forEach((entry) => {
            const entryDate = new Date(entry.startTime)
            const dayOfMonth = entryDate.getDate()
            const existingEntry = monthlyEntries.find((e) => e.dayOfMonth === dayOfMonth)
            if (existingEntry) {
              // Add to existing duration (in case of multiple entries per day)
              const existingDuration = Number.parseFloat(existingEntry.duration) || 0
              existingEntry.duration = (existingDuration + entry.duration).toString()
            }
          })

          setEntries(monthlyEntries)
        }
      } catch (error) {
        console.error("Error fetching timesheet:", error)
        toast.error("Failed to load timesheet")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchTimesheet()
    }
  }, [params.id])

  const handleWeeklyDescriptionChange = (weekNumber: number, value: string) => {
    const weekKey = `week${weekNumber}` as keyof WeeklyDescriptions
    setWeeklyDescriptions((prev) => ({
      ...prev,
      [weekKey]: value,
    }))
  }

  const handleGenerateDescription = async (weekNumber: number) => {
    setGeneratingWeek(weekNumber)

    try {
      const startDay = (weekNumber - 1) * 7 + 1
      const weekStartDate = new Date(selectedYear, selectedMonth - 1, startDay)
      const weekStarting = weekStartDate.toISOString().split("T")[0]

      const weekKey = `week${weekNumber}` as keyof WeeklyDescriptions
      const existingDescription = weeklyDescriptions[weekKey]

      const response = await fetch("/api/timesheets/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekStarting,
          existingDescription,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate description")
      }

      const data = await response.json()
      const generatedDescription = data.description

      if (!existingDescription.trim()) {
        setWeeklyDescriptions((prev) => ({
          ...prev,
          [weekKey]: generatedDescription,
        }))
        toast.success(`Week ${weekNumber} description generated successfully`)
      } else {
        setWeeklyDescriptions((prev) => ({
          ...prev,
          [weekKey]: `${prev[weekKey]}\n\n${generatedDescription}`,
        }))
        toast.success(`Week ${weekNumber} description enhanced successfully`)
      }
    } catch (error) {
      console.error("Error generating description:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate description. Please ensure you have uploaded a 3-Year Plan document."
      )
    } finally {
      setGeneratingWeek(null)
    }
  }

  const handleDurationChange = (dayOfMonth: number, value: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.dayOfMonth === dayOfMonth ? { ...entry, duration: value } : entry
      )
    )

    // Validate hours
    const hours = Number.parseFloat(value)
    const errors = { ...validationErrors }

    if (hours > 24) {
      errors[`day-${dayOfMonth}`] = "Hours cannot exceed 24 per day"
    } else if (hours > 12) {
      errors[`day-${dayOfMonth}`] = "Warning: Hours exceed 12 per day"
    } else {
      delete errors[`day-${dayOfMonth}`]
    }

    setValidationErrors(errors)
  }

  const getTotalHours = () => {
    return entries.reduce((total, entry) => {
      return total + (Number.parseFloat(entry.duration) || 0)
    }, 0)
  }

  const getWeekTotalHours = (weekNumber: number) => {
    const startDay = (weekNumber - 1) * 7 + 1
    const endDay = weekNumber * 7
    return entries
      .filter((e) => e.dayOfMonth >= startDay && e.dayOfMonth <= endDay)
      .reduce((total, entry) => total + (Number.parseFloat(entry.duration) || 0), 0)
  }

  const getExtraDaysTotalHours = () => {
    return entries
      .filter((e) => e.dayOfMonth > 28)
      .reduce((total, entry) => total + (Number.parseFloat(entry.duration) || 0), 0)
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    entries.forEach((entry) => {
      const hours = Number.parseFloat(entry.duration)
      if (hours > 24) {
        errors[`day-${entry.dayOfMonth}`] = "Hours cannot exceed 24 per day"
      }
    })

    const totalHours = getTotalHours()
    if (totalHours > 744) {
      errors.total = "Total hours exceed maximum possible"
    } else if (totalHours > 320) {
      errors.total = "Warning: Total hours exceed 320 for the month"
    }

    setValidationErrors(errors)
    return Object.keys(errors).filter((key) => errors[key].includes("cannot") || errors[key].includes("exceed maximum")).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix validation errors before submitting")
      return
    }

    setIsSubmitting(true)

    try {
      const validEntries = entries.filter((entry) => Number.parseFloat(entry.duration) > 0)

      // Check if there are any entries with hours
      if (validEntries.length === 0) {
        toast.error("Please enter hours for at least one day")
        setIsSubmitting(false)
        return
      }

      // Calculate actual date range based on entries with hours
      const daysWithHours = validEntries.map((e) => e.dayOfMonth).sort((a, b) => a - b)
      const firstDayWithHours = daysWithHours[0]
      const lastDayWithHours = daysWithHours[daysWithHours.length - 1]

      // Determine which weeks have hours logged
      const weeksWithHours = new Set<number>()
      validEntries.forEach((entry) => {
        if (entry.dayOfMonth <= 7) weeksWithHours.add(1)
        else if (entry.dayOfMonth <= 14) weeksWithHours.add(2)
        else if (entry.dayOfMonth <= 21) weeksWithHours.add(3)
        else if (entry.dayOfMonth <= 28) weeksWithHours.add(4)
        else weeksWithHours.add(5) // Extra days
      })

      // Filter weekly descriptions to only include weeks that have entries
      const filteredWeeklyDescriptions: typeof weeklyDescriptions = {
        week1: weeksWithHours.has(1) ? weeklyDescriptions.week1 : "",
        week2: weeksWithHours.has(2) ? weeklyDescriptions.week2 : "",
        week3: weeksWithHours.has(3) ? weeklyDescriptions.week3 : "",
        week4: weeksWithHours.has(4) ? weeklyDescriptions.week4 : "",
      }

      const timesheetData = {
        name,
        description: "", // Main description is not used for monthly format
        weeklyDescriptions: filteredWeeklyDescriptions,
        entries: validEntries.map((entry) => {
          const entryDate = new Date(selectedYear, selectedMonth - 1, entry.dayOfMonth)
          return {
            description: "",
            startTime: entryDate.toISOString(),
            endTime: entryDate.toISOString(),
            duration: Number.parseFloat(entry.duration) || 0,
          }
        }),
      }

      const response = await fetch(`/api/timesheets/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timesheetData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update timesheet")
      }

      toast.success("Timesheet updated successfully")
      router.push(`/dashboard/timesheets/${params.id}`)
    } catch (error) {
      console.error("Error updating timesheet:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update timesheet")
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Timesheet Not Found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The timesheet you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to edit it.
            </p>
          </div>
        </DashboardCard>
      </div>
    )
  }

  // Monthly format edit view
  if (isMonthlyFormat && monthStructure) {
    return (
      <div>
        <PageHeader
          title="Edit Timesheet"
          description={`Editing timesheet for ${monthStructure.monthName} ${selectedYear}`}
          action={
            <Link href={`/dashboard/timesheets/${params.id}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          }
        />

        <DashboardCard title="Monthly Timesheet">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Timesheet Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Timesheet Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {validationErrors.total && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationErrors.total}</AlertDescription>
              </Alert>
            )}

            {/* Week Sections */}
            <div className="space-y-8">
              {monthStructure.weeks.map((week) => {
                const weekKey = `week${week.weekNumber}` as keyof WeeklyDescriptions
                const weekTotalHours = getWeekTotalHours(week.weekNumber)

                return (
                  <div
                    key={week.weekNumber}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Week Header */}
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <h3 className="text-lg font-semibold">{week.label}</h3>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {weekTotalHours} hrs
                        </span>
                      </div>
                    </div>

                    {/* Week Description */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <Label htmlFor={`description-week-${week.weekNumber}`} className="mb-2 block">
                        Week {week.weekNumber} Description
                      </Label>
                      <Textarea
                        id={`description-week-${week.weekNumber}`}
                        value={weeklyDescriptions[weekKey]}
                        onChange={(e) => handleWeeklyDescriptionChange(week.weekNumber, e.target.value)}
                        placeholder={`Description of work performed in week ${week.weekNumber}`}
                        rows={2}
                        className="mb-2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateDescription(week.weekNumber)}
                        disabled={generatingWeek === week.weekNumber}
                        className="flex items-center gap-2"
                      >
                        {generatingWeek === week.weekNumber ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Week Days Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <th className="text-left py-2 px-4 border-b border-gray-200 dark:border-gray-700 font-medium text-sm">
                              Day
                            </th>
                            <th className="text-left py-2 px-4 border-b border-gray-200 dark:border-gray-700 font-medium text-sm">
                              Hours
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {week.days.map((day) => {
                            const entry = entries.find((e) => e.dayOfMonth === day.dayOfMonth)
                            const hasError = validationErrors[`day-${day.dayOfMonth}`]
                            const isErrorSevere = hasError && hasError.includes("cannot")

                            return (
                              <tr
                                key={day.dayOfMonth}
                                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                              >
                                <td className="py-3 px-4">
                                  <div className="font-medium">{day.dayName}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {day.formattedDate}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="space-y-1">
                                    <Input
                                      type="number"
                                      value={entry?.duration || ""}
                                      onChange={(e) => handleDurationChange(day.dayOfMonth, e.target.value)}
                                      min="0"
                                      max="24"
                                      step="0.5"
                                      className={`w-24 ${isErrorSevere ? "border-red-500" : hasError ? "border-yellow-500" : ""}`}
                                      placeholder="0"
                                    />
                                    {hasError && (
                                      <div
                                        className={`text-xs ${isErrorSevere ? "text-red-500" : "text-yellow-500"}`}
                                      >
                                        {validationErrors[`day-${day.dayOfMonth}`]}
                                      </div>
                                    )}
                                  </div>
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
              {monthStructure.extraDays.length > 0 && (
                <div className="border border-amber-300 dark:border-amber-700 rounded-lg overflow-hidden bg-amber-50 dark:bg-amber-950/30">
                  <div className="bg-amber-100 dark:bg-amber-900/50 px-4 py-3 border-b border-amber-300 dark:border-amber-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                          Extra Days (End of Month)
                        </h3>
                      </div>
                      <span className="text-sm text-amber-600 dark:text-amber-400">
                        {getExtraDaysTotalHours()} hrs
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      These days are outside the 4-week structure and do not have a weekly description.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-amber-100/50 dark:bg-amber-900/30">
                          <th className="text-left py-2 px-4 border-b border-amber-200 dark:border-amber-800 font-medium text-sm">
                            Day
                          </th>
                          <th className="text-left py-2 px-4 border-b border-amber-200 dark:border-amber-800 font-medium text-sm">
                            Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthStructure.extraDays.map((day) => {
                          const entry = entries.find((e) => e.dayOfMonth === day.dayOfMonth)
                          const hasError = validationErrors[`day-${day.dayOfMonth}`]
                          const isErrorSevere = hasError && hasError.includes("cannot")

                          return (
                            <tr
                              key={day.dayOfMonth}
                              className="border-b border-amber-100 dark:border-amber-900 hover:bg-amber-100/50 dark:hover:bg-amber-900/30"
                            >
                              <td className="py-3 px-4">
                                <div className="font-medium">{day.dayName}</div>
                                <div className="text-sm text-amber-600 dark:text-amber-400">
                                  {day.formattedDate}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="space-y-1">
                                  <Input
                                    type="number"
                                    value={entry?.duration || ""}
                                    onChange={(e) => handleDurationChange(day.dayOfMonth, e.target.value)}
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    className={`w-24 ${isErrorSevere ? "border-red-500" : hasError ? "border-yellow-500" : ""}`}
                                    placeholder="0"
                                  />
                                  {hasError && (
                                    <div
                                      className={`text-xs ${isErrorSevere ? "text-red-500" : "text-yellow-500"}`}
                                    >
                                      {validationErrors[`day-${day.dayOfMonth}`]}
                                    </div>
                                  )}
                                </div>
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

            {/* Summary Footer */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-lg font-semibold">
                  Total: {getTotalHours()} hrs
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Timesheet"
                )}
              </Button>
            </div>
          </form>
        </DashboardCard>
      </div>
    )
  }

  // Legacy weekly format - show message to user
  return (
    <div>
      <PageHeader
        title="Edit Timesheet"
        description={`Editing timesheet for ${format(parseISO(timesheet.startDate), "MMMM d, yyyy")}`}
        action={
          <Link href={`/dashboard/timesheets/${params.id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
        }
      />

      <DashboardCard title="">
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Legacy Timesheet Format</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This timesheet was created in the old weekly format. To edit it in the new monthly format,
            please create a new timesheet and delete this one.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/dashboard/timesheets/create">
              <Button>Create New Timesheet</Button>
            </Link>
            <Link href={`/dashboard/timesheets/${params.id}`}>
              <Button variant="outline">View Timesheet</Button>
            </Link>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
