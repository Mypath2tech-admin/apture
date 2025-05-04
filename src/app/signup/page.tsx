"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DollarSign, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuthStore } from "@/lib/store/authStore"

export default function SignUp() {
  const router = useRouter()
  const [signingFor, setSigningFor] = useState<"user" | "organization">("user")
  const { register, isLoading, error, isAuthenticated } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationName: "",
    organizationEmail: "",
    organizationPhone: 0,
  })
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // organizationName: "",
    // organizationEmail:"",
    // organizationPhone: "",
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const validateForm = () => {
    let valid = true
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
      valid = false
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
      valid = false
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      errors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await register(formData)
      
      router.push("/signin")
    } catch (err) {
      // Error is handled by the store
      console.error("Registration failed:", err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 transform transition-all duration-500 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400 rounded-lg opacity-90"></div>
                <DollarSign className="h-6 w-6 text-white z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Apture
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Create your account</h1>
            <p className="text-gray-600 mt-2">Start managing your finances and time today</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${formErrors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                  placeholder="First name"
                />
                {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${formErrors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                  placeholder="Last name"
                />
                {formErrors.lastName && <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                placeholder="Enter your email"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${formErrors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formErrors.password ? (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              )}
            </div>
            <div className="flex items-center gap-6 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="signingFor"
                  value="user"
                  checked={signingFor === "user"}
                  onChange={() => setSigningFor("user")}
                />
                Personal Use
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="signingFor"
                  value="organization"
                  checked={signingFor === "organization"}
                  onChange={() => setSigningFor("organization")}
                />
                Organization
              </label>
            </div>
            {signingFor === "organization" && (
              <>
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Your organization name"
                  />
                  {/* {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.organizationName}</p>} */}
                </div>
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Email Address
                  </label>
                  <input
                    id="organizationEmail"
                    name="organizationEmail"
                    type="text"
                    value={formData.organizationEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="j.smith@company.com"
                  />
                  {/* {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.organizationEmail}</p>} */}
                </div>


                <div>
                  <label htmlFor="organizationPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Phone Number
                  </label>
                  <input
                    id="organizationPhone"
                    name="organizationPhone"
                    type="tel"
                    value={formData.organizationPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Phone number for organization"
                  />
                  {/* {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>} */}
                </div>
              </>
            )}



            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>
                By signing up, you agree to our{" "}
                <Link href="#" className="text-emerald-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="text-emerald-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
