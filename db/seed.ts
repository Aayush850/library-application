import prisma from "@/db/prisma";
import { sampleData } from "./sample-data";
import "dotenv/config";

async function seed() {
  await prisma.genre.deleteMany();
  await prisma.genre.createMany({ data: sampleData.genres });
  console.log("Database seeded successfully.");
}

seed();
