import { sendVerificationEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface CreateOrganizationInput {
  id: string;
  name: string;
  ownerId: string;
  email?: string;
}

// Token expiration time (24 hours)
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationName,
      organizationPhone,
      organizationEmail,
    } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date(Date.now() + TOKEN_EXPIRATION);

    // Get the base URL from environment variable
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create user with verification token

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        firstName,
        lastName,
        passwordHash,
        role: "USER", // Default role
        username: email.split("@")[0],
        isActive: false, // User is inactive until email is verified
        verificationToken,
        verificationTokenExpiry,
        emailVerified: false,
      },
    });
    if (organizationName && organizationPhone) {
      const organizationData: CreateOrganizationInput = {
        id: uuidv4(),
        name: organizationName,
        ownerId: user.id,
      };

      if (organizationEmail) {
        organizationData.email = organizationEmail;
      }

      const organization = await prisma.organization.create({
        data: organizationData,
      });
      await prisma.user.update({
        where: { id: user.id },
        data: {
          organizationId: organization.id,
          role: "ORGANIZATION_ADMIN",
        },
      });
    }
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    }); 

    // Generate verification URL
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      email
    )}`;

    // Send verification email
    await sendVerificationEmail(user, verificationUrl);

    // Return success response (excluding sensitive data)
    return NextResponse.json({
      id: updatedUser?.id,
      email: updatedUser?.email,
      firstName: updatedUser?.firstName,
      lastName: updatedUser?.lastName,
      role: updatedUser?.role,
      organizationId: updatedUser?.organizationId || null,
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
