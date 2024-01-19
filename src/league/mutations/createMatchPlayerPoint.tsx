'use server';

import { prisma } from '@/infrastructures/prisma';

import { MatchPlayerPoint } from '../types';

export const createMatchPlayerPoint = async (matchResultId: number, matchPlayerData: MatchPlayerPoint[]) => {
  const playerData = matchPlayerData.map((playerData) => ({
    matchResultId,
    playerId: playerData.playerId,
    point: playerData.point,
  }));
  await prisma.matchPlayerPoint.createMany({ data: playerData });
};
