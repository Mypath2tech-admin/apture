import prisma from "@/lib/prisma";
import { UpdateVolunteerData } from "@/types/volunteers";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// GET /api/volunteers/[id] - Get a specific volunteer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Get volunteer and ensure it belongs to user's organization
    const volunteer = await prisma.volunteer.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!volunteer) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ volunteer });
  } catch (error) {
    console.error("Fetch volunteer error:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer" },
      { status: 500 }
    );
  }
}

// PUT /api/volunteers/[id] - Update a volunteer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const body: UpdateVolunteerData = await request.json();

    // Check if volunteer exists and belongs to user's organization
    const existingVolunteer = await prisma.volunteer.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!existingVolunteer) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    // If email is being updated, check for duplicates
    if (body.email && body.email !== existingVolunteer.email) {
      const emailExists = await prisma.volunteer.findFirst({
        where: {
          email: body.email,
          organizationId: user.organizationId,
          id: { not: id },
        },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Volunteer with this email already exists" },
          { status: 409 }
        );
      }
    }

    // Update volunteer
    const volunteer = await prisma.volunteer.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.address !== undefined && { address: body.address }),
        ...(body.status && { status: body.status }),
      },
    });

    return NextResponse.json({ volunteer });
  } catch (error) {
    console.error("Update volunteer error:", error);
    return NextResponse.json(
      { error: "Failed to update volunteer" },
      { status: 500 }
    );
  }
}

// DELETE /api/volunteers/[id] - Delete a volunteer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Check if volunteer exists and belongs to user's organization
    const existingVolunteer = await prisma.volunteer.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!existingVolunteer) {
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404 }
      );
    }

    // Delete volunteer
    await prisma.volunteer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Delete volunteer error:", error);
    return NextResponse.json(
      { error: "Failed to delete volunteer" },
      { status: 500 }
    );
  }
}
