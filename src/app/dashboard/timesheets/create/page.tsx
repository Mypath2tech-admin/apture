"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, startOfWeek, addDays, parseISO } from "date-fns"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Percent, AlertCircle, Sparkles } from "lucide-react"
import type { TimesheetFormData } from "@/types/timesheet"
import { DatePickerDemo } from "@/components/ui/date-picker"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateTimesheet() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingRate, setIsLoadingRate] = useState(true)
  const [isLoadingTaxRate, setIsLoadingTaxRate] = useState(true)
  const [organizationTaxRate, setOrganizationTaxRate] = useState<number>(0)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [totalEarnings, setTotalEarnings] = useState<number>(0)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [isGenerating, setIsGenerating] = useState(false)


  // Get the current week's Monday
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 })

  // Initialize the form data
  const [formData, setFormData] = useState<TimesheetFormData>({
    name: `Week of ${format(monday, "MMM d, yyyy")}`,
    description: "",
    hourlyRate: "",
    weekStarting: format(monday, "yyyy-MM-dd"),
    entries: Array(7)
      .fill(null)
      .map((_, index) => ({
        dayIndex: index,
        duration: "",
        description: "",
      })),
  })

  // Fetch user's hourly rate and organization tax rate
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Fetch hourly rate
        const hourlyRateResponse = await fetch("/api/user/hourly-rate")
        if (hourlyRateResponse.ok) {
          const hourlyRateData = await hourlyRateResponse.json()
          setFormData((prev) => ({
            ...prev,
            hourlyRate: hourlyRateData.currentRate.toString(),
          }))
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
    const hourlyRate = Number.parseFloat(formData.hourlyRate) || 0
    const subtotal = totalHours * hourlyRate
    const calculatedTaxAmount = subtotal * (organizationTaxRate / 100)
    const calculatedTotalEarnings = subtotal + calculatedTaxAmount

    setTaxAmount(calculatedTaxAmount)
    setTotalEarnings(calculatedTotalEarnings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.entries, formData.hourlyRate, organizationTaxRate])

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = parseISO(e.target.value)
    // Normalize selected date to Monday (start of week)
    const mondayDate = startOfWeek(selectedDate, { weekStartsOn: 1 })
    const normalizedDateString = format(mondayDate, "yyyy-MM-dd")

    // Only update the week starting date and name.
    // Do NOT reset daily entries so that any existing values are preserved.
    setFormData((prev) => ({
      ...prev,
      weekStarting: normalizedDateString,
      name: `Week of ${format(mondayDate, "MMM d, yyyy")}`,
    }))
  }

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      hourlyRate: e.target.value,
    }))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }

  const handleGenerateDescription = async () => {
    // Placeholder implementation - UI hook only
    setIsGenerating(true)
    // TODO: Implement description generation logic
    setTimeout(() => {
      setIsGenerating(false)
      toast.info("Description generation will be implemented soon")
    }, 1000)
  }

  const handleDurationChange = (dayIndex: number, value: string) => {
    const newEntries = [...formData.entries]
    newEntries[dayIndex] = {
      ...newEntries[dayIndex],
      duration: value,
    }
    setFormData((prev) => ({
      ...prev,
      entries: newEntries,
    }))

    // Validate hours
    validateHours(dayIndex, value)
  }

  const validateHours = (dayIndex: number, value: string) => {
    const hours = Number.parseFloat(value)
    const errors = { ...validationErrors }

    if (hours > 24) {
      errors[`day-${dayIndex}`] = "Hours cannot exceed 24 per day"
    } else if (hours > 12) {
      errors[`day-${dayIndex}`] = "Warning: Hours exceed 12 per day"
    } else {
      delete errors[`day-${dayIndex}`]
    }

    setValidationErrors(errors)
  }

  const getTotalHours = () => {
    return formData.entries.reduce((total, entry) => {
      return total + (Number.parseFloat(entry.duration) || 0)
    }, 0)
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    // Check for excessive hours
    formData.entries.forEach((entry, index) => {
      const hours = Number.parseFloat(entry.duration)
      if (hours > 24) {
        errors[`day-${index}`] = "Hours cannot exceed 24 per day"
      }
    })

    // Check for excessive total hours
    const totalHours = getTotalHours()
    if (totalHours > 168) {
      // 24 * 7 = 168 (max possible hours in a week)
      errors.total = "Total hours cannot exceed 168 per week"
    } else if (totalHours > 80) {
      errors.total = "Warning: Total hours exceed 80 per week"
    }

    setValidationErrors(errors)
    return Object.keys(errors).filter((key) => errors[key].includes("cannot")).length === 0
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
      const validEntries = formData.entries.filter((entry) => Number.parseFloat(entry.duration) > 0)

      // Prepare timesheet data
      const startDate = parseISO(formData.weekStarting)
      const endDate = addDays(startDate, 6)

      const timesheetData = {
        name: formData.name,
        description: formData.description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        hourlyRate: Number.parseFloat(formData.hourlyRate) || 0,
        entries: validEntries.map((entry) => {
          const entryDate = addDays(startDate, entry.dayIndex)
          return {
            // Daily descriptions are no longer captured on the form.
            // Preserve the field in the payload but send an empty string.
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

  // Day names for display
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <div>
      <PageHeader
        title="Log Time"
        description="Record your working hours for the week"
        action={
          <Link href="/dashboard/timesheets">
            <Button variant="outline">Cancel</Button>
          </Link>
        }
      />

      <DashboardCard title="Weekly Timesheet">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weekStarting">Week Starting (Monday)</Label>
              <DatePickerDemo
                name="weekStarting"
                id="weekStarting"
                value={formData.weekStarting}
                onChange={handleWeekChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                type="number"
                id="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleHourlyRateChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={isLoadingRate}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Weekly Description </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="General description of work performed this week"
              rows={3}
            />
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="mt-1 flex items-center gap-2"
              >
                {isGenerating ? (
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
          </div>

          {/* Organization Tax Rate Display */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <Percent className="h-4 w-4 text-gray-500 mr-2" />
              <Label className="font-medium">Organization Tax Rate</Label>
            </div>
            {isLoadingTaxRate ? (
              <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
            ) : (
              <div className="text-sm text-gray-600">
                All timesheet entries are subject to a {organizationTaxRate}% tax rate as set by your organization.
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Daily Hours</h3>

            {validationErrors.total && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationErrors.total}</AlertDescription>
              </Alert>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">Day</th>
                    <th className="text-left py-2 px-4 border-b">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.entries.map((entry, index) => {
                    const date = addDays(parseISO(formData.weekStarting), index)
                    const hasError = validationErrors[`day-${index}`]
                    const isErrorSevere = hasError && hasError.includes("cannot")

                    return (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{dayNames[index]}</div>
                          <div className="text-sm text-gray-500">{format(date, "MMM d, yyyy")}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <Input
                              type="number"
                              value={entry.duration}
                              onChange={(e) => handleDurationChange(index, e.target.value)}
                              min="0"
                              max="24"
                              step="0.5"
                              className={`w-24 ${isErrorSevere ? "border-red-500" : hasError ? "border-yellow-500" : ""}`}
                              placeholder="0"
                            />
                            {hasError && (
                              <div className={`text-xs ${isErrorSevere ? "text-red-500" : "text-yellow-500"}`}>
                                {validationErrors[`day-${index}`]}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-medium">Total</td>
                    <td className="py-3 px-4 font-medium">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <span>{getTotalHours()} hrs</span>
                        <div className="space-y-1 text-right">
                          <div className="flex justify-between text-sm gap-4">
                            <span>Subtotal:</span>
                            <span>
                              $
                              {(getTotalHours() * Number.parseFloat(formData.hourlyRate || "0")).toFixed(
                                2,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm gap-4">
                            <span>Tax ({organizationTaxRate}%):</span>
                            <span>${taxAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium pt-1 border-t border-gray-200 gap-4">
                            <span>Total Earnings:</span>
                            <span className="text-green-600">${totalEarnings.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
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
