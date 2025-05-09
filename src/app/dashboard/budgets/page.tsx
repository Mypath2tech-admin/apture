"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  PlusCircle,
  Search,
  DollarSign,
  ArrowUpRight,
  Download,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface Budget {
  id: string
  name: string
  amount: number
  spent: number
  remaining: number
  progress: number
  startDate: string
  endDate?: string
  description?: string
  categories?: { id: string; name: string }[]
  createdBy?: { name: string; email: string }
  organization?: { name: string }
  canEdit?: boolean
}

export default function Budgets() {
  const router = useRouter()
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [viewType, setViewType] = useState<string>("all")

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/budget")
        if (!res.ok) throw new Error("Failed to fetch budgets")
        const data = await res.json()
        setBudgets(data)
        setFilteredBudgets(data)
      } catch (error) {
        console.error("Error fetching budgets:", error)
        toast.error("Failed to load budgets.")
      } finally {
        setLoading(false)
      }
    }

    fetchBudgets()
  }, [])

  useEffect(() => {
    // Filter and sort budgets
    let result = [...budgets]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (budget) =>
          budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          budget.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply view type filter
    if (viewType === "active") {
      result = result.filter((budget) => budget.progress < 100)
    } else if (viewType === "completed") {
      result = result.filter((budget) => budget.progress >= 100)
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    } else if (sortBy === "highest") {
      result.sort((a, b) => b.amount - a.amount)
    } else if (sortBy === "lowest") {
      result.sort((a, b) => a.amount - b.amount)
    } else if (sortBy === "progress") {
      result.sort((a, b) => b.progress - a.progress)
    }

    setFilteredBudgets(result)
  }, [budgets, searchQuery, sortBy, viewType])



  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      try {
        const res = await fetch(`/api/budget/${id}`, {
          method: "DELETE",
        })

        if (!res.ok) throw new Error("Failed to delete budget")

        setBudgets(budgets.filter((budget) => budget.id !== id))
        toast.success("Budget deleted successfully")
      } catch (error) {
        console.error("Error deleting budget:", error)
        toast.error("Failed to delete budget")
      }
    }
  }

  return (
    <div className="space-y-6 ">
      <PageHeader
        title="Budgets"
        description="Manage and track your financial allocations"
        action={
          <Button onClick={() => router.push("/dashboard/budgets/create")} className="bg-teal-600 hover:bg-teal-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Budget
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search budgets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setViewType}>
            <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select defaultValue="newest" onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Amount</SelectItem>
              <SelectItem value="lowest">Lowest Amount</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>


        <Link href="budgets/export">
           <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          </Link>
       
        </div>
      </div>

      <div ></div>
      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-4 w-full mt-6" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredBudgets.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No budgets found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search or filters" : "Create your first budget to get started"}
            </p>
            <Button
              onClick={() => router.push("/dashboard/budgets/create")}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 overflow-y-scroll">
          {filteredBudgets.map((budget) => (
            <Card key={budget.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">{budget.name}</CardTitle>
                    {budget.description && (
                      <CardDescription className="mt-1 line-clamp-1">{budget.description}</CardDescription>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/budgets/${budget.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {budget.canEdit !== false && (
                        <>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/budgets/${budget.id}/edit`)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Budget
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(budget.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {budget.organization && (
                  <Badge variant="outline" className="mt-2">
                    {budget.organization.name}
                  </Badge>
                )}
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
                  <div>
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">Total Budget</h4>
                    <p className="mt-1 text-2xl font-bold text-teal-600">{formatCurrency(budget.amount)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">Spent</h4>
                    <p className="mt-1 text-2xl font-bold">{formatCurrency(budget.spent)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">Remaining</h4>
                    <p className="mt-1 text-2xl font-bold">{formatCurrency(budget.remaining)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">
                      {budget.endDate ? "Period" : "Created"}
                    </h4>
                    <p className="mt-1 text-sm">
                      {budget.endDate ? (
                        <>
                          {new Date(budget.startDate).toLocaleDateString()} -{" "}
                          {new Date(budget.endDate).toLocaleDateString()}
                        </>
                      ) : (
                        new Date(budget.startDate).toLocaleDateString()
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Budget Utilization</span>
                    <span className="text-sm font-medium">{budget.progress}%</span>
                  </div>
                  <Progress
                    value={budget.progress}
                    className="h-2"

                  />
                </div>

                {budget.categories && budget.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {budget.categories.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-0 pb-4">
                <div className="flex justify-between items-center w-full">
                  {budget.createdBy && (
                    <span className="text-xs text-muted-foreground">
                      Created by {budget.createdBy.name || budget.createdBy.email}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-600 hover:text-teal-700 cursor-pointer hover:bg-teal-50"
                    onClick={() => router.push(`/dashboard/budgets/${budget.id}`)}
                  >
                    View Details
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
