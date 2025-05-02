import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// GET a specific user in the organization
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params
        const { id } = params
        const cookieStore = await cookies()
        const token = cookieStore.get("auth-token")?.value

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

        // Get current user with organization
        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { organization: true },
        })

        console.log(currentUser)
        if (!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Check if user is admin or organization admin
        if (currentUser.role !== "ADMIN" && currentUser.role !== "ORGANIZATION_ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        // Check if user belongs to an organization
        if (!currentUser.organizationId) {
            return NextResponse.json({ error: "No organization found" }, { status: 404 })
        }

        // Get the requested user
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                organizationId: true,
                canViewOrgDashboard: true,
            },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Check if the requested user belongs to the same organization
        if (user.organizationId !== currentUser.organizationId) {
            return NextResponse.json({ error: "User not in your organization" }, { status: 403 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error("Fetch user error:", error)
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
    }
}

// PUT update a user's role
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth-token")?.value
        const params = await context.params
        const { id } = params
        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

        // Get current user with organization
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
        if (!currentUser.organizationId) {
            return NextResponse.json({ error: "No organization found" }, { status: 404 })
        }

        // Get the target user
        const targetUser = await prisma.user.findUnique({
            where: { id },
        })

        if (!targetUser) {
            return NextResponse.json({ error: "Target user not found" }, { status: 404 })
        }

        // Check if the target user belongs to the same organization
        if (targetUser.organizationId !== currentUser.organizationId) {
            return NextResponse.json({ error: "User not in your organization" }, { status: 403 })
        }

        // Prevent changing own role
        if (targetUser.id === currentUser.id) {
            return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 })
        }

        const body = await request.json()
        const { role } = body

        // Validate role
        if (role !== "ORGANIZATION_ADMIN" && role !== "ORGANIZATION_MEMBER") {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 })
        }

        // Update user role
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role },
        })

        // Create audit log
        await prisma.auditLog.create({
            data: {
                action: "UPDATE_USER_ROLE",
                entity: "USER",
                entityId: updatedUser.id,
                details: `Changed user role to ${role}`,
                userId: currentUser.id,
            },
        })

        return NextResponse.json({
            success: true,
            message: `User role updated to ${role.replace("ORGANIZATION_", "")}`,
        })
    } catch (error) {
        console.error("Update user role error:", error)
        return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
    }
}

// DELETE remove a user from the organization
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth-token")?.value
        const params = await context.params
        const { id } = params

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

        // Get current user with organization
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
        if (!currentUser.organizationId) {
            return NextResponse.json({ error: "No organization found" }, { status: 404 })
        }

        // Get the target user
        const targetUser = await prisma.user.findUnique({
            where: { id },
        })

        if (!targetUser) {
            return NextResponse.json({ error: "Target user not found" }, { status: 404 })
        }

        // Check if the target user belongs to the same organization
        if (targetUser.organizationId !== currentUser.organizationId) {
            return NextResponse.json({ error: "User not in your organization" }, { status: 403 })
        }

        // Prevent removing yourself
        if (targetUser.id === currentUser.id) {
            return NextResponse.json({ error: "Cannot remove yourself from the organization" }, { status: 400 })
        }

        // Remove user from organization
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                organizationId: null,
                role: "USER", // Reset to regular user
            },
        })

        // Create audit log
        await prisma.auditLog.create({
            data: {
                action: "REMOVE_USER",
                entity: "USER",
                entityId: updatedUser.id,
                details: `Removed user from organization`,
                userId: currentUser.id,
            },
        })

        return NextResponse.json({
            success: true,
            message: "User removed from organization",
        })
    } catch (error) {
        console.error("Remove user error:", error)
        return NextResponse.json({ error: "Failed to remove user from organization" }, { status: 500 })
    }
}
