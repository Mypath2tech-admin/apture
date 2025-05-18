"use client"

import type React from "react"

import { useState } from "react"
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
import { Loader2 } from "lucide-react"
import type { TimesheetFormData } from "@/types/timesheet"
import { DatePickerDemo } from "@/components/ui/date-picker"

export default function CreateTimesheet() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeekStarting = e.target.value
    setFormData((prev) => ({
      ...prev,
      weekStarting: newWeekStarting,
      name: `Week of ${format(parseISO(newWeekStarting), "MMM d, yyyy")}`,
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
  }

  const handleDayDescriptionChange = (dayIndex: number, value: string) => {
    const newEntries = [...formData.entries]
    newEntries[dayIndex] = {
      ...newEntries[dayIndex],
      description: value,
    }
    setFormData((prev) => ({
      ...prev,
      entries: newEntries,
    }))
  }

  const getTotalHours = () => {
    return formData.entries.reduce((total, entry) => {
      return total + (Number.parseFloat(entry.duration) || 0)
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        // status: "DRAFT",
        entries: validEntries.map((entry) => {
          const entryDate = addDays(startDate, entry.dayIndex)
          return {
            description: entry.description,
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="weekStarting">Week Starting (Monday)</Label>

              {/* <Input type="date" id="weekStarting" value={formData.weekStarting} onChange={handleWeekChange} required /> */}
              <DatePickerDemo
                name="weekStarting"
                id="weekStarting"
                // required={formData.hasTimeframe}
                value={formData.weekStarting}
                onChange={handleWeekChange} />
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
              />
            </div>
              <div className="space-y-2">
              <Label htmlFor="hourlyRate">Organization Tax ($)</Label>
              <Input
                type="number"
                id="tax"
                value={formData.hourlyRate}
                onChange={handleHourlyRateChange}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Weekly Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="General description of work performed this week"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Daily Hours</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">Day</th>
                    <th className="text-left py-2 px-4 border-b">Hours</th>
                    <th className="text-left py-2 px-4 border-b">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.entries.map((entry, index) => {
                    const date = addDays(parseISO(formData.weekStarting), index)
                    return (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{dayNames[index]}</div>
                          <div className="text-sm text-gray-500">{format(date, "MMM d, yyyy")}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            value={entry.duration}
                            onChange={(e) => handleDurationChange(index, e.target.value)}
                            min="0"
                            max="24"
                            step="0.5"
                            className="w-24"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="text"
                            value={entry.description}
                            onChange={(e) => handleDayDescriptionChange(index, e.target.value)}
                            placeholder="What did you work on?"
                            className="w-full"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-medium">Total</td>
                    <td className="py-3 px-4 font-medium">{getTotalHours()} hrs</td>
                    <td className="py-3 px-4"></td>
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
