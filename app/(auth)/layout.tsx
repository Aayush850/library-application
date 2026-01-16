import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    return redirect("/");
  }
  return (
    <main className="flex justify-center items-center min-h-screen mx-8">
      <Card className="w-full max-w-[450px] gap-0">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image src={"/logo.png"} alt="ShelfMaster" width={64} height={64} />
          <CardTitle className="text-center text-2xl font-normal">
            Get started with ShelfMaster!
          </CardTitle>
        </CardHeader>
        {children}
      </Card>
    </main>
  );
};

export default AuthLayout;
