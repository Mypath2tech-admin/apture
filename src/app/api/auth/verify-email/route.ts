import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    // In a real implementation, you would verify the token against what's stored in the database
    // For now, we'll just simulate a successful verification

    // Update user to mark as verified
    const user = await prisma.user.update({
      where: { email },
      data: {
        isActive: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Failed to verify email" }, { status: 500 })
  }
}
