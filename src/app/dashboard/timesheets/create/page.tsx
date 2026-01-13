"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Percent, AlertCircle, Sparkles, Calendar } from "lucide-react"
import type { WeeklyDescriptions, MonthlyDayEntry } from "@/types/timesheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getMonthStructure,
  getYearOptions,
  getMonthOptions,
  getMonthNameFromNumber,
  getDaysInMonth,
} from "@/lib/timesheet-utils"

export default function CreateTimesheet() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingRate, setIsLoadingRate] = useState(true)
  const [isLoadingTaxRate, setIsLoadingTaxRate] = useState(true)
  const [organizationTaxRate, setOrganizationTaxRate] = useState<number>(0)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [totalEarnings, setTotalEarnings] = useState<number>(0)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [generatingWeek, setGeneratingWeek] = useState<number | null>(null)

  // Initialize with current year and month
  const currentDate = new Date()
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1)
  const [hourlyRate, setHourlyRate] = useState<string>("")

  // Weekly descriptions for each of the 4 weeks
  const [weeklyDescriptions, setWeeklyDescriptions] = useState<WeeklyDescriptions>({
    week1: "",
    week2: "",
    week3: "",
    week4: "",
  })

  // Day entries - indexed by day of month (1-31)
  const [entries, setEntries] = useState<MonthlyDayEntry[]>([])

  // Get month structure whenever year/month changes
  const monthStructure = useMemo(() => {
    return getMonthStructure(selectedYear, selectedMonth)
  }, [selectedYear, selectedMonth])

  // Initialize entries when month/year changes
  useEffect(() => {
    const totalDays = getDaysInMonth(selectedYear, selectedMonth)
    setEntries(
      Array.from({ length: totalDays }, (_, i) => ({
        dayOfMonth: i + 1,
        duration: "",
      }))
    )
  }, [selectedYear, selectedMonth])

  // Fetch user's hourly rate and organization tax rate
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Fetch hourly rate
        const hourlyRateResponse = await fetch("/api/user/hourly-rate")
        if (hourlyRateResponse.ok) {
          const hourlyRateData = await hourlyRateResponse.json()
          setHourlyRate(hourlyRateData.currentRate.toString())
        }
        setIsLoadingRate(false)

        // Fetch organization tax rate
        const taxRateResponse = await fetch("/api/organization/tax-rate")
        if (taxRateResponse.ok) {
          const taxRateData = await taxRateResponse.json()
          setOrganizationTaxRate(taxRateData.taxRate)
        }
        setIsLoadingTaxRate(false)
      } catch (error) {
        console.error("Error fetching rates:", error)
        toast.error("Failed to load rate information")
        setIsLoadingRate(false)
        setIsLoadingTaxRate(false)
      }
    }

    fetchRates()
  }, [])

  // Calculate tax and total earnings when hours or rates change
  useEffect(() => {
    const totalHours = getTotalHours()
    const rate = Number.parseFloat(hourlyRate) || 0
    const subtotal = totalHours * rate
    const calculatedTaxAmount = subtotal * (organizationTaxRate / 100)
    const calculatedTotalEarnings = subtotal + calculatedTaxAmount

    setTaxAmount(calculatedTaxAmount)
    setTotalEarnings(calculatedTotalEarnings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, hourlyRate, organizationTaxRate])

  const handleYearChange = (value: string) => {
    setSelectedYear(parseInt(value, 10))
  }

  const handleMonthChange = (value: string) => {
    setSelectedMonth(parseInt(value, 10))
  }

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyRate(e.target.value)
  }

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
      // Calculate the start date for this week in the month
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

      // If field is empty, fill it; otherwise append
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
    validateHours(dayOfMonth, value)
  }

  const validateHours = (dayOfMonth: number, value: string) => {
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

    // Check for excessive hours per day
    entries.forEach((entry) => {
      const hours = Number.parseFloat(entry.duration)
      if (hours > 24) {
        errors[`day-${entry.dayOfMonth}`] = "Hours cannot exceed 24 per day"
      }
    })

    // Check for excessive total hours (31 days * 24 hours = 744 max)
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

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix validation errors before submitting")
      return
    }

    setIsSubmitting(true)

    try {
      // Filter out entries with zero duration
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

      const startDate = new Date(selectedYear, selectedMonth - 1, firstDayWithHours)
      const endDate = new Date(selectedYear, selectedMonth - 1, lastDayWithHours)

      // Determine which weeks have hours logged for the name
      const weeksWithHours = new Set<number>()
      validEntries.forEach((entry) => {
        if (entry.dayOfMonth <= 7) weeksWithHours.add(1)
        else if (entry.dayOfMonth <= 14) weeksWithHours.add(2)
        else if (entry.dayOfMonth <= 21) weeksWithHours.add(3)
        else if (entry.dayOfMonth <= 28) weeksWithHours.add(4)
        else weeksWithHours.add(5) // Extra days
      })

      // Create a descriptive name based on weeks with hours
      let timesheetName: string
      if (weeksWithHours.size === 1 && !weeksWithHours.has(5)) {
        const weekNum = Array.from(weeksWithHours)[0]
        timesheetName = `${getMonthNameFromNumber(selectedMonth)} ${selectedYear} - Week ${weekNum}`
      } else if (firstDayWithHours === lastDayWithHours) {
        timesheetName = `${getMonthNameFromNumber(selectedMonth)} ${firstDayWithHours}, ${selectedYear}`
      } else {
        timesheetName = `${getMonthNameFromNumber(selectedMonth)} ${firstDayWithHours}-${lastDayWithHours}, ${selectedYear}`
      }

      // Filter weekly descriptions to only include weeks that have entries
      const filteredWeeklyDescriptions: typeof weeklyDescriptions = {
        week1: weeksWithHours.has(1) ? weeklyDescriptions.week1 : "",
        week2: weeksWithHours.has(2) ? weeklyDescriptions.week2 : "",
        week3: weeksWithHours.has(3) ? weeklyDescriptions.week3 : "",
        week4: weeksWithHours.has(4) ? weeklyDescriptions.week4 : "",
      }

      const timesheetData = {
        name: timesheetName,
        description: "", // Main description is no longer used; we use weeklyDescriptions
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        hourlyRate: Number.parseFloat(hourlyRate) || 0,
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

      // Submit timesheet
      const response = await fetch("/api/timesheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timesheetData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create timesheet")
      }

      toast.success("Timesheet created successfully")
      router.push("/dashboard/timesheets")
    } catch (error) {
      console.error("Error creating timesheet:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create timesheet")
    } finally {
      setIsSubmitting(false)
    }
  }

  const yearOptions = getYearOptions()
  const monthOptions = getMonthOptions()

  return (
    <div>
      <PageHeader
        title="Log Time"
        description="Record your working hours for the month"
        action={
          <Link href="/dashboard/timesheets">
            <Button variant="outline">Cancel</Button>
          </Link>
        }
      />

      <DashboardCard title="Monthly Timesheet">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Year, Month, and Hourly Rate Selection */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                type="number"
                id="hourlyRate"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={isLoadingRate}
              />
            </div>
          </div>

          {/* Organization Tax Rate Display */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <Percent className="h-4 w-4 text-gray-500 mr-2" />
              <Label className="font-medium">Organization Tax Rate</Label>
            </div>
            {isLoadingTaxRate ? (
              <div className="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ) : (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                All timesheet entries are subject to a {organizationTaxRate}% tax rate as set by your organization.
              </div>
            )}
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
                {/* Extra Days Header */}
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

                {/* Extra Days Table */}
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
              <div className="space-y-1 text-right">
                <div className="flex justify-between text-sm gap-4">
                  <span>Subtotal:</span>
                  <span>
                    ${(getTotalHours() * Number.parseFloat(hourlyRate || "0")).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm gap-4">
                  <span>Tax ({organizationTaxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1 border-t border-gray-200 dark:border-gray-700 gap-4">
                  <span>Total Earnings:</span>
                  <span className="text-green-600 dark:text-green-400">${totalEarnings.toFixed(2)}</span>
                </div>
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
                "Save Timesheet"
              )}
            </Button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
