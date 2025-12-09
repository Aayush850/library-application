import { z } from "zod";
import { signUpSchema } from "@/utils/validators";
export type SignUpSchema = z.infer<typeof signUpSchema>;

export type Member = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    name: string;
    address: string;
    phone: string;
    membershipId: string;
}

export type Genre = {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export type Book ={
    title: string;
    author: string;
    stock: number;
    cover: string;
    description: string | null;
    genreId: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}


export type BorrowRecord = {
  id: number;
  dueDate: Date;
  memberId: number;
  bookId: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  returnDate: Date | null;

  book: {
    id: number;
    title: string;
    author: string;
    stock: number;
    cover: string;
    description: string | null;
    genreId: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };

  member: {
    id: number;
    name: string;
    address: string;
    phone: string;
    membershipId: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
};

