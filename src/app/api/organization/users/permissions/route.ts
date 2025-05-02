import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// API endpoint to toggle dashboard access permission for a user
export async function POST(request: NextRequest) {
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

    // Get the current user (who is making the request)
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only organization admins and admins can update permissions
    if (currentUser.role !== "ORGANIZATION_ADMIN" && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Get request body
    const body = await request.json()
    const { userId, canViewOrgDashboard } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (typeof canViewOrgDashboard !== "boolean") {
      return NextResponse.json({ error: "canViewOrgDashboard must be a boolean" }, { status: 400 })
    }

    // Get the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!targetUser) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 })
    }

    // Ensure the target user is in the same organization as the current user
    if (targetUser.organizationId !== currentUser.organizationId) {
      return NextResponse.json(
        { error: "Cannot modify permissions for users outside your organization" },
        { status: 403 },
      )
    }

    // Update the user's permission
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { canViewOrgDashboard },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        canViewOrgDashboard: true,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: canViewOrgDashboard ? "GRANT_DASHBOARD_ACCESS" : "REVOKE_DASHBOARD_ACCESS",
        entity: "User",
        entityId: targetUser.id,
        details: JSON.stringify({
          email: targetUser.email,
          permission: "canViewOrgDashboard",
          value: canViewOrgDashboard,
        }),
        userId: currentUser.id,
      },
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `Dashboard access ${canViewOrgDashboard ? "granted to" : "revoked from"} user`,
    })
  } catch (error) {
    console.error("Update user permissions error:", error)
    return NextResponse.json({ error: "Failed to update user permissions" }, { status: 500 })
  }
}
