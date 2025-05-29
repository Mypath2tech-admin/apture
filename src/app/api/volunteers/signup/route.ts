import prisma from "@/lib/prisma";
import { VolunteerSignupData } from "@/types/volunteers";
import { type NextRequest, NextResponse } from "next/server";

// POST /api/volunteers/signup - Handle volunteer signup from invite link
export async function POST(request: NextRequest) {
  try {
    const body: VolunteerSignupData = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.address ||
      !body.token
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Extract organization ID from URL parameters (from the invite link)
    const url = new URL(request.url);
    const organizationId = url.searchParams.get("org");

    if (!organizationId) {
      return NextResponse.json(
        { error: "Invalid invite link - missing organization" },
        { status: 400 }
      );
    }

    // Verify organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Invalid organization" },
        { status: 404 }
      );
    }

    // Check if volunteer with email already exists in organization
    const existingVolunteer = await prisma.volunteer.findFirst({
      where: {
        email: body.email,
        organizationId: organizationId,
      },
    });

    if (existingVolunteer) {
      return NextResponse.json(
        {
          error:
            "A volunteer with this email already exists in the organization",
        },
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
        organizationId: organizationId,
        inviteToken: body.token,
        status: "ACTIVE", // Set as active since they completed signup
      },
    });

    return NextResponse.json(
      {
        message: "Volunteer registration successful",
        volunteer: {
          id: volunteer.id,
          name: volunteer.name,
          email: volunteer.email,
          status: volunteer.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Volunteer signup error:", error);
    return NextResponse.json(
      { error: "Failed to register volunteer" },
      { status: 500 }
    );
  }
}

// GET /api/volunteers/signup - Validate invite token and get organization info
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const organizationId = url.searchParams.get("org");

    if (!token || !organizationId) {
      return NextResponse.json(
        { error: "Invalid invite link" },
        { status: 400 }
      );
    }

    // Verify organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Invalid organization" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      organization: organization,
      token: token,
    });
  } catch (error) {
    console.error("Validate invite error:", error);
    return NextResponse.json(
      { error: "Failed to validate invite" },
      { status: 500 }
    );
  }
}
