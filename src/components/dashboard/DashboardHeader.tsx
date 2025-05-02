'use client'

import { useState } from 'react'
import {  User } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from "@/lib/store/authStore"
import {useRouter} from 'next/navigation'
export default function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { logout } = useAuthStore()
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/signin')
  }
  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search */}
          <div className="flex-1 min-w-0 md:px-2 lg:px-0">
            {/* <div className="relative max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div> */}
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {/* <button
              type="button"
              className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button> */}
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <User className="h-5 w-5" aria-hidden="true" />
                </div>
              </button>
              
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link 
                    href="/dashboard/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Your Profile
                  </Link>
                  {/* <Link 
                    href="/dashboard/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                     
                      setIsProfileOpen(false) }
                    }
                  >
                    Settings
                  </Link> */}
                  <button 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
