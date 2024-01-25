'use server';
import { prisma } from '@/infrastructures/prisma';

export const createPlayers = async (playerNames: string[], leagueId: number) => {
  const playerDatas = playerNames.map((playerName) => {
    return { name: playerName, leagueId };
  });
  const players = await prisma.player.createMany({
    data: playerDatas,
  });
  return players;
};
