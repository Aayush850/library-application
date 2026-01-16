import { getCurrentUser } from "@/utils/getCurrentUser";
import BorrowRecordForm from "../components/BorrowRecordForm";

const CreateNewBorrowRecordPage = async () => {
  const user = await getCurrentUser();
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">Create New Borrow Record</h1>
      <BorrowRecordForm userId={user.id} />
    </main>
  );
};

export default CreateNewBorrowRecordPage;
