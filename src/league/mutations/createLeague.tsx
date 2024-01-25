'use server';

import { prisma } from '@/infrastructures/prisma';

export const createLeague = async (leagueName: string) => {
  const league = await prisma.league.create({
    data: {
      name: leagueName,
    },
  });
  return league;
};
