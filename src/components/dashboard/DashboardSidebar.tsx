'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PieChart, DollarSign, Clock, Users, User, Settings, Menu, X, Plus, BarChart4 } from 'lucide-react'

// Type for navigation items
type NavItem = {
  name: string
  href: string
  icon: React.ElementType
  userTypes: ('user' | 'organization')[]
}

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Mock user type - in a real app, this would come from auth context
  const userType: 'user' | 'organization' = 'organization' // Change to test different views

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, userTypes: ['user', 'organization'] },
    { name: 'Budgets', href: '/dashboard/budgets', icon: PieChart, userTypes: ['user', 'organization'] },
    { name: 'Expenses', href: '/dashboard/expenses', icon: DollarSign, userTypes: ['user', 'organization'] },
    { name: 'Timesheets', href: '/dashboard/timesheets', icon: Clock, userTypes: ['user', 'organization'] },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart4, userTypes: ['user', 'organization'] },
    { name: 'Team Members', href: '/dashboard/users', icon: Users, userTypes: ['organization'] },
    { name: 'Profile', href: '/dashboard/profile', icon: User, userTypes: ['user', 'organization'] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, userTypes: ['user', 'organization'] },
  ]

  // Filter navigation items based on user type
  const filteredNavigation = navigation.filter(item =>
    item.userTypes.includes(userType)
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md text-gray-600"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400 rounded-lg opacity-90"></div>
                  <DollarSign className="h-6 w-6 text-white z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Greenor
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? 'text-green-600' : 'text-gray-500'}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Quick actions */}
          <div className="p-4 border-t border-gray-200">
            <button
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              New Budget
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
