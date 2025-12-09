import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

// Create Neon adapter
const adapter = new PrismaNeon({ connectionString });

// Singleton pattern to avoid multiple clients in dev (Next.js hot reload)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
