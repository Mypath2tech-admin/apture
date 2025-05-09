import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function PUT(request: NextRequest) {
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

    // Get the form data
    const formData = await request.formData()

    // Extract user data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phoneNumber = formData.get("phoneNumber") as string

    // Handle profile image upload
    const profileImage = formData.get("profileImage") as File | null
    let profileImageUrl = null

    if (profileImage) {
      // In a real implementation, you would upload the image to a storage service
      // like AWS S3, Cloudinary, or Vercel Blob Storage
      // For this example, we'll just simulate the upload and return a placeholder URL

      // Example with Vercel Blob (you would need to set up the proper imports and env vars)
      // const { url } = await put(`profile-${decoded.userId}`, profileImage, {
      //   access: 'public',
      // })
      // profileImageUrl = url

      // For now, we'll use a placeholder
      profileImageUrl = `/api/images/profile/${decoded.userId}`
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        ...(profileImageUrl && { profileImage: profileImageUrl }),
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            email: true,
            logo: true,
            website: true,
          },
        },
      },
    })

    // Return updated user data (excluding sensitive information)
    return NextResponse.json({
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      profileImage: updatedUser.profileImage,
      role: updatedUser.role,
      organization: updatedUser.organization,
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
