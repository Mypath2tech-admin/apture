"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from 'lucide-react'
import { toast } from "react-toastify"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/store/authStore"
import { useOrganizationDetails } from "@/lib/hooks/use-organization-users"
interface TaxSettingsProps {
  setIsLoading: (loading: boolean) => void
}

export default function TaxSettings({ setIsLoading }: TaxSettingsProps) {
  const [taxRate, setTaxRate] = useState<number>(0)
  const [inputValue, setInputValue] = useState("0");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: organization, isLoading } = useOrganizationDetails()
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuthStore()
  useEffect(() => {
    setIsAdmin(user?.role === "ADMIN" || user?.role === "ORGANIZATION_ADMIN")
    if (organization) {
      setInputValue(organization.organization.tax_rate )
      // console.log("org", organization.organization.tax_rate )
    }
    

  }, [user, organization])

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

  if (isLoading) {
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
            <div className="mt-1 flex md:w-1/4 items-center">
              <Input
                id="current-tax-rate"
                type="text"
                value={`${taxRate}%`}
                disabled
                className="bg-gray-50  "
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
              <div className="mt-1 relative rounded-md shadow-sm md:w-1/4 ">
                <Input
                  id="tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={inputValue}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Allow empty string temporarily
                    if (value === "") {
                      setInputValue("");
                      return;
                    }

                    // Remove leading zeros unless it's "0." for decimals
                    value = value.replace(/^0+(?=\d)/, "");

                    // Allow only valid numbers (up to 2 decimals)
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      setInputValue(value);
                      const parsed = parseFloat(value);
                      if (!isNaN(parsed)) {
                        setTaxRate(parsed);
                      }
                    }
                  }}

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
