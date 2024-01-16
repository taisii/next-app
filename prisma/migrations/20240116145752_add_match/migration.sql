-- CreateTable
CREATE TABLE "matchResult" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "matchResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matchPlayerData" (
    "id" SERIAL NOT NULL,
    "playerid" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,
    "matchResultId" INTEGER,

    CONSTRAINT "matchPlayerData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matchPlayerData" ADD CONSTRAINT "matchPlayerData_matchResultId_fkey" FOREIGN KEY ("matchResultId") REFERENCES "matchResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;
