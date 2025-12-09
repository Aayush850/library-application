import { signOut } from "@/actions/user.actions";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <button className="cursor-pointer text-sm flex items-center px-4 py-2 gap-2 outline-none">
        <span>
          <LogOut />
        </span>
        Logout
      </button>
    </form>
  );
};

export default SignOutButton;
