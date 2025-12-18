"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { format, parseISO, addDays } from "date-fns"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import type { TimesheetResponse, TimesheetFormData } from "@/types/timesheet"

export default function EditTimesheetPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timesheet, setTimesheet] = useState<TimesheetResponse | null>(null)
  

  const [formData, setFormData] = useState<TimesheetFormData>({
    name: "",
    description: "",
    hourlyRate: "",
    weekStarting: "",
    entries: [],
  })

  useEffect(() => {

    const fetchTimesheet = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/timesheets/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch timesheet")

        const data = (await response.json()) as TimesheetResponse
        setTimesheet(data)

        // Group entries by day
        const startDate = new Date(data.startDate)
        const entries = Array(7)
          .fill(null)
          .map((_, index) => {
            const dayDate = addDays(startDate, index)
            const dayFormatted = format(dayDate, "yyyy-MM-dd")

            // Find entries for this day
            const dayEntries = data.entries.filter(
              (entry) => format(new Date(entry.startTime), "yyyy-MM-dd") === dayFormatted,
            )

            // Calculate total duration for this day
            const totalDuration = dayEntries.reduce((sum, entry) => sum + entry.duration, 0)

            // Combine descriptions if multiple entries
            const description = dayEntries.map((e) => e.description).join("; ")

            return {
              dayIndex: index,
              duration: totalDuration.toString(),
              description: description,
            }
          })

        setFormData({
          name: data.name,
          description: data.description || "",
          hourlyRate: "",
          weekStarting: format(new Date(data.startDate), "yyyy-MM-dd"),
          entries,
        })
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



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const validEntries = formData.entries
        .filter((entry) => Number.parseFloat(entry.duration) > 0)
        .map((entry) => {
          const entryDate = addDays(parseISO(formData.weekStarting), entry.dayIndex)
          return {
            description: entry.description,
            startTime: entryDate.toISOString(),
            endTime: entryDate.toISOString(),
            duration: Number.parseFloat(entry.duration) || 0,
          }
        })

      // Prepare timesheet data
      const timesheetData = {
        name: formData.name,
        description: formData.description,
        // status: timesheet?.status || "DRAFT",
        entries: validEntries,
      }

      // Submit timesheet
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

  // Day names for display
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <DashboardCard title={""} >
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
        <DashboardCard title={""} >
          <div className="text-center py-8">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Timesheet Not Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The timesheet you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to edit it.
            </p>
          </div>
        </DashboardCard>
      </div>
    )
  }

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

      <DashboardCard title={""} >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Timesheet Name</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="General description of work performed"
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
                    {/* <th className="text-left py-2 px-4 border-b">Description</th> */}
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
                "Update Timesheet"
              )}
            </Button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
