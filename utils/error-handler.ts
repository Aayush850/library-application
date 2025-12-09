import { ZodError } from "zod";
import { APIError } from "better-auth/api";
import { PrismaClientKnownRequestError } from "@/lib/generated/prisma/internal/prismaNamespace";

export const errorFormat = (error: unknown, fallbackMessage = "Something went wrong") => {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return error.issues.map((err) => err.message).join(". ");
  }

  // Handle API errors
  if (error instanceof APIError) {
    return error.message;
  }

  // Handle Prisma known errors
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        return "Duplicate entry exists.";
      case "P2003": // Foreign key violation
        return "Cannot delete this record because it is still referenced by another record.";
      case "P2025": // Record to delete does not exist
        return "Record not found.";
      default:
        return "Database error occurred.";
    }
  }

  // Fallback for unknown errors
  return fallbackMessage;
};
