import Sidebar from "@/components/shared/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-[240px_1fr] min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="bg-muted py-16 px-8">{children}</div>
    </main>
  );
};

export default DashboardLayout;
