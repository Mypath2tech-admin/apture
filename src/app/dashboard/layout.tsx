"use client"
import type { ReactNode } from "react"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import QueryProvider from "@/lib/query-client"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-none w-64">
          <DashboardSidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 h-screen overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </QueryProvider>
  )
}
