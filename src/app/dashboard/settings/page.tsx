"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import ProfileSettings from "./components/profile-settings"
import OrganizationSettings from "./components/organization-settings"
import SecuritySettings from "./components/security-question"
import NotificationSettings from "./components/notification-settings"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        title="Settings"
        description="Manage your account and organization settings"
        action={
          <Button variant="outline" onClick={() => router.push("/dashboard")} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Back to Dashboard"
            )}
          </Button>
        }
      />

      <div className="mt-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="profile">
              <ProfileSettings setIsLoading={setIsLoading} />
            </TabsContent>
            <TabsContent value="organization">
              <OrganizationSettings setIsLoading={setIsLoading} />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings setIsLoading={setIsLoading} />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings setIsLoading={setIsLoading} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
