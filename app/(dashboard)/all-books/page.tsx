import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SearchForm from "@/components/shared/SearchForm";
import { findAllBooks } from "@/actions/book.actions";
import MyPagination from "@/components/shared/Pagination";
const AllBooksPage = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const page = searchParams?.page;
  const { books,totalPages } = await findAllBooks(query,page);
  return (
    <main className="space-y-8">
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Library</h1>
          <p>Manage your book collection.</p>
        </div>
        <Link href={"/all-books/new"}>
          <Button className="cursor-pointer">
            <Plus />
            Add New Book
          </Button>
        </Link>
      </header>
      <SearchForm placeholder="Search books by title..." />
      {books.length < 1 ?<div>
        No books found.
      </div>: <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {books.map((book) => {
          return (
            <Link key={book.id} href={`/all-books/${book.id}`}>
              <Card>
                <CardContent className="space-y-2">
                  <Image
                    src={book.cover}
                    alt="book-cover"
                    height={300}
                    width={200}
                    className="w-[200px] h-[300px] object-cover mx-auto"
                  />
                  <CardTitle>{book.title}</CardTitle>
                  <p className="text-muted-foreground">{book.author}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>}
     {books.length>=1 && <MyPagination totalPages={totalPages}/>}
    </main>
  );
};

export default AllBooksPage;
