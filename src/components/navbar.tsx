"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { ArrowRight, LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { checkAuthStatus, isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08)_0%,rgba(255,255,255,0)_60%)]"></div>
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr rounded-lg opacity-90"></div>
            <Image
              src="/apture.png"
              width={100}
              height={100}
              className="w-10 h-10"
              alt="Apture Logo"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#358f82] to-[#317f82] bg-clip-text text-transparent">
            pture
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center justify-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#358f82] to-[#317f82] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#358f82] to-[#317f82] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}

          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#358f82] to-[#317f82] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="hidden relative z-40 md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-[#358f82]">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                      width={12}
                      height={12}
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-800"
                >
                  {user?.firstName ||
                    user?.username ||
                    user?.email.split("@")[0]}
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
            <Link
              href="/signin"
              className="group relative overflow-hidden bg-gradient-to-r from-[#358f82] to-[#317f82] hover:from-teal-700 hover:to-[#358f82] text-white rounded-2xl px-6 py-2.5 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/10 to-white/5 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center">
                Log in
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-4 border-t border-gray-100">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-[#358f82] transition-colors"
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-[#358f82] transition-colors"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-[#358f82] transition-colors"
          >
            Pricing
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-700 hover:text-[#358f82] transition-colors flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </button>
          ) : (
            <Link
              href="/signin"
              className="bg-gradient-to-r from-[#358f82] to-[#317f82] hover:from-teal-700 hover:to-[#358f82] text-white rounded-xl py-2.5 px-4 text-sm font-medium text-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
