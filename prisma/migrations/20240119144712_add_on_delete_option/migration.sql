-- DropForeignKey
ALTER TABLE "MatchPlayerPoint" DROP CONSTRAINT "MatchPlayerPoint_matchResultId_fkey";

-- DropForeignKey
ALTER TABLE "MatchPlayerPoint" DROP CONSTRAINT "MatchPlayerPoint_playerId_fkey";

-- DropForeignKey
ALTER TABLE "MatchResult" DROP CONSTRAINT "MatchResult_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_leagueId_fkey";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayerPoint" ADD CONSTRAINT "MatchPlayerPoint_matchResultId_fkey" FOREIGN KEY ("matchResultId") REFERENCES "MatchResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayerPoint" ADD CONSTRAINT "MatchPlayerPoint_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
