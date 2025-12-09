import BorrowRecordForm from "../components/BorrowRecordForm";

const CreateNewBorrowRecordPage = async () => {
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">Create New Borrow Record</h1> 
      <BorrowRecordForm/>
    </main>
  );
};

export default CreateNewBorrowRecordPage;
