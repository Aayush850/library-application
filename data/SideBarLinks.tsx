import { Library, Users, ArrowRightLeft, LucideHome } from "lucide-react";

interface SidebarLinks {
  title: string;
  link: string;
  icon: React.ReactElement;
}

export const sidebarLinks: SidebarLinks[] = [
  {
    title: "Home",
    link: "/",
    icon: <LucideHome />,
  },
  {
    title: "All Books",
    link: "/all-books",
    icon: <Library />,
  },
  {
    title: "All Members",
    link: "/all-members",
    icon: <Users />,
  },
  {
    title: "Borrow Records",
    link: "/borrow-records",
    icon: <ArrowRightLeft />,
  },
];
