"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Loader2, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-toastify'
import PageHeader from "@/components/dashboard/PageHeader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Budget, ExpenseCategory } from "@/types/dashboard"
import { DatePickerDemo } from "@/components/ui/date-picker"

// Define interfaces for our component state
interface FormData {
  title: string
  description: string
  amount: string
  date: string
  budgetId: string
  categoryId: string
}

interface NewCategoryData {
  name: string
  description: string
}

export default function CreateExpensePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [filteredCategories, setFilteredCategories] = useState<ExpenseCategory[]>([])
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState<NewCategoryData>({
    name: "",
    description: "",
  })

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    budgetId: "",
    categoryId: "",
  })

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  // Fetch budgets and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch budgets
        const budgetsResponse = await fetch("/api/budget")
        if (!budgetsResponse.ok) {
          throw new Error("Failed to fetch budgets")
        }
        const budgetsData = await budgetsResponse.json()
        setBudgets(budgetsData)

        // Fetch categories
        const categoriesResponse = await fetch("/api/categories")
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories")
        }
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching data:", error)

        toast.error("Failed to load data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter categories based on selected budget
  useEffect(() => {
    if (formData.budgetId) {
      const filtered = categories.filter((category) => category.budgetId === formData.budgetId)
      setFilteredCategories(filtered)

      // Reset category selection if the current selection doesn't belong to the selected budget
      if (formData.categoryId && !filtered.some((cat) => cat.id === formData.categoryId)) {
        setFormData((prev) => ({ ...prev, categoryId: "" }))
      }
    } else {
      setFilteredCategories([])
      setFormData((prev) => ({ ...prev, categoryId: "" }))
    }
  }, [formData.budgetId, categories, formData.categoryId])

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user types
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormData]
        return newErrors
      })
    }
  }

  // Handle select changes
  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user selects
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!formData.amount) {
      errors.amount = "Amount is required"
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      errors.amount = "Amount must be a positive number"
    }

    if (!formData.date) {
      errors.date = "Date is required"
    }

    if (!formData.budgetId) {
      errors.budgetId = "Budget is required"
    }

    if (!formData.categoryId) {
      errors.categoryId = "Category is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          amount: Number(formData.amount),
          date: formData.date,
          budgetId: formData.budgetId,
          categoryId: formData.categoryId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create expense")
      }


      toast.success("Expense created successfully")

      // Redirect to expenses list
      router.push("/dashboard/expenses")
    } catch (error) {
      console.error("Error creating expense:", error)

      toast.error("Failed to create expense")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle creating a new category
  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault()

    if (!newCategory.name.trim()) {

      toast.error("Category name is required")
      return
    }

    if (!formData.budgetId) {

      toast.error("Please select a budget first")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory.name,
          description: newCategory.description,
          budgetId: formData.budgetId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create category")
      }

      const newCategoryData = await response.json()

      // Add the new category to the list and select it
      setCategories((prev) => [...prev, newCategoryData])
      setFormData((prev) => ({ ...prev, categoryId: newCategoryData.id }))

      // Reset the form and close the dialog
      setNewCategory({ name: "", description: "" })
      setIsCategoryDialogOpen(false)


      toast.success("Category created successfully")
    } catch (error) {
      console.error("Error creating category:", error)

      toast.error("Failed to create category")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Create Expense"
        description="Add a new expense to your budget"
        action={
          <Button variant="outline" onClick={() => router.push("/dashboard/expenses")}>
            Cancel
          </Button>
        }
      />

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Expense</CardTitle>
          <CardDescription>Enter the details of your expense</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className={formErrors.title ? "text-destructive" : ""}>
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Expense title"
                    className={formErrors.title ? "border-destructive" : ""}
                  />
                  {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Expense description"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="amount" className={formErrors.amount ? "text-destructive" : ""}>
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className={formErrors.amount ? "border-destructive" : ""}
                  />
                  {formErrors.amount && <p className="text-sm text-destructive">{formErrors.amount}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="date" className={formErrors.date ? "text-destructive" : ""}>
                    Date
                  </Label>
                  {/* <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={formErrors.date ? "border-destructive" : ""}
                  /> */}
                  <DatePickerDemo
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange} 
                  
                    />
                  {formErrors.date && <p className="text-sm text-destructive">{formErrors.date}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="budget" className={formErrors.budgetId ? "text-destructive" : ""}>
                    Budget
                  </Label>
                  <Select value={formData.budgetId} onValueChange={(value) => handleSelectChange("budgetId", value)}>
                    <SelectTrigger id="budget" className={formErrors.budgetId ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.length === 0 ? (
                        <SelectItem value="no-budgets" disabled>
                          No budgets available
                        </SelectItem>
                      ) : (
                        budgets.map((budget) => (
                          <SelectItem key={budget.id} value={budget.id}>
                            {budget.name} (${budget.remaining?.toFixed(2) || 0} remaining)
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formErrors.budgetId && <p className="text-sm text-destructive">{formErrors.budgetId}</p>}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="category" className={formErrors.categoryId ? "text-destructive" : ""}>
                      Category
                    </Label>
                    {formData.budgetId && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => setIsCategoryDialogOpen(true)}
                      >
                        <PlusCircle className="h-3.5 w-3.5 mr-1" />
                        Add Category
                      </Button>
                    )}
                  </div>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleSelectChange("categoryId", value)}
                    disabled={!formData.budgetId}
                  >
                    <SelectTrigger id="category" className={formErrors.categoryId ? "border-destructive" : ""}>
                      <SelectValue placeholder={formData.budgetId ? "Select a category" : "Select a budget first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {!formData.budgetId ? (
                        <SelectItem value="no-budget" disabled>
                          Select a budget first
                        </SelectItem>
                      ) : filteredCategories.length === 0 ? (
                        <SelectItem value="no-categories" disabled>
                          No categories available
                        </SelectItem>
                      ) : (
                        filteredCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formErrors.categoryId && <p className="text-sm text-destructive">{formErrors.categoryId}</p>}
                </div>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
  <Button variant="outline" onClick={() => router.push("/dashboard/expenses")}>
    Cancel
  </Button>
  <div className="flex gap-2">
    <Button 
      variant="secondary" 
      onClick={async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
          const response = await fetch("/api/expenses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: formData.title,
              description: formData.description,
              amount: Number(formData.amount),
              date: formData.date,
              budgetId: formData.budgetId,
              categoryId: formData.categoryId,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to create expense");
          }

          toast.success("Expense created successfully");
          
          // Reset form for new entry
          setFormData({
            title: "",
            description: "",
            amount: "",
            date: new Date().toISOString().split("T")[0],
            budgetId: formData.budgetId, // Keep the same budget
            categoryId: formData.categoryId, // Keep the same category
          });
        } catch (error) {
          console.error("Error creating expense:", error);
          toast.error("Failed to create expense");
        } finally {
          setIsSubmitting(false);
        }
      }}
      disabled={isSubmitting || isLoading}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save and create new"
      )}
    </Button>
    <Button 
      onClick={async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
          const response = await fetch("/api/expenses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: formData.title,
              description: formData.description,
              amount: Number(formData.amount),
              date: formData.date,
              budgetId: formData.budgetId,
              categoryId: formData.categoryId,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to create expense");
          }

          toast.success("Expense created successfully");
          
          // Redirect to expenses list
          router.push("/dashboard/expenses");
        } catch (error) {
          console.error("Error creating expense:", error);
          toast.error("Failed to create expense");
        } finally {
          setIsSubmitting(false);
        }
      }}
      disabled={isSubmitting || isLoading}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save and go back"
      )}
    </Button>
  </div>
</CardFooter>
      </Card>

      {/* Create Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>Add a new category to the selected budget.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCategory}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="categoryName">Name</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Category name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="categoryDescription">Description (optional)</Label>
                <Textarea
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Category description"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCategoryDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
