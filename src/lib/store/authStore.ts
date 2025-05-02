import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserRole } from "../../../generated/prisma"

interface User {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    username: string | null
    role: UserRole
    profileImage: string | null
    phoneNumber: string | null
    organization: {
        id: string
        name: string
        logo: string | null
    } | null
    createdAt: string
    canViewOrgDashboard? : boolean
    organizationId?: string
}

interface DashboardData {
    totalBudget: number
    totalExpenses: number
    timesheetHours: number
    teamMembers: number
    budgetChange: {
        value: string
        isPositive: boolean
    }
    expenseChange: {
        value: string
        isPositive: boolean
    }
    timesheetChange: {
        value: string
        isPositive: boolean
    }
    recentBudgets: Array<{
        id: string
        name: string
        amount: string
        spent: string
        progress: number
    }>
    recentExpenses: Array<{
        id: string
        name: string
        amount: string
        date: string
        category: string
    }>
}

interface AuthState {
    user: User | null
    dashboardData: DashboardData | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (userData: RegisterData) => Promise<void>
    fetchUserDetails: () => Promise<void>
    fetchDashboardData: () => Promise<void>
    checkAuthStatus: () => Promise<boolean>
}

interface RegisterData {
    email: string
    password: string
    firstName?: string
    lastName?: string
    username?: string
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            dashboardData: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,



            login: async (email, password) => {
                try {
                    set({ isLoading: true, error: null })
                    const res = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    })

                    if (!res.ok) {
                        const err = await res.json()
                        throw new Error(err.error || "Login failed")
                    }

                    const data = await res.json()
                    set({ isAuthenticated: true, user: data.user })
                    await get().fetchDashboardData()
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : "Login failed" })
                } finally {
                    set({ isLoading: false })
                }
            },
            checkAuthStatus: async () => {
                try {
                    set({ isLoading: true })
                    await get().fetchUserDetails()
                    const isAuthenticated = get().isAuthenticated
                    if (isAuthenticated) {
                        await get().fetchDashboardData()
                    }
                    return isAuthenticated
                } catch (error) {
                    console.error("Auth check error:", error)
                    set({ isAuthenticated: false, user: null })
                    return false
                } finally {
                    set({ isLoading: false })
                }
            }
            ,
            logout: async () => {
                try {
                    set({ isLoading: true })
                    await fetch("/api/auth/logout", { method: "POST" })
                    set({ isAuthenticated: false, user: null, dashboardData: null })
                } catch (error) {
                    console.error("Logout error:", error)
                } finally {
                    set({ isLoading: false })
                }
            },

            register: async (userData) => {
                try {
                    set({ isLoading: true, error: null })
                    const res = await fetch("/api/auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    })

                    if (!res.ok) {
                        const err = await res.json()
                        throw new Error(err.error || "Registration failed")
                    }

                    const data = await res.json()
                    set({ isAuthenticated: true, user: data.user })
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : "Registration failed" })
                } finally {
                    set({ isLoading: false })
                }
            },

            fetchUserDetails: async () => {
                try {
                    set({ isLoading: true, error: null })
                    const res = await fetch("/api/users/me")
                    if (!res.ok) {
                        if (res.status === 401) {
                            set({ isAuthenticated: false, user: null })
                            return
                        }
                        throw new Error("Failed to fetch user details")
                    }

                    const data = await res.json()
                    set({ isAuthenticated: true, user: data })
                } catch (err) {
                    console.error("Fetch user details error:", err)
                    set({ error: err instanceof Error ? err.message : "Failed to fetch user details" })
                } finally {
                    set({ isLoading: false })
                }
            },

            fetchDashboardData: async () => {
                try {
                    set({ isLoading: true, error: null })
                    const res = await fetch("/api/dashboard")
                    if (!res.ok) throw new Error("Failed to fetch dashboard data")

                    const data = await res.json()
                    set({
                        dashboardData: data.dashboardData,
                        user: data.user,
                        isAuthenticated: true,
                    })
                } catch (err) {
                    console.error("Fetch dashboard data error:", err)
                } finally {
                    set({ isLoading: false })
                }
            },
        }),
        {
            name: "auth-store", // key in localStorage
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)