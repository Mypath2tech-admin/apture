"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import { AlertCircle, UserPlus, Search, RefreshCw, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { useOrganizationUsers } from "@/lib/hooks/use-organization-users"

export default function OrganizationUsers() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
  // console.log("uses", user)

  const [searchTerm, setSearchTerm] = useState("")
  const [updatingPermission, setUpdatingPermission] = useState<string | null>(null)

  // Use the organization users hook
  const { data: users = [], isLoading: isLoadingUsers, error: usersError, refetch } = useOrganizationUsers()

  // Check if user is authorized to access this page
  const isAuthorized =
    user?.role === "ADMIN" || user?.role === "ORGANIZATION_ADMIN" || user?.role === "ORGANIZATION_MEMBER"
  const hasOrganization = !!user?.organization?.id

  // Toggle dashboard access permission
  const toggleDashboardAccess = async (userId: string, currentValue: boolean) => {
    setUpdatingPermission(userId)

    try {
      const response = await fetch("/api/organization/users/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          canViewOrgDashboard: !currentValue,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update permission")
      }

      const data = await response.json()

      // Refetch the users to get updated data
      refetch()

      toast.success(data.message || "Permission updated successfully")
    } catch (err) {
      console.error("Error updating permission:", err)
      toast.error(err instanceof Error ? err.message : "Failed to update permission")
    } finally {
      setUpdatingPermission(null)
    }
  }

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Format role for display
  const formatRole = (role: string) => {
    return role.replace("ORGANIZATION_", "").replace("_", " ")
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!authLoading && !isAuthenticated) {
    router.push("/signin")
    return null
  }

  // If not authorized or doesn't have an organization, show message
  if (!isAuthorized || !hasOrganization) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            {!hasOrganization
              ? "You need to create or join an organization to access this feature."
              : "You don't have permission to view organization users."}
          </AlertDescription>
        </Alert>

        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Organization Users"
        description="Manage users in your organization"
        action={
          <Link
            href="/dashboard/users/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        }
      />

      {usersError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {usersError instanceof Error ? usersError.message : "Failed to load organization users"}
          </AlertDescription>
        </Alert>
      )}

      <DashboardCard title="Team Members">
        <div className="mb-4 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
          </div>

          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>

        {isLoadingUsers ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchTerm ? "No users match your search" : "No users found in your organization"}
            </p>
            {!searchTerm && (
              <Link
                href="/dashboard/organization/users/add"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Your First User
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dashboard Access
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((orgUser) => (
                  <tr key={orgUser.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-800 font-medium">
                            {orgUser.firstName && orgUser.lastName
                              ? `${orgUser.firstName[0]}${orgUser.lastName[0]}`
                              : orgUser.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {orgUser.firstName && orgUser.lastName ? `${orgUser.firstName} ${orgUser.lastName}` : "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{orgUser.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                        {formatRole(orgUser.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${orgUser.isActive ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {orgUser.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Skip toggle for admins and org admins who already have access */}
                      {orgUser.role === "ORGANIZATION_ADMIN" || orgUser.role === "ADMIN" ? (
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-teal-600 mr-2" />
                          <span className="text-sm text-gray-500">Default Access</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {updatingPermission === orgUser.id ? (
                            <div className="animate-pulse h-5 w-10 bg-gray-200 rounded"></div>
                          ) : (
                            <Switch
                              checked={!!orgUser.canViewOrgDashboard}
                              onCheckedChange={() => toggleDashboardAccess(orgUser.id!, !!orgUser.canViewOrgDashboard)}
                              className="data-[state=checked]:bg-teal-600"
                            />
                          )}
                          <span className="ml-2 text-sm text-gray-500 flex items-center">
                            {orgUser.canViewOrgDashboard ? (
                              <>
                                <Eye className="h-4 w-4 text-teal-600 mr-1" /> Can view
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 text-gray-400 mr-1" /> No access
                              </>
                            )}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/organization/users/${orgUser.id}`}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
