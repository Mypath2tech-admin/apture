import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    if (!email || !token) {
      return NextResponse.json({ error: "Email and token are required" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is already verified
    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified",
      })
    }

    // Verify token
    if (user.verificationToken !== token) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    // Check if token is expired
    if (user.verificationTokenExpiry && user.verificationTokenExpiry < new Date()) {
      return NextResponse.json({ error: "Verification token has expired" }, { status: 400 })
    }

    // Update user to mark as verified
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        isActive: true,
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    })

    // Send welcome email
    await sendWelcomeEmail(updatedUser)

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Failed to verify email" }, { status: 500 })
  }
}
