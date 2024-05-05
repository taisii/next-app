'use server';

import { prisma } from '@/infrastructures/prisma';

export const getUserListWithMatchResultByLeagueId = async (leagueId: number) => {
  const userList = prisma.user.findMany({
    where: {
      leagueId,
    },
    include: {
      matchUserResultList: true,
    },
  });
  return userList;
};
