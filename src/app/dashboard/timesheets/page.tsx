"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TimesheetListResponse } from "@/types/timesheet";
import {
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";
import { Clock, Download, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useOrganizationUsers } from "@/lib/hooks/use-organization-users";
import { useAuthStore } from "@/lib/store/authStore";

export default function TimesheetsPage() {
  const { data: organizationUsers = [], isLoading: isLoadingUsers } = useOrganizationUsers()
  const { user: currentUser } = useAuthStore()
  const isAdmin = currentUser?.role === "ADMIN" || currentUser?.role === "ORGANIZATION_ADMIN"
  const [selectedUserId, setSelectedUserId] = useState<string>("all")
  const [timesheets, setTimesheets] = useState<
    TimesheetListResponse["timesheets"]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    currentWeekHours: 0,
    totalMonthHours: 0,
    avgWeeklyHours: 0,
    weeklyGoal: 40,
  });

  useEffect(() => {
    fetchTimesheets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedUserId]); // Add selectedUserId as dependency

  const fetchTimesheets = async () => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "100",
      })
      
      // Add userId filter if admin and a specific user is selected
      if (isAdmin && selectedUserId && selectedUserId !== "all") {
        params.append("userId", selectedUserId)
      }

      // Fetch all timesheets for statistics calculation
      const response = await fetch(
        `/api/timesheets?${params.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch timesheets");

      const data = (await response.json()) as TimesheetListResponse;
      setTimesheets(data.timesheets);
      setTotalPages(data.pagination.pages);

      // Calculate statistics
      calculateStats(data.timesheets);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
      toast.error("Failed to load timesheets");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (
    timesheetData: TimesheetListResponse["timesheets"]
  ) => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday as week start
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    // const monthStart = startOfMonth(now)
    // const monthEnd = endOfMonth(now)

    let currentWeekHours = 0;
    let totalMonthHours = 0;
    const weeksWithEntries = new Set();

    // Process each timesheet
    timesheetData.forEach((timesheet) => {
      if (!timesheet.entries) return;

      const timesheetDate = parseISO(timesheet.startDate);
      const timesheetMonth = timesheetDate.getMonth();
      const timesheetYear = timesheetDate.getFullYear();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Get week number for this timesheet
      const weekNumber = format(timesheetDate, "w");

      // Calculate total hours for this timesheet
      const timesheetHours = timesheet.entries.reduce(
        (sum, entry) => sum + entry.duration,
        0
      );

      // Check if timesheet is in current week
      if (isWithinInterval(timesheetDate, { start: weekStart, end: weekEnd })) {
        currentWeekHours += timesheetHours;
      }

      // Check if timesheet is in current month
      if (timesheetMonth === currentMonth && timesheetYear === currentYear) {
        totalMonthHours += timesheetHours;
        weeksWithEntries.add(weekNumber);
      }
    });

    // Calculate average weekly hours
    const avgWeeklyHours =
      weeksWithEntries.size > 0 ? totalMonthHours / weeksWithEntries.size : 0;

    setStats({
      currentWeekHours,
      totalMonthHours,
      avgWeeklyHours,
      weeklyGoal: 40,
    });
  };

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const startParsed = parseISO(startDate);
    const start = format(startParsed, "MMM d, yyyy");
    
    if (!endDate) return start;
    
    const endParsed = parseISO(endDate);
    
    // If start and end are the same day, just show one date
    if (format(startParsed, "yyyy-MM-dd") === format(endParsed, "yyyy-MM-dd")) {
      return start;
    }
    
    // If same month and year, show compact format: "Jan 1-7, 2026"
    if (
      startParsed.getFullYear() === endParsed.getFullYear() &&
      startParsed.getMonth() === endParsed.getMonth()
    ) {
      return `${format(startParsed, "MMM d")}-${format(endParsed, "d, yyyy")}`;
    }
    
    // If same year but different months, show: "Jan 28 - Feb 3, 2026"
    if (startParsed.getFullYear() === endParsed.getFullYear()) {
      return `${format(startParsed, "MMM d")} - ${format(endParsed, "MMM d, yyyy")}`;
    }
    
    // Different years, show full format
    const end = format(endParsed, "MMM d, yyyy");
    return `${start} - ${end}`;
  };

  // Calculate total hours for a timesheet
  const calculateTotalHours = (
    timesheet: TimesheetListResponse["timesheets"][0]
  ) => {
    console.log(timesheet);
    if (!timesheet.entries || !timesheet.entries.length) return 0;
    return timesheet.entries.reduce((sum, entry) => sum + entry.duration, 0);
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.min(
      100,
      Math.round((stats.currentWeekHours / stats.weeklyGoal) * 100)
    );
  };

  return (
    <div>
      <PageHeader
        title="Timesheets"
        description={isAdmin ? "View and manage all organization timesheets" : "Track and manage your working hours"}
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
        <DashboardCard title={isAdmin && selectedUserId === "all" ? "Organization - Current Week" : "Current Week"}>
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-green-50 p-3 text-green-600">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {isAdmin && selectedUserId === "all" ? "Org Hours This Week" : "Hours Logged This Week"}
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">
                    {isLoading ? (
                      <Skeleton className="h-6 w-20" />
                    ) : (
                      `${stats.currentWeekHours.toFixed(1)} / ${
                        stats.weeklyGoal
                      }`
                    )}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-medium text-gray-500">Progress</h4>
              <span className="text-xs font-medium text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-4 w-8" />
                ) : (
                  `${calculateProgress()}%`
                )}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 rounded-full"
                style={{ width: isLoading ? "0%" : `${calculateProgress()}%` }}
              />
            </div>
          </div>
          <div className="mt-6 ">
            <Link href="/dashboard/timesheets/create">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Log Hours
              </Button>
            </Link>
          </div>
        </DashboardCard>

        <DashboardCard title={isAdmin && selectedUserId === "all" ? "Organization - Monthly Summary" : "Monthly Summary"} className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">
                {isAdmin && selectedUserId === "all" ? "Org Total Hours (This Month)" : "Total Hours (This Month)"}
              </h4>
              <div className="mt-1 text-2xl font-semibold text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  stats.totalMonthHours.toFixed(1)
                )}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500">
                Avg. Hours/Week
              </h4>
              <div className="mt-1 text-2xl font-semibold text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  stats.avgWeeklyHours.toFixed(1)
                )}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard
        title={isAdmin ? "All Timesheets" : "Recent Timesheets"}
        action={
          <Link
            href="/dashboard/timesheets/export"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Export 
          </Link>
        }
      >
        {/* User Filter for Admins */}
        {isAdmin && organizationUsers.length > 0 && (
          <div className="mb-4 space-y-2">
            <Label htmlFor="user-filter">Filter by User</Label>
            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              disabled={isLoadingUsers}
            >
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="All users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
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
          </div>
        )}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-b"
              >
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
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No timesheets
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new timesheet.
            </p>
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
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Period
                  </th>
                  {isAdmin && (
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      User
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Hours
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timesheets.map((timesheet) => {
                  const userName = timesheet.user?.firstName && timesheet.user?.lastName
                    ? `${timesheet.user.firstName} ${timesheet.user.lastName}`
                    : timesheet.user?.email || "Unknown User"
                  
                  return (
                    <tr key={timesheet.id}>
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="font-medium text-gray-900">{timesheet.name}</div>
                        <div className="text-gray-500">
                          {formatDateRange(timesheet.startDate, timesheet.endDate)}
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {userName}
                        </td>
                      )}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {calculateTotalHours(timesheet)} hrs
                      </td>
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
                  )
                })}
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
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page{" "}
                  <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <Button
                    variant="outline"
                    className="rounded-l-md"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-r-md"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
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
  );
}
