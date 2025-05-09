"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Loader2, Bell, Mail, MessageSquare, CreditCard, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "react-toastify"

interface NotificationSettingsProps {
  setIsLoading: (loading: boolean) => void
}

interface NotificationPreference {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  email: boolean
  push: boolean
}

export default function NotificationSettings({ setIsLoading }: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "budget-alerts",
      title: "Budget Alerts",
      description: "Get notified when you're approaching budget limits",
      icon: <Bell className="h-4 w-4" />,
      email: true,
      push: true,
    },
    {
      id: "expense-approvals",
      title: "Expense Approvals",
      description: "Notifications for expense approval requests and status changes",
      icon: <CreditCard className="h-4 w-4" />,
      email: true,
      push: false,
    },
    {
      id: "system-updates",
      title: "System Updates",
      description: "Important announcements and system updates",
      icon: <Mail className="h-4 w-4" />,
      email: true,
      push: false,
    },
    {
      id: "team-messages",
      title: "Team Messages",
      description: "Messages and mentions from your team members",
      icon: <MessageSquare className="h-4 w-4" />,
      email: false,
      push: true,
    },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = (id: string, channel: "email" | "push") => {
    setPreferences(preferences.map((pref) => (pref.id === id ? { ...pref, [channel]: !pref[channel] } : pref)))
  }

  const handleSavePreferences = async () => {
    setIsSubmitting(true)
    setIsLoading(true)

    try {
      // In a real implementation, you would save these preferences to the database
      // const response = await fetch("/api/users/notification-preferences", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ preferences }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Your notification preferences have been saved")
    } catch (error) {
      console.error("Error saving notification preferences:", error)
      toast.error("Failed to save notification preferences")
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            Notification preferences will be fully implemented in a future update. The UI below is a preview.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium">
            <div>Notification Type</div>
            <div className="text-center">Email</div>
            <div className="text-center">Push</div>
          </div>

          <div className="divide-y">
            {preferences.map((pref) => (
              <div key={pref.id} className="grid grid-cols-3 gap-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">{pref.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{pref.title}</p>
                    <p className="text-xs text-muted-foreground">{pref.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Switch checked={pref.email} onCheckedChange={() => handleToggle(pref.id, "email")} />
                </div>
                <div className="flex items-center justify-center">
                  <Switch checked={pref.push} onCheckedChange={() => handleToggle(pref.id, "push")} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSavePreferences} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
