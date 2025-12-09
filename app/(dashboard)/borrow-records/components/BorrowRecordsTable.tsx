import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type BorrowRecord } from "@/types";
import { MarkReturnedDialog } from "./MarkAsReturnedDialog";
import { markBorrowRecordAsReturned } from "@/actions/borrow-records.actions";

type BorrowRecordsTableProps = {
  records: BorrowRecord[];
};

const getStatus = (record: BorrowRecord) => {
  if (record.returnDate) return "Returned";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(record.dueDate);
  due.setHours(0, 0, 0, 0);

  return due < today ? "Overdue" : "Active";
};

const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";

  switch (status) {
    case "Returned":
      return <span className={`${base} bg-green-100 text-green-700`}>Returned</span>;
    case "Overdue":
      return <span className={`${base} bg-red-100 text-red-700`}>Overdue</span>;
    default:
      return <span className={`${base} bg-blue-100 text-blue-700`}>Active</span>;
  }
};

const BorrowRecordsTable: React.FC<BorrowRecordsTableProps> = ({ records }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-12">
          <TableHead>Member</TableHead>
          <TableHead>Book</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {records.map((record) => {
          const status = getStatus(record);

          return (
            <TableRow key={record.id} className="h-12">
              <TableCell className="font-medium align-middle">
                {record.member.name}
              </TableCell>

              <TableCell className="font-medium align-middle">
                {record.book.title}
              </TableCell>

              <TableCell className="align-middle">
                {record.dueDate.toDateString()}
              </TableCell>

              <TableCell className="align-middle">
                {record.returnDate ? (
                  record.returnDate.toDateString()
                ) : (
                  <span>Not Returned</span>
                )}
              </TableCell>

              <TableCell className="align-middle">
                <StatusBadge status={status} />
              </TableCell>

              <TableCell className="text-right align-middle">
                <div className="flex gap-2 justify-end items-center">
                  {!record.returnDate && (
                    <MarkReturnedDialog
                      id={`${record.id}`}
                      action={markBorrowRecordAsReturned}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BorrowRecordsTable;
