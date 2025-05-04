import { PrismaClient } from "../../generated/prisma";

// This prevents multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Configure Prisma Client with better connection handling for serverless environment
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Handling connection explicitly
prisma.$connect().catch((e) => {
  console.error("Failed to connect to the database:", e);
});

export default prisma;
