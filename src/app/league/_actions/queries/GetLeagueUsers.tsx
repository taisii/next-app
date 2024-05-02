'use server';

import { prisma } from '@/infrastructures/prisma';

export const getLeagueUsers = async (leagueId: number) => {
  const users = prisma.user.findMany({
    where: {
      leagueId,
    },
  });
  return users;
};
