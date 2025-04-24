import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import prisma from "@/lib/prisma"
import { sendVerificationEmail } from "@/lib/email"

// Token expiration time (24 hours)
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = uuidv4()
    const verificationTokenExpiry = new Date(Date.now() + TOKEN_EXPIRATION)

    // Create user with verification token
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        firstName,
        lastName,
        passwordHash,
        role: "USER", // Default role
        username: email.split("@")[0], // Default username from email
        isActive: false, // User is inactive until email is verified
        verificationToken,
        verificationTokenExpiry,
        emailVerified: false,
      },
    })

    // Generate verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`

    // Send verification email
    await sendVerificationEmail(user, verificationUrl)

    // Return success response (excluding sensitive data)
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      message: "Registration successful. Please check your email to verify your account.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
