'use server';

import { prisma } from '@/infrastructures/prisma';

export const getMatchListByLeagueId = async (leagueId: number) => {
  const matchList = await prisma.match.findMany({
    where: {
      leagueId,
    },
    include: {
      matchUserResultList: {
        orderBy: {
          userId: 'asc',
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
  return matchList;
};
