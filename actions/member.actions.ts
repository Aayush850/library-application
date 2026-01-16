"use server";
import { createMemberSchema } from "@/utils/validators";
import z from "zod";
import prisma from "@/db/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { cacheTag, updateTag } from "next/cache";
import { errorFormat } from "@/utils/error-handler";

export const createMember = async (
  formData: z.infer<typeof createMemberSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const data = await prisma.member.create({
      data: {
        ...formData,
        userId: currentUser.id,
      },
    });
    updateTag("all-members");
    updateTag("dashboard-stats");
    return { success: true, message: "Member has been created." };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const findAllMembers = async (
  userId: string,
  query?: string,
  page?: string
) => {
  "use cache";
  cacheTag("all-members");
  const limit = 10;
  const page_number = page ? Number(page) : 1;
  const offset = (page_number - 1) * limit;
  try {
    const members = await prisma.member.findMany({
      where: {
        userId,
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    });
    const totalMembers = await prisma.member.count({
      where: {
        userId,
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(totalMembers / limit);
    return { success: true, members, totalPages };
  } catch (error: any) {
    return {
      success: false,
      members: [],
      message: errorFormat(error, error.message),
    };
  }
};

export const findMemberById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    const memberId = Number(id);
    if (isNaN(memberId)) throw new Error("Invalid Member Id.");
    const member = await prisma.member.findFirst({
      where: {
        id: memberId,
        userId: currentUser.id,
      },
    });
    if (!member) return { success: false, message: "Member not found." };
    return { success: true, member };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const updateMember = async (
  id: string,
  formData: z.infer<typeof createMemberSchema>
) => {
  try {
    const book = await findMemberById(id);
    const bookId = Number(id);
    await prisma.member.update({
      where: {
        id: bookId,
      },
      data: {
        ...formData,
      },
    });
    updateTag("all-members");
    return { success: true, message: "Member edited succesfully." };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const deleteMember = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    const member = await findMemberById(id);
    const memberId = Number(id);
    await prisma.member.delete({
      where: {
        id: memberId,
        userId: currentUser.id,
      },
    });
    updateTag("all-members");
    updateTag("dashboard-stats");
    return { success: true, message: "Member has been deleted successfully." };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};
