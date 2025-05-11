"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { AlertTriangle, Loader2, Upload } from "lucide-react"
import { toast } from "react-toastify"
import { useAuthStore } from "@/lib/store/authStore"
import type { User } from "@/types/dashboard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@radix-ui/react-dropdown-menu"

interface ProfileSettingsProps {
    setIsLoading: (loading: boolean) => void
}

export default function ProfileSettings({ setIsLoading }: ProfileSettingsProps) {
    const [user, setUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    })
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const { logout } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("/api/users/me")
                if (!response.ok) throw new Error("Failed to fetch user data")

                const userData = await response.json()
                setUser(userData)
                setFormData({
                    firstName: userData.firstName || "",
                    lastName: userData.lastName || "",
                    email: userData.email || "",
                    phoneNumber: userData.phoneNumber || "",
                })

                if (userData.profileImage) {
                    setProfileImagePreview(userData.profileImage)
                }
            } catch (error) {
                console.error("Error fetching user data:", error)
                toast.error("Failed to load user profile data")
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [setIsLoading])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setProfileImage(file)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("firstName", formData.firstName)
            formDataToSend.append("lastName", formData.lastName)
            formDataToSend.append("email", formData.email)
            formDataToSend.append("phoneNumber", formData.phoneNumber || "")

            if (profileImage) {
                formDataToSend.append("profileImage", profileImage)
            }

            const response = await fetch("/api/users/profile", {
                method: "PUT",
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error("Failed to update profile")
            }

            const updatedUser = await response.json()
            setUser(updatedUser)

            toast.success("Your profile has been updated successfully")

            router.refresh()
        } catch (error) {
            console.error("Error updating profile:", error)
            toast.error("Failed to update profile")
        } finally {
            setIsSubmitting(false)
            setIsLoading(false)
        }
    }


    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== "DELETE") {
            toast.error("Please type DELETE to confirm account deletion")
            return
        }

        setIsDeleting(true)
        setIsLoading(true)

        try {
            const response = await fetch("/api/users/delete-account", {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete account")
            }

            // Log the user out
            await logout()

            toast.success("Your account has been deleted successfully")

            // Redirect to the home page
            router.push("/")
        } catch (error) {
            console.error("Error deleting account:", error)
            toast.error("Failed to delete account")
        } finally {
            setIsDeleting(false)
            setIsLoading(false)
            setDeleteDialogOpen(false)
        }
    }

    const getInitials = () => {
        if (formData.firstName && formData.lastName) {
            return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase()
        }
        return user?.email?.substring(0, 2).toUpperCase() || "U"
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and how others see you on the platform</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={profileImagePreview || ""} alt={`${formData.firstName} ${formData.lastName}`} />
                                    <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-1">
                                    <Label htmlFor="profileImage" className="cursor-pointer">
                                        <Upload className="h-4 w-4 text-white" />
                                    </Label>
                                    <Input
                                        id="profileImage"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full space-y-2">
                                <p className="text-sm font-medium">Profile Photo</p>
                                <p className="text-sm text-muted-foreground">
                                    Upload a new profile photo. Recommended size: 256x256px.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john.doe@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber || ""}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                   <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                <DialogDescription>
                  This action is permanent and cannot be undone. All your data will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Warning</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>Deleting your account will permanently remove all your data, including:</p>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Personal profile information</li>
                          <li>All budgets and budget categories</li>
                          <li>All expenses and expense records</li>
                          <li>Organization data (if you are the owner)</li>
                          <li>Timesheet records</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="deleteConfirmation" className="text-sm font-medium">
                    To confirm, type <span className="font-bold">DELETE</span> in the field below:
                  </Label>
                  <Input
                    id="deleteConfirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="border-red-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmation !== "DELETE"}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
            </CardFooter>
        </Card>
    )
}
