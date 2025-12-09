import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { deleteBook, getBookById } from "@/actions/book.actions";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
const { book,success,message} = await getBookById(id)

  if (!book || !success) {
    return (
      <div>
        <Link href="/all-books" className="inline-flex items-center gap-2 mb-6">
          <ArrowLeft size={20} />
          Back to Library
        </Link>
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <p className="text-xl text-destructive">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link href="/all-books" className="inline-flex items-center gap-2 mb-6">
        <ArrowLeft size={20} />
        Back to Library
      </Link>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative aspect-2/3 md:aspect-auto md:min-h-[600px]">
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              by {book.author}
            </p>

            <div className="mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-secondary">
                {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {book.description ? (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {book.description}
                </p>
              </div>
            ) : (
              <div className="mb-8 p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground italic">
                  No description available
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Link href={`/all-books/edit/${book.id}`}>
                <Button className="w-full cursor-pointer">
                  <Edit2 size={18} />
                  Edit Book
                </Button>
              </Link>
              <DeleteDialog id={id} action={deleteBook} title="Delete Book" redirect_path="/all-books"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
