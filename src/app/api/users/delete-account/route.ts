import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }

    const userId = decoded.userId

    // Get user to check role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Start a transaction to ensure all related data is deleted properly
    await prisma.$transaction(async (tx) => {
      // Delete user's expenses
      await tx.expense.deleteMany({
        where: { userId },
      })

      // Delete user's budgets
      await tx.budget.deleteMany({
        where: { userId },
      })

      // Delete user's timesheet entries
      await tx.timesheet.deleteMany({
        where: { userId },
      })
      
      await tx.auditLog.deleteMany({
        where: {userId}
      })

      // If user is an organization owner, handle organization data
      if (user.role === "ORGANIZATION_ADMIN" && user.organizationId) {
        // Get all users in the organization
        const orgUsers = await tx.user.findMany({
          where: { organizationId: user.organizationId },
        })

        // If there are other users in the organization, transfer ownership to another user
        if (orgUsers.length > 1) {
          const nextOwner = orgUsers.find((u) => u.id !== userId)

          if (nextOwner) {
            // Update the next user to be the owner
            await tx.user.update({
              where: { id: nextOwner.id },
              data: { role: "ORGANIZATION_ADMIN" },
            })

            // Update organization expenses and budgets to the new owner
            await tx.expense.updateMany({
              where: { organizationId: user.organizationId, userId: null },
              data: { userId: nextOwner.id },
            })

            await tx.budget.updateMany({
              where: { organizationId: user.organizationId, userId: null },
              data: { userId: nextOwner.id },
            })
          }
        } else {
          // If user is the only one in the organization, delete the organization
          await tx.organization.delete({
            where: { id: user.organizationId },
          })
        }
      }

      // Finally, delete the user
      await tx.user.delete({
        where: { id: userId },
      })
    })

    // Clear the auth cookie
    cookieStore.delete("auth-token")

    return NextResponse.json({ success: true, message: "Account deleted successfully" })
  } catch (error) {
    console.error("Delete account error:", error, request)
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  }
}
