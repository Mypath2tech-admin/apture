"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
import { User, Mail, Phone, Building, Upload, Lock, AlertCircle } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import Image from "next/image"
// import { useAuthStore } from "@/lib/store/authStore"
interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profileImage: string | null
  role: string
  organization?: {
    id: string
    name: string
    email?: string
    logo?: string
    website?: string
  } | null
}

interface AppError extends Error {
  code?: string;
  stack?: string;
}
export default function Profile() {
  // const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const orgLogoInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSavingOrg, setIsSavingOrg] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [orgLogoPreview, setOrgLogoPreview] = useState<string | null>(null)
  // const {user} = useAuthStore()
  const [isAdmin, setIsAdmin] = useState("")


  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [passwordErrors, setPasswordErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [orgInfo, setOrgInfo] = useState({
    name: "",
    email: "",

  })

  // console.log(user)
  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/users/me")
        if (!response.ok) throw new Error("Failed to fetch profile")

        const data = await response.json()
        // setProfile(user)
        setPersonalInfo({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          phoneNumber: data?.phoneNumber || "",
        })
        setIsAdmin(data.role)
        // console.log("Role",data.role)
        // console.log("Admin",isAdmin)
         

        if (data.organization) {
          setOrgInfo({
            name: data?.organization.name || "",
            email: data?.organization.email || "",

          })
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        // toast({
        //   title: "Error",
        //   description: "Failed to load profile data. Please try again.",
        //   variant: "destructive",
        // })
        toast.error("Failed to load profile data. Please try again.")
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [isAdmin])
   console.log("Admin2",isAdmin)

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword((prev) => ({ ...prev, [name]: value }))

    // Clear errors when typing
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleOrgInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrgInfo((prev) => ({ ...prev, [name]: value }))
  }

  const validatePasswordForm = () => {
    const errors = {
      current: "",
      new: "",
      confirm: "",
    }
    let isValid = true

    if (!password.current) {
      errors.current = "Current password is required"
      isValid = false
    }

    if (!password.new) {
      errors.new = "New password is required"
      isValid = false
    } else if (password.new.length < 8) {
      errors.new = "Password must be at least 8 characters"
      isValid = false
    }

    if (!password.confirm) {
      errors.confirm = "Please confirm your new password"
      isValid = false
    } else if (password.new !== password.confirm) {
      errors.confirm = "Passwords do not match"
      isValid = false
    }

    setPasswordErrors(errors)
    return isValid
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleOrgLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setOrgLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Prepare form data for file upload
      const formData = new FormData()
      formData.append("firstName", personalInfo.firstName)
      formData.append("lastName", personalInfo.lastName)
      formData.append("email", personalInfo.email)
      formData.append("phoneNumber", personalInfo.phoneNumber)

      // Add profile image if changed
      if (fileInputRef.current?.files?.[0]) {
        formData.append("profileImage", fileInputRef.current.files[0])
      }

      const response = await fetch("/api/users/profile", {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)


      toast.success("Your profile has been updated successfully.")
    } catch (error) {
      console.error("Error updating profile:", error)

      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswordForm()) return

    setIsChangingPassword(true)

    try {
      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to change password")
      }

      // Reset password form
      setPassword({
        current: "",
        new: "",
        confirm: "",
      })


      toast.success("Your password has been changed successfully.")
    } catch (error: unknown) {
      console.error("Error changing password:", error)
      const err = error as AppError;
      if (err.message.includes("current password")) {
        setPasswordErrors((prev) => ({
          ...prev,
          current: "Current password is incorrect",
        }))
      } else {

        toast.error("Failed to change password. Please try again")
      }
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingOrg(true)

    try {
      // Prepare form data for file upload
      const formData = new FormData()
      formData.append("name", orgInfo.name)
      formData.append("email", orgInfo.email)
      // formData.append("website", orgInfo.website)

      // Add organization logo if changed
      if (orgLogoInputRef.current?.files?.[0]) {
        formData.append("logo", orgLogoInputRef.current.files[0])
      }

      const response = await fetch("/api/organization", {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update organization")
      }

      const updatedOrg = await response.json()
      setProfile((prev) =>
        prev
          ? {
            ...prev,
            organization: updatedOrg,
          }
          : null,
      )


      toast.success("Organization information updated successfully")
    } catch (error) {
      console.error("Error updating organization:", error)

      toast.error("Failed to update organization information. Please try again.")
    } finally {
      setIsSavingOrg(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account settings" />

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <DashboardCard title="Personal Information">
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200">
                  {previewImage || profile?.profileImage ? (
                    <Image
                      src={previewImage || profile?.profileImage || "/placeholder.svg?height=96&width=96"}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfileImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                      placeholder="Your first name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={personalInfo.phoneNumber || ""}
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </DashboardCard>

          {isAdmin === "ORGANIZATION_ADMIN" && (
            
            <DashboardCard title="Organization Information">
              <form onSubmit={handleOrganizationSubmit} className="space-y-6">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden border-2 border-gray-200">
                    {orgLogoPreview || profile?.organization?.logo ? (
                      <Image
                        src={orgLogoPreview || profile?.organization?.logo || "/placeholder.svg?height=96&width=96"}
                        alt="Organization Logo"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                        <Building className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={orgLogoInputRef}
                      onChange={handleOrgLogoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => orgLogoInputRef.current?.click()}
                      className="flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change Logo
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="orgName"
                        name="name"
                        value={orgInfo.name}
                        onChange={handleOrgInfoChange}
                        className="pl-10"
                        placeholder="Organization name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgEmail">Organization Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="orgEmail"
                        name="email"
                        type="email"
                        value={orgInfo.email || ""}
                        onChange={handleOrgInfoChange}
                        className="pl-10"
                        placeholder="Organization email"
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={orgInfo.website || ""}
                      onChange={handleOrgInfoChange}
                      placeholder="https://yourcompany.com"
                    />
                  </div> */}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSavingOrg}>
                    {isSavingOrg ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Organization"
                    )}
                  </Button>
                </div>
              </form>
            </DashboardCard>
          )}
        </TabsContent>

        <TabsContent value="security">
          <DashboardCard title="Change Password">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="currentPassword"
                      name="current"
                      type="password"
                      value={password.current}
                      onChange={handlePasswordChange}
                      className={`pl-10 ${passwordErrors.current ? "border-red-500" : ""}`}
                    />
                    {passwordErrors.current && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {passwordErrors.current}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 top-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="newPassword"
                      name="new"
                      type="password"
                      value={password.new}
                      onChange={handlePasswordChange}
                      className={`pl-10 ${passwordErrors.new ? "border-red-500" : ""}`}
                    />
                    {passwordErrors.new ? (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {passwordErrors.new}
                      </div>
                    ) : (
                      <p className="text-xs absolute  text-gray-500 mt-1">Password must be at least 8 characters</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirm"
                      type="password"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      className={`pl-10 ${passwordErrors.confirm ? "border-red-500" : ""}`}
                    />
                    {passwordErrors.confirm && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {passwordErrors.confirm}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </form>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
