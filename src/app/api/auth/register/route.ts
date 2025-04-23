import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

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

    // Create user
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        firstName,
        lastName,
        passwordHash,
        role: "USER", // Default role
        username: email.split("@")[0], // Default username from email
      },
    })

    // Create verification token
    // In a real app, you would send an email with this token
    const verificationToken = uuidv4()

    // Return success response (excluding password)
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      verificationToken, // In production, don't return this
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
