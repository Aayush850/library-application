import { PrismaClient } from "@/lib/generated/prisma/client";
import { sampleData } from "./sample-data";
import "dotenv/config";

async function seed() {
  const prisma = new PrismaClient();
  await prisma.genre.deleteMany();
  await prisma.genre.createMany({ data: sampleData.genres });
  console.log("Database seeded successfully.");
}

seed();
