import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// GET the organization tax rate
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found", request },  { status: 404 })
    }

    if (!user.organizationId) {
      return NextResponse.json({ error: "User is not part of an organization" }, { status: 400 })
    }

    // Get organization tax rate
    const organization = await prisma.organization.findUnique({
      where: { id: user.organizationId },
      select: { tax_rate: true },
    })

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    return NextResponse.json({ taxRate: organization.tax_rate })
  } catch (error) {
    console.error("Error fetching organization tax rate:", error)
    return NextResponse.json({ error: "Failed to fetch organization tax rate" }, { status: 500 })
  }
}

// Update the organization tax rate
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }

    // Get user with role
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, organizationId: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is admin or organization admin
    if (user.role !== "ADMIN" && user.role !== "ORGANIZATION_ADMIN") {
      return NextResponse.json({ error: "Not authorized to update tax rate" }, { status: 403 })
    }

    if (!user.organizationId) {
      return NextResponse.json({ error: "User is not part of an organization" }, { status: 400 })
    }

    // Get request body
    const body = await request.json()
    const { taxRate } = body

    // Validate tax rate
    if (taxRate === undefined || taxRate < 0) {
      return NextResponse.json({ error: "Invalid tax rate" }, { status: 400 })
    }

    // Update organization tax rate
    const updatedOrganization = await prisma.organization.update({
      where: { id: user.organizationId },
      data: { tax_rate:taxRate },
      select: { id: true, name: true, tax_rate: true },
    })

    return NextResponse.json({
      message: "Organization tax rate updated successfully",
      organization: updatedOrganization,
    })
  } catch (error) {
    console.error("Error updating organization tax rate:", error)
    return NextResponse.json({ error: "Failed to update organization tax rate" }, { status: 500 })
  }
}
