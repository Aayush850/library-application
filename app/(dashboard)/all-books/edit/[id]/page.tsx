import prisma from "@/db/prisma";
import BookForm from "../../shared/BookForm";
import { getBookById } from "@/actions/book.actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EditBookPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const {id} =  await params;
  const genres = await prisma.genre.findMany();
  const {book,success,message} = await getBookById(id)
   if (!book || !success) {
    return (
      <>
        <Link href="/all-books" className="inline-flex items-center gap-2 mb-6">
          <ArrowLeft size={20} />
          Back to Library
        </Link>
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <p className="text-xl text-destructive">{message}</p>
        </div>
      </>
    );
  }
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Edit Book</h1>
      <BookForm genres={genres} mode="Edit" existingBook={book}/>
    </div>
  );
};

export default EditBookPage;
