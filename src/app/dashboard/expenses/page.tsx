import { Plus, Filter } from "lucide-react"
import PageHeader from "@/components/dashboard/PageHeader"
import DashboardCard from "@/components/dashboard/DashboardCard"
import Link from "next/link"

export default function Expenses() {
  // This would come from your API in a real app
  const expenses = [
    {
      id: "1",
      name: "Office Rent",
      amount: "$2,000.00",
      date: "2023-05-01",
      category: "Facilities",
      budget: "Operations",
      status: "Approved",
    },
    {
      id: "2",
      name: "Software Licenses",
      amount: "$750.00",
      date: "2023-05-05",
      category: "Technology",
      budget: "Development Tools",
      status: "Pending",
    },
    {
      id: "3",
      name: "Team Lunch",
      amount: "$120.00",
      date: "2023-05-10",
      category: "Meals",
      budget: "Team Building",
      status: "Approved",
    },
    {
      id: "4",
      name: "Facebook Ads",
      amount: "$800.00",
      date: "2023-04-15",
      category: "Marketing",
      budget: "Q2 Marketing",
      status: "Approved",
    },
    {
      id: "5",
      name: "Content Writer",
      amount: "$600.00",
      date: "2023-04-20",
      category: "Marketing",
      budget: "Q2 Marketing",
      status: "Approved",
    },
  ]

  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Track and manage your expenses"
        action={
          <Link
            href="/dashboard/expenses/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Expense
          </Link>
        }
      />

      <DashboardCard
        title="All Expenses"
        action={
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Filter className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
            Filter
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Expense
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Budget
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/dashboard/expenses/${expense.id}`} className="text-green-600 hover:text-green-900">
                      {expense.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{expense.category}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{expense.budget}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{expense.date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        expense.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : expense.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  )
}
