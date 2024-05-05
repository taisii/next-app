'use server';

import { prisma } from '@/infrastructures/prisma';

export type createMatchObject = {
  userId: number;
  rank: number;
  point: number;
};

export const createMatch = async (leagueId: number, createMatchObjectList: createMatchObject[]) => {
  const match = await prisma.match.create({
    data: {
      leagueId,
      matchUserResultList: {
        createMany: {
          data: createMatchObjectList,
        },
      },
    },
  });
  return match;
};
