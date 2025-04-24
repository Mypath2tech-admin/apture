import { create } from "zustand"
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
}

interface RegisterData {
  email: string
  password: string
  firstName?: string
  lastName?: string
  username?: string
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  dashboardData: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const data = await response.json()
      set({ isAuthenticated: true, user: data.user })

      // Fetch dashboard data after successful login
      await get().fetchDashboardData()
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Login failed" })
    } finally {
      set({ isLoading: false })
    }
  },

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

  register: async (userData: RegisterData) => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Registration failed")
      }

      const data = await response.json()
      set({ isAuthenticated: true, user: data.user })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Registration failed" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchUserDetails: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch("/api/users/me")

      if (!response.ok) {
        if (response.status === 401) {
          set({ isAuthenticated: false, user: null })
          return
        }
        throw new Error("Failed to fetch user details")
      }

      const userData = await response.json()
      set({ isAuthenticated: true, user: userData })
    } catch (error) {
      console.error("Fetch user details error:", error)
      set({ error: error instanceof Error ? error.message : "Failed to fetch user details" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchDashboardData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch("/api/dashboard")

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const data = await response.json()
      set({
        dashboardData: data.dashboardData,
        user: data.user,
        isAuthenticated: true,
      })
    } catch (error) {
      console.error("Fetch dashboard data error:", error)
      set({ error: error instanceof Error ? error.message : "Failed to fetch dashboard data" })
    } finally {
      set({ isLoading: false })
    }
  },
}))
