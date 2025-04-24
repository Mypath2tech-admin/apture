import { toast } from "react-toastify"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    role: string
    organizationId: string | null
    profileImage?: string | null
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    // Actions
    login: (email: string, password: string) => Promise<void>
    register: (userData: RegisterData) => Promise<void>
    logout: () => Promise<void>
    verifySession: () => Promise<void>
    fetchUserDetails: () => Promise<void>
    clearError: () => void
}

interface RegisterData {
    firstName: string
    lastName: string
    email: string
    password: string
    organizationName?:string
    organizationPhone?:number
    OrganizationEmail?:string
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    })

                    if (!response.ok) {
                        const errorData = await response.json()
                        throw new Error(errorData.error || "Failed to login")
                    }

                    const userData = await response.json()
                    set({
                        user: userData,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "An unknown error occurred",
                        isLoading: false,
                    })
                }
            },

            register: async (userData: RegisterData) => {
                set({ isLoading: true, error: null })
                try {
                    console.log(userData)
                    const response = await fetch("/api/auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    })

                

                    const newUser = await response.json()
                    set({ isLoading: false })
                    console.log("This is new user", newUser)
                    if(response.ok){
                    toast.success("Successfuly Registered, Check your email to proceed")
                }
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "An unknown error occurred",
                        isLoading: false,
                    })
                    toast.error(`Failed to register ${error}`)
                 
                }
            },

            logout: async () => {
                set({ isLoading: true })
                try {
                    await fetch("/api/auth/logout", {
                        method: "POST",
                    })

                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    })
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to logout",
                        isLoading: false,
                    })
                }
            },

            verifySession: async () => {
                set({ isLoading: true })
                try {
                    const response = await fetch("/api/auth/verify-session")

                    if (!response.ok) {
                        // If session is invalid, clear user data
                        set({
                            user: null,
                            isAuthenticated: false,
                            isLoading: false,
                        })
                        return
                    }

                    const userData = await response.json()
                    set({
                        user: userData,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                } catch (error) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    })
                    console.log(error)
                }
            },

            fetchUserDetails: async () => {
                if (!get().isAuthenticated) return

                set({ isLoading: true })
                try {
                    const response = await fetch("/api/users/me")

                    if (!response.ok) {
                        throw new Error("Failed to fetch user details")
                    }

                    const userData = await response.json()
                    set({
                        user: userData,
                        isLoading: false,
                    })
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch user details",
                        isLoading: false,
                    })
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: "auth-storage",
            // Only persist non-sensitive data
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
)
