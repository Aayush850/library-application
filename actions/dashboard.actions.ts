"use server";
import prisma from "@/db/prisma";

export const getDashboardData = async (userId: string) => {
  "use cache";
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalMembers, totalBooks, activeBorrows, recentMembers, overDue] =
    await Promise.all([
      prisma.member.count({
        where: { userId },
      }),

      prisma.book.count({
        where: { userId },
      }),

      prisma.borrowRecord.count({
        where: { userId, returnDate: null },
      }),

      prisma.member.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

      prisma.borrowRecord.count({
        where: {
          userId,
          returnDate: null,
          dueDate: { lt: today },
        },
      }),
    ]);

  return { totalMembers, totalBooks, overDue, activeBorrows, recentMembers };
};
