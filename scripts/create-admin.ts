import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

// This script creates a single admin user for the application
// Run with: npx ts-node scripts/create-admin.ts

async function main() {
   

    try {
        // Check if admin already exists
        const existingAdmin = await prisma.user.findFirst({
            where: {
                role: "ADMIN",
            },
        })

        if (existingAdmin) {
            console.log("Admin user already exists!")
            return
        }

        // Get admin details from environment or prompt
        const email = process.env.ADMIN_EMAIL || "admin@example.com"
        const password = process.env.ADMIN_PASSWORD || "Admin@123456"

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                id: uuidv4(),
                email,
                passwordHash,
                firstName: "Saka",
                lastName: "Moshood",
                username: "saka_ceo",
                role: "ADMIN",
                isActive: true,
            },
        })

        console.log("Admin user created successfully:", admin.email)

        // Create audit log
        await prisma.auditLog.create({
            data: {
                id: uuidv4(),
                action: "CREATE",
                entity: "User",
                entityId: admin.id,
                details: JSON.stringify({ role: "ADMIN", createdBy: "system" }),
                userId: admin.id,
            },
        })
    } catch (error) {
        console.error("Error creating admin user:", error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
