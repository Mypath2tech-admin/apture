import prisma from "@/lib/prisma";
import { VolunteerInviteData } from "@/types/volunteers";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// POST /api/volunteers/invite - Generate volunteer invite link
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true },
    });

    if (!user || !user.organizationId) {
      return NextResponse.json(
        { error: "User not found or not part of an organization" },
        { status: 404 }
      );
    }

    const body: VolunteerInviteData = await request.json();

    // Generate unique invite token
    const inviteToken = `volunteer_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    // Create invite link
    const inviteLink = `${body.baseUrl}/volunteer-signup?token=${inviteToken}&org=${user.organizationId}`;

    // Store the token temporarily in the database (you might want to create a separate table for this)
    // For now, we'll return the link with the token and organization info

    return NextResponse.json({
      inviteLink,
      token: inviteToken,
      organizationId: user.organizationId,
      organizationName: user.organization?.name,
    });
  } catch (error) {
    console.error("Generate invite error:", error);
    return NextResponse.json(
      { error: "Failed to generate invite link" },
      { status: 500 }
    );
  }
}
