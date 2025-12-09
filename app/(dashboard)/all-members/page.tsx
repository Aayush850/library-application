import Link from "next/link";
import { Button } from "@/components/ui/button";
import MembersTable from "./MembersTable";
import {  Plus } from "lucide-react";
import SearchForm from "@/components/shared/SearchForm";
import { findAllMembers } from "@/actions/member.actions";
import { ArrowLeft } from "lucide-react";
import MyPagination from "@/components/shared/Pagination";

const AllMembersPage = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const page = searchParams?.page;
  const { members, success, message, totalPages } = await findAllMembers(query, page);
  if (!success || !members) {
    return (
      <>
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        <div className="bg-card rounded-lg shadow p-8 text-center">
          <p className="text-xl text-destructive">{message}</p>
        </div>
      </>
    );
  }

  return (
    <main className="space-y-8">
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Members</h1>
          <p>Manage your library members.</p>
        </div>
        <Link href={"/all-members/new"}>
          <Button className="cursor-pointer">
            <Plus />
            Add New Member
          </Button>
        </Link>
      </header>
      <SearchForm placeholder="Search members by names..." />
      <div>
        {members.length >= 1 ? (
          <MembersTable members={members} />
        ) : (
          <div>No Members Found.</div>
        )}
      </div>
    {members.length>=1 && <MyPagination totalPages={totalPages as number}/>}
    </main>
  );
};

export default AllMembersPage;
