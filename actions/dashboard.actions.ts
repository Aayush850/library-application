"use server";

import prisma from "@/db/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

export const getDashboardData = async () => {
  const user = await getCurrentUser();
  const totalMembers = await prisma.member.count({
    where: {
      userId: user.id,
    },
  });
  const totalBooks = await prisma.book.count({
    where: {
      userId: user.id,
    },
  });
  const activeBorrows = await prisma.borrowRecord.count({
    where: { userId: user.id, returnDate: null },
  });

  const recentMembers = await prisma.member.findMany({
    where:{userId:user.id},
    orderBy:{
      createdAt:"desc"
    },
   take:3
  })

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overDue = await prisma.borrowRecord.count({
    where: {
      userId: user.id,
      returnDate: null,
      dueDate: {
        lt: today,
      },
    },
  });

  return{totalMembers,totalBooks,overDue,activeBorrows,recentMembers}

};
