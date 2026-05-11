import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

// Reuse existing PrismaClient instance to avoid multiple connections during hot-reloads
const prisma = globalForPrisma.prisma || new PrismaClient();

// Only save to global in development (not production)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
