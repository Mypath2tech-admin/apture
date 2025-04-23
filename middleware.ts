import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Paths that don't require authentication
const publicPaths = ["/", "/signin", "/signup", "/api/auth/login", "/api/auth/register", "/api/auth/verify-email"]

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Check if the path is public
    if (publicPaths.some((publicPath) => path.startsWith(publicPath))) {
        return NextResponse.next()
    }

    // Check for auth token
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
        // Redirect to login if no token
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    try {
        // Verify token
        jwt.verify(token, JWT_SECRET)
        return NextResponse.next()
    } catch (error) {
        // Redirect to login if token is invalid
        console.log(error)
        return NextResponse.redirect(new URL("/signin", request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
}
