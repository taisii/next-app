/*
  Warnings:

  - You are about to drop the column `playerid` on the `matchPlayerData` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `matchPlayerData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matchPlayerData" DROP COLUMN "playerid",
ADD COLUMN     "playerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "matchPlayerData" ADD CONSTRAINT "matchPlayerData_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
