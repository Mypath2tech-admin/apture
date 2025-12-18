import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Generate or retrieve organization-scoped volunteer invite link
 * GET /api/volunteers/invite
 */
export async function GET(request: NextRequest) {
  try {
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
        { error: 'User must belong to an organization to generate invite links' },
        { status: 403 }
      )
    }

    // Check if invite already exists for this organization
    let invite = await prisma.volunteerInvite.findFirst({
      where: {
        organizationId: currentUser.organizationId,
        isActive: true,
      },
    })

    // If no active invite exists, create one
    if (!invite) {
      const token = randomBytes(32).toString('hex')
      const expiresAt = new Date()
      expiresAt.setFullYear(expiresAt.getFullYear() + 1) // Expires in 1 year

      invite = await prisma.volunteerInvite.create({
        data: {
          token,
          organizationId: currentUser.organizationId,
          expiresAt,
          isActive: true,
        },
      })
    }

    // Generate invite link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const inviteLink = `${baseUrl}/org/${currentUser.organizationId}/volunteer-invite/${invite.token}`

    return NextResponse.json({
      inviteLink,
      token: invite.token,
      organizationId: currentUser.organizationId,
      expiresAt: invite.expiresAt,
    })
  } catch (error) {
    console.error('Error generating invite link:', error)
    return NextResponse.json(
      { error: 'Failed to generate invite link' },
      { status: 500 }
    )
  }
}

/**
 * Regenerate invite link (deactivate old, create new)
 * POST /api/volunteers/invite
 */
export async function POST(request: NextRequest) {
  try {
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

    if (!currentUser || !currentUser.organizationId) {
      return NextResponse.json(
        { error: 'User must belong to an organization' },
        { status: 403 }
      )
    }

    // Deactivate existing invites
    await prisma.volunteerInvite.updateMany({
      where: {
        organizationId: currentUser.organizationId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })

    // Create new invite
    const newToken = randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    const invite = await prisma.volunteerInvite.create({
      data: {
        token: newToken,
        organizationId: currentUser.organizationId,
        expiresAt,
        isActive: true,
      },
    })

    // Generate invite link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const inviteLink = `${baseUrl}/org/${currentUser.organizationId}/volunteer-invite/${invite.token}`

    return NextResponse.json({
      inviteLink,
      token: invite.token,
      organizationId: currentUser.organizationId,
      expiresAt: invite.expiresAt,
    })
  } catch (error) {
    console.error('Error regenerating invite link:', error)
    return NextResponse.json(
      { error: 'Failed to regenerate invite link' },
      { status: 500 }
    )
  }
}

