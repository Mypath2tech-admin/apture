"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { DollarSign, X, Menu, User, LogOut } from "lucide-react"
import { useAuthStore } from "@/lib/store/authStore"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { checkAuthStatus, isAuthenticated, user, logout } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])
  
  const handleLogout = async () => {
    await logout()
    router.push('/signin')
  }
  
  return (
    <header className="backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.05)_0%,rgba(255,255,255,0)_60%)]"></div>
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400 rounded-lg opacity-90"></div>
            <DollarSign className="h-6 w-6 text-white z-10" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Greenor
          </span>
        </div>
        <nav className="hidden md:flex gap-8 items-center justify-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}

          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="hidden relative z-40 md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  {user?.profileImage ? (
                    <Image src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" width={12} height={12} />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <Link href='/dashboard' className="text-sm font-medium text-gray-800">
                  {user?.firstName || user?.username || user?.email.split('@')[0]}
                </Link>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-sm relative cursor-pointer z-30 font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900 transition-all duration-300"
              >
                Log in
              </Link>
              <button className="relative overflow-hidden group bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-2xl transition-all duration-300 shadow-md">
                <div className="absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all"></div>
                <span className="font-medium flex items-center">
                  Join Waitlist
                  <svg
                    className="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </>
          )}
        </div>
        <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Home
          </Link>
          
          {isAuthenticated && (
            <Link href="/dashboard" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Dashboard
            </Link>
          )}
          
          <Link href="/pricing" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Pricing
          </Link>
          
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="text-sm font-medium hover:text-gray-600 transition-colors flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </button>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium hover:text-gray-600 transition-colors">
                Log in
              </Link>
              <button className="bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 p-2 px-4 rounded-full text-white w-full">
                Join Waitlist
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}