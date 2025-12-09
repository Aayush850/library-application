import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="grid place-content-center h-screen">
      <Card className="p-8">
        <CardContent className="flex flex-col items-center space-y-4">
          <Image width={48} height={48} src={"/logo.png"} alt="logo" />
          <CardTitle className="text-2xl">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-destructive text-lg">The page you are looking for doesn't exist.</CardDescription>
          <Link href={"/"}><Button variant={"outline"} className="cursor-pointer" size={"lg"}>Back Home</Button></Link>
        </CardContent>
      </Card>
    </main>
  );
};
export default NotFoundPage;
