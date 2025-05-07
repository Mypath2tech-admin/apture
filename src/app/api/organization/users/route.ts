import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { generateSecurePassword, hashPassword } from "@/lib/password"
import { sendOrganizationInviteEmail } from "@/lib/organization-invite"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// GET all users in the organization
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }



    // Check if user belongs to an organization
    // if (!user.organizationId) {
    //   return NextResponse.json({ error: "No organization found" }, { status: 404 })
    // }

    // Get all users in the organization
    const organizationUsers = await prisma.user.findMany({
      where: { organizationId: user.organizationId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(organizationUsers)
  } catch (error) {
    console.error("Fetch organization users error:", error)
    return NextResponse.json({ error: "Failed to fetch organization users", request }, { status: 500 })
  }
}

// POST add a new user to the organization
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Get user with organization
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is admin or organization admin
    if (currentUser.role !== "ADMIN" && currentUser.role !== "ORGANIZATION_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if user belongs to an organization
    if (!currentUser.organizationId || !currentUser.organization) {
      return NextResponse.json({ error: "No organization found" }, { status: 404 })
    }

    const body = await request.json()
    const { email, firstName, lastName, role, sendEmail, message } = body

    // Validate required fields
    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 })
    }

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email is already in use" }, { status: 400 })
    }

    // Generate a secure password
    const password = generateSecurePassword()
    const hashedPassword = await hashPassword(password)

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        passwordHash: hashedPassword,
        role,
        organizationId: currentUser.organizationId,
        isActive: true,
        emailVerified: true, // Auto-verify since admin is adding them
      },
    })

    // Send invitation email if requested
    if (sendEmail) {
      try {
        await sendOrganizationInviteEmail({
          user: newUser,
          organizationName: currentUser.organization.name,
          password,
          message,
          inviterName: `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.email,
        })
      } catch (emailError) {
        console.error("Failed to send invitation email:", emailError)
        // Continue with the user creation even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "User added successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName || undefined,
        lastName: newUser.lastName || undefined,
        role: newUser.role,
        organizationId: newUser.organizationId || undefined,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt.toISOString(),
        updatedAt: newUser.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    console.error("Add organization user error:", error)
    return NextResponse.json({ error: "Failed to add user to organization" }, { status: 500 })
  }
}
