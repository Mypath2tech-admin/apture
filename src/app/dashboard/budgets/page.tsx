import { Plus } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"

export default function Budgets() {
  // This would come from your API in a real app
  const budgets = [
    {
      id: "1",
      name: "Q2 Marketing",
      amount: "$5,000.00",
      spent: "$2,340.00",
      remaining: "$2,660.00",
      progress: 47,
      startDate: "2023-04-01",
      endDate: "2023-06-30",
    },
    {
      id: "2",
      name: "Office Supplies",
      amount: "$1,200.00",
      spent: "$750.00",
      remaining: "$450.00",
      progress: 63,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
    {
      id: "3",
      name: "Development Tools",
      amount: "$3,600.00",
      spent: "$1,800.00",
      remaining: "$1,800.00",
      progress: 50,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
    {
      id: "4",
      name: "Team Building",
      amount: "$2,400.00",
      spent: "$600.00",
      remaining: "$1,800.00",
      progress: 25,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
  ]

  return (
    <div>
      <PageHeader
        title="Budgets"
        description="Manage and track your budgets"
        action={
          <Link
            href="/dashboard/budgets/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create Budget
          </Link>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6">
        {budgets.map((budget) => (
          <DashboardCard
            key={budget.id}
            title={budget.name}
            action={
              <Link
                href={`/dashboard/budgets/${budget.id}`}
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                View Details
              </Link>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Total Budget</h4>
                <p className="mt-1 text-xl font-semibold text-gray-900">{budget.amount}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Spent</h4>
                <p className="mt-1 text-xl font-semibold text-gray-900">{budget.spent}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Remaining</h4>
                <p className="mt-1 text-xl font-semibold text-gray-900">{budget.remaining}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium uppercase text-gray-500">Period</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {budget.startDate} to {budget.endDate}
                </p>
              </div>
              <div className="md:col-span-4 mt-2">
                <div className="flex items-center">
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${budget.progress}%` }} />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">{budget.progress}%</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  )
}
