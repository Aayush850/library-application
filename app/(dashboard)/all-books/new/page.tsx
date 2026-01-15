"use server";
import BookForm from "../shared/BookForm";
import prisma from "@/db/prisma";

const AddNewBookPage = async () => {
  "use cache";
  const genres = await prisma.genre.findMany();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Add New Book</h1>
      <BookForm genres={genres} mode="Create" />
    </div>
  );
};

export default AddNewBookPage;
