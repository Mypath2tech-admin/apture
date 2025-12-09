"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/store/authStore"
// import type { Organization } from "@/types/dashboard"
import { useOrganizationDetails } from "@/lib/hooks/use-organization-users"

interface OrganizationSettingsProps {
    setIsLoading: (loading: boolean) => void
}

export default function OrganizationSettings({ setIsLoading }: OrganizationSettingsProps) {
    const { data: organization, isLoading: isLoadingOrg, error: orgError } = useOrganizationDetails()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        // website: "",
        // description: "",
    })
    const [logo, setLogo] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuthStore()
    const router = useRouter()

    const isAdmin = user?.role === "ORGANIZATION_ADMIN"
    //  console.log("org names",organization)
    // Set form data when organization data is loaded
    useEffect(() => {
        if (organization) {
            setFormData({
                name: organization.organization.name || "",
                email: organization.organization.email || "",
                // website: organization.website || "",
                // description: organization.description || "",
            })

            if (organization.logo) {
                setLogoPreview(organization.logo)
            }
        }
    }, [organization])

    // Update the parent loading state when our query loading state changes
    useEffect(() => {
        setIsLoading(isLoadingOrg)
    }, [isLoadingOrg, setIsLoading])

    // Show error toast if there's an error fetching organization data
    useEffect(() => {
        if (orgError) {
            toast.error("Failed to load organization data")
            console.error("Error fetching organization data:", orgError)
        }
    }, [orgError])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setLogo(file)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAdmin) {
            toast.error("Only organization admins can update organization settings")
            return
        }

        setIsSubmitting(true)
        setIsLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("name", formData.name)
            formDataToSend.append("email", formData.email)
            // formDataToSend.append("website", formData.website || "")
            // formDataToSend.append("description", formData.description || "")

            if (logo) {
                formDataToSend.append("logo", logo)
            }

            const response = await fetch("/api/organization", {
                method: "PUT",
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error("Failed to update organization")
            }

            toast.success("Organization settings have been updated successfully")
            
            // Refresh the page to show updated data
            router.refresh()
        } catch (error) {
            console.error("Error updating organization:", error)
            toast.error("Failed to update organization settings")
        } finally {
            setIsSubmitting(false)
            setIsLoading(false)
        }
    }

    // Show loading state
    if (isLoadingOrg) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                    <CardDescription>Manage your organization&apos;s profile and settings</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </CardContent>
            </Card>
        )
    }

    // Show error state
    if (orgError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                    <CardDescription>Manage your organization&apos;s profile and settings</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Failed to load organization data. Please try again later.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    if (!isAdmin) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                    <CardDescription>Manage your organization&apos;s profile and settings</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Access Restricted</AlertTitle>
                        <AlertDescription>Only organization administrators can modify organization settings.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>Manage your organization&apos;s profile and settings</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={logoPreview || ""} alt={formData.name} />
                                    <AvatarFallback className="text-lg">
                                        {formData.name?.substring(0, 2).toUpperCase() || "ORG"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-1">
                                    <Label htmlFor="logo" className="cursor-pointer">
                                        <Upload className="h-4 w-4 text-white" />
                                    </Label>
                                    <Input id="logo" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                </div>
                            </div>
                            <div className="w-full space-y-2">
                                <p className="text-sm font-medium">Organization Logo</p>
                                <p className="text-sm text-muted-foreground">
                                    Upload your organization&apos;s logo. Recommended size: 256x256px.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Organization Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Acme Corporation"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Organization Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="contact@acmecorp.com"
                            />
                        </div>

                        {/* <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                value={formData.website || ""}
                                onChange={handleInputChange}
                                placeholder="https://www.acmecorp.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                placeholder="Brief description of your organization"
                                rows={4}
                            />
                        </div> */}
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
        </Card>
    )
}