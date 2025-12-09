import MemberForm from "../shared/MemberForm";

const CreateNewMemberPage = async () => {
  return (
   <div className="space-y-8">
      <h1 className="text-3xl font-bold">Add New Member</h1>
      <MemberForm mode="Create"/>
    </div>
  );
};

export default CreateNewMemberPage;
