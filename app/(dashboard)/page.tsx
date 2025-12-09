import { getBorrowStats } from "@/actions/borrow-records.actions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Book,
  Users2,
  Handshake,
  CircleAlert,
  UserPlus,
  Clock,
} from "lucide-react";
import BarChartComponent from "@/components/shared/BarChart";
import { getDashboardData } from "@/actions/dashboard.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const { totalBooks, totalMembers, activeBorrows, overDue, recentMembers } =
    await getDashboardData();
  const borrowStats = await getBorrowStats();
  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground font-bold">
                Total Books
              </p>
              <h1 className="text-lg font-bold">{totalBooks}</h1>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Book className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground font-bold">
                Total Members
              </p>
              <h1 className="text-lg font-bold">{totalMembers}</h1>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground font-bold">
                Active Borrows
              </p>
              <h1 className="text-lg font-bold">{activeBorrows}</h1>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground font-bold">Overdue</p>
              <h1 className="text-lg font-bold">{overDue}</h1>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <CircleAlert className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-4">
            <CardTitle>Last 7 Days Borrow Activity</CardTitle>
            <BarChartComponent data={borrowStats} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col h-full">
            <CardTitle className="flex gap-1 items-center">
              <UserPlus className="w-5 h-5 text-green-600 mr-2" />
              New Members
            </CardTitle>

            <div className="flex flex-1 items-center justify-center">
              <div className="space-y-3 w-full">
                {recentMembers.length < 1 ? (
                  <div className="p-6 text-center bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      No members yet. Add your first member!
                    </p>
                    <Link href="/all-members/new">
                      <Button className="cursor-pointer">Add Member</Button>
                    </Link>
                  </div>
                ) : (
                  recentMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start justify-between p-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {member.membershipId}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.phone}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {member.createdAt.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
