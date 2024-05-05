'use server';

import { prisma } from '@/infrastructures/prisma';

export const getUserListByLeagueId = async (leagueId: number) => {
  const userList = prisma.user.findMany({
    where: {
      leagueId,
    },
  });
  return userList;
};
