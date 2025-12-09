import { findMemberById } from "@/actions/member.actions";
import MemberForm from "../../shared/MemberForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
const CreateNewMemberPage = async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params;
  const {success,member,message} = await findMemberById(id)
  if(!success || !member){
      return (
      <div>
        <Link href="/all-members" className="inline-flex items-center gap-2 mb-6">
          <ArrowLeft size={20} />
          Back to All Members
        </Link>
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <p className="text-xl text-destructive">{message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Edit Member</h1>
      <MemberForm mode="Edit" existingMember={member}/>
    </div>
  );
};

export default CreateNewMemberPage;
