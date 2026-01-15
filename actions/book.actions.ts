"use server";
import prisma from "@/db/prisma";
import z from "zod";
import { createBookSchema } from "@/utils/validators";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { errorFormat } from "@/utils/error-handler";

export const createBook = async (
  formData: z.infer<typeof createBookSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    await prisma.book.create({
      data: {
        ...formData,
        userId: currentUser.id,
      },
    });
    return { success: true, message: "Book added succesfully." };
  } catch (error) {
    return { success: false, message: "Could not add the book." };
  }
};

export const findAllBooks = async (
  userId: string,
  query?: string,
  page?: string
) => {
  "use cache";
  const limit = 10;
  const page_number = page ? Number(page) : 1;
  const offset = (page_number - 1) * limit;
  try {
    const books = await prisma.book.findMany({
      where: {
        userId,
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalBooks = await prisma.book.count({
      where: {
        userId,
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(totalBooks / limit);
    return { success: true, books, totalPages };
  } catch (error) {
    return { success: false, books: [], totalPages: 0 };
  }
};

export const getBookById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    const bookId = Number(id);
    if (isNaN(bookId)) throw new Error("Invalid book ID.");
    const book = await prisma.book.findFirst({
      where: { id: bookId, userId: currentUser.id },
    });
    if (!book) return { success: false, message: "Book not found." };
    return { success: true, book, message: null };
  } catch (error: any) {
    return {
      success: false,
      book: null,
      message: errorFormat(error, error.message),
    };
  }
};

export const deleteBook = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    const book = await getBookById(id);
    const bookId = Number(id);
    const response = await prisma.book.delete({
      where: {
        id: bookId,
        userId: currentUser.id,
      },
    });
    return { success: true, message: "Book has been deleted successfully" };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const updateBook = async (
  id: string,
  formData: z.infer<typeof createBookSchema>
) => {
  try {
    const book = await getBookById(id);
    const bookId = Number(id);
    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...formData,
      },
    });
    return { success: true, message: "Book edited succesfully." };
  } catch (error: any) {
    return { success: false, message: errorFormat(error, error.message) };
  }
};

export const findAvailableBooks = async (query?: string) => {
  try {
    const user = await getCurrentUser();
    const books = await prisma.book.findMany({
      where: {
        userId: user.id,
        stock: { gt: 0 },
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
      select: {
        id: true,
        title: true,
        author: true,
        stock: true,
      },
    });
    return { success: true, books };
  } catch (error) {
    return { success: false, books: [] };
  }
};
