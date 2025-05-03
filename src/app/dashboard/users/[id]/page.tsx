"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import { AlertCircle, ArrowLeft, UserCheck, UserMinus, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { OrganizationUser } from "@/types/organizations"

export default function UserDetail() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser, isAuthenticated, isLoading } = useAuthStore()

  const [user, setUser] = useState<OrganizationUser | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [showPromoteDialog, setShowPromoteDialog] = useState(false)
  const [showDemoteDialog, setShowDemoteDialog] = useState(false)

  // Check if user is authorized to access this page
  const isAuthorized = currentUser?.role === "ADMIN" || currentUser?.role === "ORGANIZATION_ADMIN"
  const hasOrganization = !!currentUser?.organization?.id
  console.log(currentUser)

  // Fetch user details
  useEffect(() => {
    if (!isLoading && isAuthenticated && isAuthorized && hasOrganization && params.id) {
      const fetchUser = async () => {
        setIsLoadingUser(true)
        setError(null)

        try {
          const response = await fetch(`/api/organization/users/${params.id}`)

          if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error || "Failed to fetch user")
          }

          const data = await response.json()
          setUser(data)
        } catch (err) {
          console.error("Error fetching user:", err)
          setError(err instanceof Error ? err.message : "Failed to load user")
          toast.error(err instanceof Error ? err.message : "Failed to load user")
        } finally {
          setIsLoadingUser(false)
        }
      }

      fetchUser()
    }
  }, [isLoading, isAuthenticated, isAuthorized, hasOrganization, params.id])





  // Toggle dashboard access permission
  const toggleDashboardAccess = async () => {
    if (!user) return

    setIsUpdating(true)

    try {
      const response = await fetch("/api/organization/users/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          canViewOrgDashboard: !user.canViewOrgDashboard,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update permission")
      }

      const data = await response.json()
      setUser({ ...user, canViewOrgDashboard: !user.canViewOrgDashboard })
      toast.success(data.message || "Permission updated successfully")
    } catch (err) {
      console.error("Error updating permission:", err)
      toast.error(err instanceof Error ? err.message : "Failed to update permission")
    } finally {
      setIsUpdating(false)
    }
  }

  // Promote user to organization admin
  const promoteUser = async () => {
    if (!user) return

    setIsUpdating(true)
    setShowPromoteDialog(false)

    try {
      const response = await fetch(`/api/organization/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "ORGANIZATION_ADMIN",
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to promote user")
      }

      const data = await response.json()
      setUser({ ...user, role: "ORGANIZATION_ADMIN" })
      toast.success(data.message || "User promoted to organization admin")
    } catch (err) {
      console.error("Error promoting user:", err)
      toast.error(err instanceof Error ? err.message : "Failed to promote user")
    } finally {
      setIsUpdating(false)
    }
  }

  // Demote user to organization member
  const demoteUser = async () => {
    if (!user) return

    setIsUpdating(true)
    setShowDemoteDialog(false)

    try {
      const response = await fetch(`/api/organization/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "ORGANIZATION_MEMBER",
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to demote user")
      }

      const data = await response.json()
      setUser({ ...user, role: "ORGANIZATION_MEMBER" })
      toast.success(data.message || "User demoted to organization member")
    } catch (err) {
      console.error("Error demoting user:", err)
      toast.error(err instanceof Error ? err.message : "Failed to demote user")
    } finally {
      setIsUpdating(false)
    }
  }

  // Remove user from organization
  const removeUser = async () => {
    if (!user) return

    setIsUpdating(true)
    setShowRemoveDialog(false)

    try {
      const response = await fetch(`/api/organization/users/${user.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to remove user")
      }

      const data = await response.json()
      toast.success(data.message || "User removed from organization")
      router.push("/dashboard/organization/users")
    } catch (err) {
      console.error("Error removing user:", err)
      toast.error(err instanceof Error ? err.message : "Failed to remove user")
    } finally {
      setIsUpdating(false)
    }
  }

  // Format role for display
  const formatRole = (role: string) => {
    return role.replace("ORGANIZATION_", "").replace("_", " ")
  }

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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Show loading state while fetching user
  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "User not found"}</AlertDescription>
        </Alert>

        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard/users"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="User Details"
        description="View and manage user information"
        action={
          <Link
            href="/dashboard/organization/users"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="User Information">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl text-green-800 font-medium">
                  {user.firstName && user.lastName
                    ? `${user.firstName[0]}${user.lastName[0]}`
                    : user.email[0].toUpperCase()}
                </span>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "—"}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {formatRole(user.role)}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Joined</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Permissions & Access">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Dashboard Access</h4>
              <div className="mt-2 flex items-center">
                {user.role === "ORGANIZATION_ADMIN" || user.role === "ADMIN" ? (
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-500">Default Access (Admin)</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    {isUpdating ? (
                      <div className="animate-pulse h-5 w-10 bg-gray-200 rounded"></div>
                    ) : (
                      <Switch
                        checked={!!user.canViewOrgDashboard}
                        onCheckedChange={toggleDashboardAccess}
                        className="data-[state=checked]:bg-green-600"
                      />
                    )}
                    <span className="ml-2 text-sm text-gray-500 flex items-center">
                      {user.canViewOrgDashboard ? (
                        <>
                          <Eye className="h-4 w-4 text-green-600 mr-1" /> Can view organization dashboard
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4 text-gray-400 mr-1" /> No access to organization dashboard
                        </>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500">User Management</h4>
              <div className="mt-4 space-y-3">
                {user.role === "ORGANIZATION_MEMBER" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowPromoteDialog(true)}
                    disabled={isUpdating}
                  >
                    <UserCheck className="mr-2 h-4 w-4 text-green-600" />
                    Promote to Organization Admin
                  </Button>
                )}

                {user.role === "ORGANIZATION_ADMIN" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowDemoteDialog(true)}
                    disabled={isUpdating}
                  >
                    <UserCheck className="mr-2 h-4 w-4 text-yellow-600" />
                    Demote to Organization Member
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setShowRemoveDialog(true)}
                  disabled={isUpdating}
                >
                  <UserMinus className="mr-2 h-4 w-4" />
                  Remove from Organization
                </Button>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Promote Dialog */}
      <Dialog open={showPromoteDialog} onOpenChange={setShowPromoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote User</DialogTitle>
            <DialogDescription>
              Are you sure you want to promote {user.firstName || user.email} to Organization Admin? They will have
              access to all organization data and can manage other users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPromoteDialog(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={promoteUser} disabled={isUpdating}>
              {isUpdating ? "Promoting..." : "Promote User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Demote Dialog */}
      <Dialog open={showDemoteDialog} onOpenChange={setShowDemoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demote User</DialogTitle>
            <DialogDescription>
              Are you sure you want to demote {user.firstName || user.email} to Organization Member? They will lose
              access to organization management features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDemoteDialog(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={demoteUser} disabled={isUpdating}>
              {isUpdating ? "Demoting..." : "Demote User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove User</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {user.firstName || user.email} from your organization? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveDialog(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={removeUser} disabled={isUpdating}>
              {isUpdating ? "Removing..." : "Remove User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
