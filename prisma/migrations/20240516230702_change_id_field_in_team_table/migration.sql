/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[leagueId,name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leagueId,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamId",
ADD COLUMN     "teamLeagueId" INTEGER,
ADD COLUMN     "teamName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_leagueId_name_key" ON "Team"("leagueId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "User_leagueId_name_key" ON "User"("leagueId", "name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamLeagueId_teamName_fkey" FOREIGN KEY ("teamLeagueId", "teamName") REFERENCES "Team"("leagueId", "name") ON DELETE SET NULL ON UPDATE CASCADE;
