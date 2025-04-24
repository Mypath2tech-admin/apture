"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      const email = searchParams.get("email")

      if (!token || !email) {
        setStatus("error")
        setMessage("Missing verification information. Please check your email link.")
        return
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message || "Email verified successfully!")
        } else {
          setStatus("error")
          setMessage(data.error || "Failed to verify email. Please try again.")
        }
      } catch (error) {
        console.log(error)
        setStatus("error")
        setMessage("An error occurred during verification. Please try again.")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <Suspense>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-green-500" />
              <p className="text-lg text-gray-600">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Verification Successful!</h2>
              <p className="text-gray-600">{message}</p>
              <div className="mt-6">
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">Verification Failed</h2>
              <p className="text-gray-600">{message}</p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Sign Up Again
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </Suspense>
  )
}
