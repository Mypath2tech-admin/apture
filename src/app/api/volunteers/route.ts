import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Get all volunteers for the current user's organization
 * GET /api/volunteers
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
        { error: 'User must belong to an organization' },
        { status: 403 }
      )
    }

    // Get all volunteers for this organization
    const volunteers = await prisma.volunteer.findMany({
      where: {
        organizationId: currentUser.organizationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(volunteers)
  } catch (error) {
    console.error('Error fetching volunteers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteers' },
      { status: 500 }
    )
  }
}

/**
 * Create a new volunteer (public endpoint - used by invite form)
 * POST /api/volunteers
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role, organizationId, token } = body

    // Validate required fields
    if (!name || !email || !role || !organizationId || !token) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, role, organizationId, token' },
        { status: 400 }
      )
    }

    // Verify invite token
    const invite = await prisma.volunteerInvite.findFirst({
      where: {
        token,
        organizationId,
        isActive: true,
      },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid or expired invite link' },
        { status: 400 }
      )
    }

    // Check if invite is expired
    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Invite link has expired' },
        { status: 400 }
      )
    }

    // Check if volunteer with this email already exists for this organization
    const existingVolunteer = await prisma.volunteer.findFirst({
      where: {
        email,
        organizationId,
      },
    })

    if (existingVolunteer) {
      return NextResponse.json(
        { error: 'A volunteer with this email already exists for this organization' },
        { status: 409 }
      )
    }

    // Create volunteer with PENDING status
    const volunteer = await prisma.volunteer.create({
      data: {
        name,
        email,
        role,
        organizationId,
        status: 'PENDING',
        volunteerDate: new Date(),
      },
    })

    return NextResponse.json(volunteer, { status: 201 })
  } catch (error) {
    console.error('Error creating volunteer:', error)
    return NextResponse.json(
      { error: 'Failed to create volunteer' },
      { status: 500 }
    )
  }
}

