import Sidebar from "@/components/shared/Sidebar";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return redirect("/sign-in");
  }
  return (
<main className="grid grid-cols-[240px_1fr] min-h-screen">
  <div>
    <Sidebar />
  </div>
  <div className="bg-muted py-16 px-8">
    {children}
  </div>
</main>

  );
};

export default DashboardLayout;
