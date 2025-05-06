"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Budget } from "@/types/dashboard"

export default function EditBudget() {
  const params = useParams()
  const router = useRouter()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    const fetchBudget = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/budget/${params.id}`)
        if (!res.ok) throw new Error("Failed to fetch budget")

        const data = await res.json()
        setBudget(data)

        // Format dates for input fields (YYYY-MM-DD)
        const startDate = new Date(data.startDate).toISOString().split("T")[0]
        const endDate = data.endDate ? new Date(data.endDate).toISOString().split("T")[0] : ""

        setFormData({
          name: data.name,
          description: data.description || "",
          amount: data.amount.toString(),
          startDate,
          endDate,
        })
      } catch (error) {
        console.error("Failed to fetch budget:", error)
        setError("Failed to load budget. Please try again.")
        toast.error("Failed to load budget.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchBudget()
    }
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error("Budget name is required")
      }

      if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
        throw new Error("Please enter a valid amount")
      }

      if (!formData.startDate) {
        throw new Error("Start date is required")
      }

      const response = await fetch(`/api/budget/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          amount: Number(formData.amount),
          startDate: formData.startDate,
          endDate: formData.endDate || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update budget")
      }

      toast.success("Budget updated successfully")
      router.push(`/dashboard/budgets/${params.id}`)
    } catch (err) {
      console.error("Error updating budget:", err)
      setError(err instanceof Error ? err.message : "Failed to update budget")
      toast.error(err instanceof Error ? err.message : "Failed to update budget")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (error && !budget) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Error Loading Budget</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <div className="mt-6">
          <Link
            href="/dashboard/budgets"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Back to Budgets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Edit Budget"
        description="Update your budget details"
        action={
          <Link
            href={`/dashboard/budgets/${params.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back
          </Link>
        }
      />

      <DashboardCard  title="Edit Budget">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-2">
              <Label htmlFor="name">Budget Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1" required />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-7"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link href={`/dashboard/budgets/${params.id}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
