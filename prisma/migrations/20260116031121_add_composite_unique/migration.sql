/*
  Warnings:

  - A unique constraint covering the columns `[membershipId,userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Member_membershipId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipId_userId_key" ON "Member"("membershipId", "userId");
