import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Validate invite token and return organization info
 * GET /api/volunteers/validate-invite?organizationId=xxx&token=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')
    const token = searchParams.get('token')

    if (!organizationId || !token) {
      return NextResponse.json(
        { error: 'Missing organizationId or token' },
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
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid invite link' },
        { status: 404 }
      )
    }

    // Check if invite is expired
    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Invite link has expired' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      organization: invite.organization,
    })
  } catch (error) {
    console.error('Error validating invite:', error)
    return NextResponse.json(
      { error: 'Failed to validate invite' },
      { status: 500 }
    )
  }
}

