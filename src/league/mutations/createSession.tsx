'use server';

import { prisma } from '@/infrastructures/prisma';

export const createSession = async (leagueId: number) => {
  const session = await prisma.session.create({ data: { leagueId } });
  return session;
};
