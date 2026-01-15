import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BorrowRecordsTable from "./components/BorrowRecordsTable";
import { findAllBorrowRecords } from "@/actions/borrow-records.actions";
import SearchForm from "@/components/shared/SearchForm";
import MyPagination from "@/components/shared/Pagination";
import { getCurrentUser } from "@/utils/getCurrentUser";
const BorrowRecords = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const user = await getCurrentUser();
  const query = searchParams?.query;
  const page = searchParams?.page;
  const { records, totalPages } = await findAllBorrowRecords(
    user.id,
    query,
    page
  );
  return (
    <main className="space-y-8">
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Borrow Records</h1>
          <p>Track and manage book loans and returns.</p>
        </div>
        <Link href={"/borrow-records/new"}>
          <Button className="cursor-pointer">
            <Plus />
            Create New Record
          </Button>
        </Link>
      </header>
      <SearchForm placeholder="Search records by member name..." />
      <div>
        {records.length >= 1 ? (
          <BorrowRecordsTable records={records} />
        ) : (
          <div>No records found.</div>
        )}
      </div>
      {records.length >= 1 && <MyPagination totalPages={totalPages} />}
    </main>
  );
};

export default BorrowRecords;
