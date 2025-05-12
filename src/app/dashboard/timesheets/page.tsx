"use client"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { Plus, Clock, FileText, Download } from "lucide-react"
import { toast } from "react-toastify"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { TimesheetListResponse } from "@/types/timesheet"

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState<TimesheetListResponse["timesheets"]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // const router = useRouter()

  useEffect(() => {
    fetchTimesheets()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]) // Add currentPage as a dependency

  const fetchTimesheets = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/timesheets?page=${currentPage}&limit=10`)
      if (!response.ok) throw new Error("Failed to fetch timesheets")

      const data = (await response.json()) as TimesheetListResponse
      setTimesheets(data.timesheets)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error("Error fetching timesheets:", error)
      toast.error("Failed to load timesheets")
    } finally {
      setIsLoading(false)
    }
  }

  // const getStatusBadgeClass = (status: string) => {
  //   switch (status.toUpperCase()) {
  //     case "ACCEPTED":
  //       return "bg-green-100 text-green-800"
  //     case "SUBMITTED":
  //       return "bg-blue-100 text-blue-800"
  //     case "REJECTED":
  //       return "bg-red-100 text-red-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = format(parseISO(startDate), "MMM d, yyyy")
    if (!endDate) return start
    const end = format(parseISO(endDate), "MMM d, yyyy")
    return `${start} - ${end}`
  }

  return (
    <div>
      <PageHeader
        title="Timesheets"
        description="Track and manage your working hours"
        action={
          <Link href="/dashboard/timesheets/create">
            <Button className="inline-flex items-center bg-teal-600 hover:bg-teal-700">
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Timesheet
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <DashboardCard title="Current Week">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-green-50 p-3 text-green-600">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Hours Logged This Week</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">
                    {isLoading ? <Skeleton className="h-6 w-20" /> : "0 / 40"}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-medium text-gray-500">Progress</h4>
              <span className="text-xs font-medium text-gray-900">
                {isLoading ? <Skeleton className="h-4 w-8" /> : "0%"}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: isLoading ? "0%" : "0%" }} />
            </div>
          </div>
          <div className="mt-6 ">
            <Link href="/dashboard/timesheets/create">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Log Hours</Button>
            </Link>
          </div>
        </DashboardCard>

        <DashboardCard title="Monthly Summary" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Total Hours (This Month)</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {isLoading ? <Skeleton className="h-8 w-16" /> : "0"}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Avg. Hours/Week</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {isLoading ? <Skeleton className="h-8 w-16" /> : "0"}
              </p>
            </div>
            {/* <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">Pending Approval</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {isLoading ? <Skeleton className="h-8 w-16" /> : "0"}
              </p>
            </div> */}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard
        title="Recent Timesheets"
        action={
          <Link href="/dashboard/timesheets/export" className="text-sm font-medium text-green-600 hover:text-green-500">
            Export All
          </Link>
        }
      >
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        ) : timesheets.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No timesheets</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new timesheet.</p>
            <div className="mt-6">
              <Link href="/dashboard/timesheets/create">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Timesheet
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Week
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Hours
                  </th>
                  {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th> */}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timesheets.map((timesheet) => (
                  <tr key={timesheet.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {formatDateRange(timesheet.startDate, timesheet.endDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {timesheet._count?.entries || 0} entries
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          timesheet.status,
                        )}`}
                      >
                        {timesheet.status}
                      </span>
                    </td> */}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/dashboard/timesheets/${timesheet.id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/api/timesheets/export/${timesheet.id}?format=pdf`}
                          className="text-gray-600 hover:text-gray-900"
                          target="_blank"
                        >
                          <Download className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <Button
                    variant="outline"
                    className="rounded-l-md bg-teal-500"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-r-md"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}