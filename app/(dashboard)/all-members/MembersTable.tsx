import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteMember } from "@/actions/member.actions";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import Link from "next/link";
import { type Member } from "@/types";
import { Edit2 } from "lucide-react";

type MembersTableProp = {
  members: Member[];
};

const MembersTable: React.FC<MembersTableProp> = ({ members }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Member ID</TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-bold">{member.membershipId}</TableCell>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell className="text-muted-foreground">{member.address}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/all-members/edit/${member.id}`}>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteDialog action={deleteMember} id={`${member.id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MembersTable;