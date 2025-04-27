"use client"
import { useState } from "react"
import { DollarSign, TrendingUp, Users, Clock } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardStats, { StatItem } from "@/components/dashboard/DashboardStats"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/authStore"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
    const { 
        fetchDashboardData, 
        fetchUserDetails, 
        isAuthenticated, 
        isLoading, 
        dashboardData, 
        user 
    } = useAuthStore()
    const [hasFetched, setHasFetched] = useState(false)
    
    const router = useRouter()
    useEffect(() => {
        // Handle redirect if not authenticated
        if (!isAuthenticated && !isLoading) {
            router.push("/signin")
            return
        }

        // Only fetch data once after authentication is confirmed
        if (isAuthenticated && !isLoading && !hasFetched) {
            // Mark that we've started fetching to prevent additional fetches
            setHasFetched(true)
            
            // Fetch data
            if (!user) {
                fetchUserDetails()
            }
            fetchDashboardData()
        }
    }, [
        isAuthenticated, 
        isLoading, 
        hasFetched, 
        user, 
        fetchUserDetails, 
        fetchDashboardData, 
        router
    ])

    // Show loading state
    if (isLoading || !dashboardData) {
        return <DashboardSkeleton />
    }

    const isOrgAdmin = user?.role === "ORGANIZATION_ADMIN" || user?.role === "ADMIN" || user?.role === "ORGANIZATION_MEMBER"

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description={`Welcome back! ${user?.firstName} Here's an overview of your finances.`}
                action={
                    <Link
                        href="/dashboard/budgets/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Budget
                    </Link>
                }
            />

            <DashboardStats className="mb-6">
                <StatItem
                    title="Total Budget"
                    value={`$${dashboardData.totalBudget.toFixed(2)}`}
                    icon={<DollarSign className="h-6 w-6" />}
                    change={dashboardData.budgetChange}
                />
                <StatItem
                    title="Total Expenses"
                    value={`$${dashboardData.totalExpenses.toFixed(2)}`}
                    icon={<TrendingUp className="h-6 w-6" />}
                    change={dashboardData.expenseChange}
                />
                <StatItem
                    title="Timesheet Hours"
                    value={dashboardData.timesheetHours.toString()}
                    icon={<Clock className="h-6 w-6" />}
                    change={dashboardData.timesheetChange}
                />
                {isOrgAdmin && (
                    <StatItem
                        title="Team Members"
                        value={dashboardData.teamMembers.toString()}
                        icon={<Users className="h-6 w-6" />}
                    />
                )}
            </DashboardStats>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DashboardCard
                    title="Recent Budgets"
                    action={
                        <Link href="/dashboard/budgets" className="text-sm font-medium text-green-600 hover:text-green-500">
                            View all
                        </Link>
                    }
                >
                    {dashboardData.recentBudgets.length === 0 ? (
                        <EmptyState message="No budgets found" actionLink="/dashboard/budgets/create" actionText="Create Budget" />
                    ) : (
                        <div className="space-y-4">
                            {dashboardData.recentBudgets.map((budget) => (
                                <div key={budget.id} className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{budget.name}</h4>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <span className="text-sm text-gray-500">
                                                {budget.spent} of {budget.amount}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${budget.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </DashboardCard>

                <DashboardCard
                    title="Recent Expenses"
                    action={
                        <Link href="/dashboard/expenses" className="text-sm font-medium text-green-600 hover:text-green-500">
                            View all
                        </Link>
                    }
                >
                    {dashboardData.recentExpenses.length === 0 ? (
                        <EmptyState message="No expenses found" actionLink="/dashboard/expenses/create" actionText="Add Expense" />
                    ) : (
                        <div className="space-y-4">
                            {dashboardData.recentExpenses.map((expense) => (
                                <div key={expense.id} className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{expense.name}</h4>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {expense.category}
                                            </span>
                                            <span className="text-sm text-gray-500">{expense.date}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{expense.amount}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </DashboardCard>
            </div>
        </div>
    )
}

// Helper components remain unchanged
function DashboardSkeleton() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-lg" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-64 rounded-lg" />
                <Skeleton className="h-64 rounded-lg" />
            </div>
        </div>
    )
}

function EmptyState({
    message,
    actionLink,
    actionText,
}: {
    message: string
    actionLink: string
    actionText: string
}) {
    return (
        <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-gray-500 mb-4">{message}</p>
            <Link
                href={actionLink}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                {actionText}
            </Link>
        </div>
    )
}