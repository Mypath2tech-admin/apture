import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Approve or reject a volunteer
 * PATCH /api/volunteers/[id]/approve
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Get current user with organization
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user belongs to an organization
    if (!currentUser.organizationId) {
      return NextResponse.json(
        { error: 'User must belong to an organization' },
        { status: 403 }
      )
    }

    // Get volunteer
    const volunteer = await prisma.volunteer.findUnique({
      where: { id },
    })

    if (!volunteer) {
      return NextResponse.json({ error: 'Volunteer not found' }, { status: 404 })
    }

    // Verify volunteer belongs to the same organization
    if (volunteer.organizationId !== currentUser.organizationId) {
      return NextResponse.json(
        { error: 'Unauthorized: Volunteer does not belong to your organization' },
        { status: 403 }
      )
    }

    // Get action from request body
    const body = await request.json()
    const { action } = body // 'approve' or 'reject'

    if (!action || (action !== 'approve' && action !== 'reject')) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      )
    }

    // Update volunteer status
    const updatedVolunteer = await prisma.volunteer.update({
      where: { id },
      data: {
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
      },
    })

    return NextResponse.json(updatedVolunteer)
  } catch (error) {
    console.error('Error updating volunteer status:', error)
    return NextResponse.json(
      { error: 'Failed to update volunteer status' },
      { status: 500 }
    )
  }
}

