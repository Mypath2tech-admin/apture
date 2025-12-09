"use client"

import { useQuery } from "@tanstack/react-query"
import type { TimesheetListResponse } from "@/types/timesheet"

// Query keys
export const timesheetKeys = {
  all: ["timesheets"] as const,
  lists: () => [...timesheetKeys.all, "list"] as const,
  list: (page: number, limit: number) => [...timesheetKeys.lists(), { page, limit }] as const,
  details: () => [...timesheetKeys.all, "detail"] as const,
  detail: (id: string) => [...timesheetKeys.details(), id] as const,
  stats: () => [...timesheetKeys.all, "stats"] as const,
}

// Fetch functions
const fetchTimesheets = async (page = 1, limit = 10): Promise<TimesheetListResponse> => {
  const response = await fetch(`/api/timesheets?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error("Failed to fetch timesheets")
  return response.json()
}

const fetchTimesheet = async (id: string) => {
  const response = await fetch(`/api/timesheets/${id}`)
  if (!response.ok) throw new Error("Failed to fetch timesheet")
  return response.json()
}

const fetchTimesheetStats = async () => {
  const response = await fetch(`/api/timesheets/stats`)
  if (!response.ok) throw new Error("Failed to fetch timesheet statistics")
  return response.json()
}

// Hooks
export function useTimesheets(page = 1, limit = 10) {
  return useQuery({
    queryKey: timesheetKeys.list(page, limit),
    queryFn: () => fetchTimesheets(page, limit),
  })
}

export function useTimesheet(id: string) {
  return useQuery({
    queryKey: timesheetKeys.detail(id),
    queryFn: () => fetchTimesheet(id),
    enabled: !!id, // Only run if id is provided
  })
}

export function useTimesheetStats() {
  return useQuery({
    queryKey: timesheetKeys.stats(),
    queryFn: fetchTimesheetStats,
  })
}
