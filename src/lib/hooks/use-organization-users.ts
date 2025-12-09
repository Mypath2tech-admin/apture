"use client"

import { useQuery } from "@tanstack/react-query"
import type { OrganizationUser } from "@/types/organizations"
// Query keys
export const organizationUsersKeys = {
    all: ["organizationUsers"] as const,
}
export const organizationUsers = {
    all: ["organizationDetails"] as const,
}

// Fetch function
const fetchOrganizationUsers = async (): Promise<OrganizationUser[]> => {
    const res = await fetch("/api/organization/users")

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to fetch organization users")
    }

    return res.json()
}

const fetchOrganization = async () => {
    const res = await fetch(`/api/users/me`)

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to fetch organization users")
    }

    return res.json()
}

export function useOrganizationDetails (){
    return useQuery({
     queryKey: organizationUsers.all,
     queryFn: fetchOrganization
    })
}

// Hook
export function useOrganizationUsers() {
    return useQuery({
        queryKey: organizationUsersKeys.all,
        queryFn: fetchOrganizationUsers,
        refetchOnWindowFocus: false,
    })
}
