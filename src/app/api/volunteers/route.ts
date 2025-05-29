import prisma from "@/lib/prisma";
import { CreateVolunteerData } from "@/types/volunteers";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// GET /api/volunteers - Get all volunteers for the user's organization
export async function GET() {
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

    // Get volunteers for the organization
    const volunteers = await prisma.volunteer.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ volunteers });
  } catch (error) {
    console.error("Fetch volunteers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteers" },
      { status: 500 }
    );
  }
}

// POST /api/volunteers - Create a new volunteer
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

    const body: CreateVolunteerData = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if volunteer with email already exists in organization
    const existingVolunteer = await prisma.volunteer.findFirst({
      where: {
        email: body.email,
        organizationId: user.organizationId,
      },
    });

    if (existingVolunteer) {
      return NextResponse.json(
        { error: "Volunteer with this email already exists" },
        { status: 409 }
      );
    }

    // Create volunteer
    const volunteer = await prisma.volunteer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        organizationId: user.organizationId,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ volunteer }, { status: 201 });
  } catch (error) {
    console.error("Create volunteer error:", error);
    return NextResponse.json(
      { error: "Failed to create volunteer" },
      { status: 500 }
    );
  }
}
