"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import QueryProvider from "@/lib/query-client";
import { useAuthStore } from "@/lib/store/authStore";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();

  return (
    <QueryProvider>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-none w-64">
          <DashboardSidebar organizationName={user?.organization?.name} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 h-screen overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
