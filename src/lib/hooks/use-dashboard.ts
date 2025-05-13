"use client"

import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { DashboardData } from "@/types/dashboard"

// Query keys
export const dashboardKeys = {
  all: ["dashboard"] as const,
  lists: () => [...dashboardKeys.all, "list"] as const,
  list: (view: string) => [...dashboardKeys.lists(), view] as const,
}

// Fetch functions
const fetchDashboardData = async (
  view: "personal" | "organization" = "organization",
): Promise<{ dashboardData: DashboardData }> => {
  const res = await fetch(`/api/dashboard?view=${view}`)

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    const errorMessage = errorData.error || "Failed to fetch dashboard data"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }

  return res.json()
}

// Hooks
export function useDashboardData(view: "personal" | "organization" = "organization") {
  return useQuery({
    queryKey: dashboardKeys.list(view),
    queryFn: () => fetchDashboardData(view),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
