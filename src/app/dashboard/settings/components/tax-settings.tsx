"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from 'lucide-react'
import { toast } from "react-toastify"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TaxSettingsProps {
  setIsLoading: (loading: boolean) => void
}

export default function TaxSettings({ setIsLoading }: TaxSettingsProps) {
  const [taxRate, setTaxRate] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const fetchTaxRate = async () => {
      setIsLoading(true)
      try {
        // Fetch user data to check if admin
        const userResponse = await fetch("/api/users/me")
        if (!userResponse.ok) throw new Error("Failed to fetch user data")

        const userData = await userResponse.json()
        setIsAdmin(userData.role === "ADMIN" || userData.role === "ORGANIZATION_ADMIN")

        // Fetch organization tax rate
        const taxResponse = await fetch("/api/organization/tax-rate")
        if (!taxResponse.ok) throw new Error("Failed to fetch tax rate")

        const taxData = await taxResponse.json()
        setTaxRate(taxData.taxRate)
      } catch (error) {
        console.error("Error fetching tax rate:", error)
        toast.error("Failed to load tax rate")
      } finally {
        setIsLoading(false)
        setInitialLoad(false)
      }
    }

    fetchTaxRate()
  }, [setIsLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAdmin) {
      toast.error("Only administrators can update tax settings")
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)

    try {
      const response = await fetch("/api/organization/tax-rate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taxRate }),
      })

      if (!response.ok) {
        throw new Error("Failed to update tax rate")
      }

      const data = await response.json()
      console.log(data)
      toast.success("Tax rate updated successfully")
    } catch (error) {
      console.error("Error updating tax rate:", error)
      toast.error("Failed to update tax rate")
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  if (initialLoad) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
          <CardDescription>Configure organization-wide tax rate for timesheets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
          <CardDescription>Configure organization-wide tax rate for timesheets</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>Only administrators can modify tax settings.</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Label htmlFor="current-tax-rate">Current Organization Tax Rate</Label>
            <div className="mt-1 flex items-center">
              <Input
                id="current-tax-rate"
                type="text"
                value={`${taxRate}%`}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Settings</CardTitle>
        <CardDescription>Configure organization-wide tax rate for timesheets</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tax-rate">Organization Tax Rate (%)</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                This tax rate will be applied to all timesheet entries across your organization.
              </p>
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
                "Save Tax Rate"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
