"use client";
import { sidebarLinks } from "@/data/SideBarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./SignOutButton";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen py-16 sticky top-0">
      <div className="px-4 mx-auto space-y-8 flex flex-col justify-between h-full">
        <div className="space-y-8">
          <header className="flex items-center gap-2">
            <Image src={"/logo.png"} alt="ShelfMaster" width={48} height={48}/>
            <h1 className="text-primary font-bold text-2xl">ShelfMaster</h1>
          </header>
          
        </div>
        <div>
          <ul className="space-y-8">
            {sidebarLinks.map((sidebarLink, index) => {
              return (
                <li key={index}>
                  <Link
                    href={sidebarLink.link}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
                     `/${pathname.split("/")[1]}`  === sidebarLink.link &&
                      " bg-primary text-background"
                    }`}
                  >
                    <span>{sidebarLink.icon}</span>
                    {sidebarLink.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-8">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
