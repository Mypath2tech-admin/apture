"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"
import DashboardCard from "@/components/dashboard/DashboardCard"
import PageHeader from "@/components/dashboard/PageHeader"
import { Eye, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DashboardData } from "@/types/dashboard"
import { DollarSign, TrendingUp, Users, Clock } from "lucide-react"
import { StatItem } from "@/components/dashboard/DashboardStats"
import DashboardStats from "@/components/dashboard/DashboardStats"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Dashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [viewType, setViewType] = useState<"personal" | "organization">("personal")
  const [error, setError] = useState<string | null>(null)

  // Check if user can view organization data
  const canViewOrgData =
    user?.role === "ADMIN" || user?.role === "ORGANIZATION_ADMIN" || user?.canViewOrgDashboard === true

  // Fetch dashboard data
  const fetchDashboardData = async (view: "personal" | "organization" = "personal") => {
    setIsLoadingData(true)
    setError(null)

    try {
      const response = await fetch(`/api/dashboard?view=${view}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to fetch dashboard data")
      }

      const data = await response.json()
      setDashboardData(data.dashboardData)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError(err instanceof Error ? err.message : "Failed to load dashboard data")
    } finally {
      setIsLoadingData(false)
    }
  }

  // Handle tab change
  const handleViewChange = (value: string) => {
    const newViewType = value as "personal" | "organization"
    setViewType(newViewType)
    fetchDashboardData(newViewType)
  }

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchDashboardData(viewType)
    }
  }, [isLoading, isAuthenticated, viewType])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isLoading && !isAuthenticated) {
    router.push("/signin")
    return null
  }

  // Generate welcome message based on user and organization
  const getWelcomeMessage = () => {
    const userName = user?.firstName || user?.email?.split("@")[0] || "User"

    if (user?.organization && viewType === "organization") {
      return `Welcome ${userName}, you are viewing ${user.organization.name} organization dashboard`
    } else if (user?.organization) {
      return `Welcome ${userName}, you are logged into ${user.organization.name} organization`
    } else {
      return `Welcome back, ${userName}`
    }
  }

  return (
    <div>
      <PageHeader title="Dashboard" description={getWelcomeMessage()} />

      {user?.organizationId && canViewOrgData && (
        <div className="mb-6">
          <Tabs defaultValue={viewType} onValueChange={handleViewChange}>
            <TabsList>
              <TabsTrigger value="personal" className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                Personal View
              </TabsTrigger>
              <TabsTrigger value="organization" className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                Organization View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {dashboardData?.shouldMaskFinancials && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm flex items-center">
          <Info className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>
            Financial details are masked for organization members. Contact your administrator if you need access to
            detailed financial information.
          </p>
        </div>
      )}

      {isLoadingData ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : dashboardData ? (
        <>
          <DashboardStats className="mb-6">
            <StatItem
              title="Total Budget"
              value={dashboardData.shouldMaskFinancials ? "******" : `$${dashboardData.totalBudget.toFixed(2)}`}
              icon={<DollarSign className="h-6 w-6" />}
              change={dashboardData.shouldMaskFinancials ? undefined : dashboardData.budgetChange}
            />
            <StatItem
              title="Total Expenses"
              value={dashboardData.shouldMaskFinancials ? "******" : `$${dashboardData.totalExpenses.toFixed(2)}`}
              icon={<TrendingUp className="h-6 w-6" />}
              change={dashboardData.shouldMaskFinancials ? undefined : dashboardData.expenseChange}
            />
            <StatItem
              title="Timesheet Hours"
              value={dashboardData.timesheetHours.toString()}
              icon={<Clock className="h-6 w-6" />}
              change={dashboardData.timesheetChange}
            />
            <StatItem
              title="Team Members"
              value={dashboardData.teamMembers.toString()}
              icon={<Users className="h-6 w-6" />}
            />
          </DashboardStats>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <DashboardCard title="Recent Budgets">
              {dashboardData.recentBudgets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No budgets found</p>
                  <Button
                    onClick={() => router.push("/dashboard/budgets/create")}
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Create Budget
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData.recentBudgets.map((budget) => (
                    <div key={budget.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{budget.name}</h4>
                        <div className="flex items-center mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${budget.progress > 90
                                  ? "bg-red-500"
                                  : budget.progress > 70
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                              style={{ width: `${Math.min(budget.progress, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{budget.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {budget.isMasked ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>{budget.amount}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Financial details are masked</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            budget.amount
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Spent: {budget.spent}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DashboardCard>

            <DashboardCard title="Recent Expenses">
              {dashboardData.recentExpenses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No expenses found</p>
                  <Button
                    onClick={() => router.push("/dashboard/expenses/create")}
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Add Expense
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData.recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{expense.name}</h4>
                        <div className="text-xs text-gray-500 mt-1">{expense.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {expense.isMasked ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>{expense.amount}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Financial details are masked</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            expense.amount
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{expense.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DashboardCard>
          </div>

          {dashboardData.viewingOrgData && dashboardData.organization && (
            <DashboardCard title="Organization Overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800">Organization</h4>
                  <p className="text-lg font-semibold mt-1">{dashboardData.organization.name}</p>
                  {dashboardData.organization.description && (
                    <p className="text-sm text-gray-600 mt-1">{dashboardData.organization.description}</p>
                  )}
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800">Team Size</h4>
                  <p className="text-lg font-semibold mt-1">{dashboardData.organization.memberCount} members</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {dashboardData.organization.totalBudgets} budgets · {dashboardData.organization.totalExpenses}{" "}
                    expenses
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800">Contact</h4>
                  <p className="text-sm mt-1">{dashboardData.organization.email || "No email provided"}</p>
                  <p className="text-sm mt-1">{dashboardData.organization.website || "No website provided"}</p>
                </div>
              </div>
            </DashboardCard>
          )}
        </>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => fetchDashboardData(viewType)} className="mt-4 bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
        </div>
      ) : null}
    </div>
  )
}
