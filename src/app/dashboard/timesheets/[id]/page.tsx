"use client"

import { useState, useEffect, useRef } from "react"
import {useParams, useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Edit, Trash2, AlertTriangle, } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { TimesheetResponse } from "@/types/timesheet"

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
                    
                    const data = await response.json() as TimesheetResponse
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
        
        // Cleanup function to handle component unmounting
        return () => {
            // No cleanup needed
        }
    }, [params.id]) // Only re-run if ID changes

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
        const start = format(parseISO(startDate), "MMMM d, yyyy")
        if (!endDate) return start
        const end = format(parseISO(endDate), "MMMM d, yyyy")
        return `${start} - ${end}`
    }

    // Group entries by day of week - memoize computation to reduce re-renders
    const getEntriesByDay = () => {
        if (!timesheet) return []

        return Array(7)
            .fill(null)
            .map((_, i) => {
                // Calculate the date for this day of the week
                const dayDate = new Date(timesheet.startDate)
                dayDate.setDate(dayDate.getDate() + i)
                const dayFormatted = format(dayDate, "yyyy-MM-dd")

                // Find entries for this day
                const dayEntries = timesheet.entries.filter(
                    (entry) => format(new Date(entry.startTime), "yyyy-MM-dd") === dayFormatted,
                )

                // Calculate total duration for this day
                const totalDuration = dayEntries.reduce((sum, entry) => sum + entry.duration, 0)

                // Combine descriptions if multiple entries
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

    // Pre-compute these values to avoid repeated calculations in render
    const entriesByDay = timesheet ? getEntriesByDay() : []
    const totalDuration = timesheet ? getTotalDuration() : 0

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
                        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">Timesheet Not Found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The timesheet you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
                        </p>
                    </div>
                </DashboardCard>
            </div>
        )
    }

    return (
        <div>
            <PageHeader
                title={timesheet.name}
                description={formatDateRange(timesheet.startDate, timesheet.endDate)}
                action={
                    <div className="flex space-x-2">
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
                <DashboardCard className="md:col-span-2" title={""} >
                    {/* <div className={`flex items-center p-4 mb-6 border rounded-md ${getStatusClass(timesheet.status)}`}>
                        {getStatusIcon(timesheet.status)}
                        <span className="ml-2 font-medium">{getStatusText(timesheet.status)}</span>
                    </div> */}

                    {timesheet.description && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Description</h3>
                            <p className="text-gray-700">{timesheet.description}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-lg font-medium mb-4">Time Entries</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left py-2 px-4 border-b">Day</th>
                                        <th className="text-left py-2 px-4 border-b">Hours</th>
                                        <th className="text-left py-2 px-4 border-b">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entriesByDay.map((dayData, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{dayData.day}</div>
                                                <div className="text-sm text-gray-500">{format(dayData.date, "MMM d, yyyy")}</div>
                                            </td>
                                            <td className="py-3 px-4">{dayData.duration}</td>
                                            <td className="py-3 px-4">{dayData.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-50 font-medium">
                                        <td className="py-3 px-4">Total</td>
                                        <td className="py-3 px-4">{totalDuration} hrs</td>
                                        <td className="py-3 px-4"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </DashboardCard>

                <DashboardCard title={""} >
                    <h3 className="text-lg font-medium mb-4">Summary</h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Total Hours</h4>
                            <p className="text-xl font-semibold">{totalDuration}</p>
                        </div>

                        {/* <div className="pt-4 border-t">
                            <h4 className="text-sm font-medium text-gray-500">Status</h4>
                            <div className="flex items-center mt-1">
                                {getStatusIcon(timesheet.status)}
                                <span className="ml-2">{timesheet.status}</span>
                            </div>
                        </div> */}

                        {timesheet.user && (
                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-medium text-gray-500">Submitted By</h4>
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