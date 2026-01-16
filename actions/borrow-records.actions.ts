"use server";
import prisma from "@/db/prisma";
import { errorFormat } from "@/utils/error-handler";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { createBorrowRecordSchema } from "@/utils/validators";
import z from "zod";
import { getBookById } from "./book.actions";
import { findMemberById } from "./member.actions";
import { cacheTag, updateTag } from "next/cache";

export const createBorrowRecord = async (
  formData: z.infer<typeof createBorrowRecordSchema>
) => {
  const memberId = Number(formData.memberId);
  const bookId = Number(formData.bookId);
  try {
    const currentUser = await getCurrentUser();
    const { book } = await getBookById(formData.bookId);
    const member = await findMemberById(formData.memberId);

    if (!book) {
      return { success: false, message: "Book not found." };
    }
    if (book.stock <= 0) {
      return { success: false, message: "Book is not available." };
    }
    if (!member) {
      return { success: false, message: "Member not found." };
    }
    const result = await prisma.$transaction(async (tx) => {
      const record = await tx.borrowRecord.create({
        data: {
          memberId,
          userId: currentUser.id,
          bookId,
          dueDate: formData.dueDate,
        },
      });
      await tx.book.update({
        where: {
          id: bookId,
        },
        data: {
          stock: { decrement: 1 },
        },
      });
      return record;
    });
    updateTag("borrow-records");
    updateTag("borrow-stats");
    updateTag("dashboard-stats");
    return { success: true, message: "Borrow Record has been created." };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const findAllBorrowRecords = async (
  userId: string,
  query?: string,
  page?: string
) => {
  "use cache";
  cacheTag("borrow-records");
  const limit = 10;
  const page_number = page ? Number(page) : 1;
  const offset = (page_number - 1) * limit;
  try {
    const records = await prisma.borrowRecord.findMany({
      where: {
        userId,
        member: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
      include: {
        member: true,
        book: true,
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalBooks = await prisma.borrowRecord.count({
      where: {
        userId,
        member: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
    });
    const totalPages = Math.ceil(totalBooks / limit);
    return { success: true, records, totalPages };
  } catch (error) {
    return { success: false, records: [], totalPages: 0 };
  }
};

export const markBorrowRecordAsReturned = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    const recordId = Number(id);
    const record = await prisma.borrowRecord.findUnique({
      where: { id: recordId },
      include: { book: true },
    });
    if (!record) {
      return { success: false, message: "Borrow record not found." };
    }
    if (record.returnDate) {
      return { success: false, message: "Book is already returned." };
    }
    await prisma.$transaction(async (tx) => {
      await tx.borrowRecord.update({
        where: { id: recordId },
        data: {
          returnDate: new Date(),
        },
      });
      await tx.book.update({
        where: { id: record.bookId },
        data: {
          stock: { increment: 1 },
        },
      });
    });
    updateTag("borrow-records");
    updateTag("borrow-stats");
    updateTag("dashboard-stats");
    return { success: true, message: "Borrow record marked as returned." };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const getBorrowStats = async (userId: string) => {
  "use cache";
  cacheTag("borrow-stats");
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const stats = await prisma.$queryRaw<{ date: Date; total: bigint }[]>`
      SELECT 
        DATE("createdAt") as date,
        COUNT(*)::int as total
      FROM "BorrowRecord"
      WHERE "userId" = ${userId}
        AND "createdAt" >= ${sevenDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `;
    // Convert to the format you need
    const formattedStats = stats.map((stat) => ({
      date: new Date(stat.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      total: Number(stat.total),
    }));

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    const finalData = last7Days.map((item) => {
      const existing = formattedStats.find((data) => data.date === item);
      return {
        date: item,
        total: existing ? existing.total : 0,
      };
    });
    return finalData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
