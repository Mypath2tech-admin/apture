'use client'
import { ReactNode } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default function DashboardLayout({ children }: { children: ReactNode }) {


    

  return (
    <div className="flex h-screen bg-gray-50">
     <div className="flex-none w-64">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 h-screen overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
