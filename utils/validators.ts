import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const createMemberSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  address: z.string().nonempty("Address is required."),
  phone: z.string().nonempty("Phone number is required."),
  membershipId: z.string().nonempty("Membership id is required."),
});

export const createBookSchema = z.object({
  title: z.string().nonempty("Title is required."),
  author: z.string().nonempty("Author is required."),
  stock: z.number(),
  cover: z.string().nonempty("Cover Image is required."),
  description: z.string().optional(),
  genreId: z.number("Genre is required")
})

export const createBorrowRecordSchema = z.object({
  dueDate: z.iso.datetime("Due date is required."),
  memberId: z.string("Member is required"),
  bookId:z.string("Book is required"),
})