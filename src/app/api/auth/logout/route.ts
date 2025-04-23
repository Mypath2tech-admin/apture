import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()

    // Clear the auth cookie
    cookieStore.set("auth-token", "", {
      expires: new Date(0),
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Failed to logout", message:request }, { status: 500 })
  }
}
