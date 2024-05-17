'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/infrastructures/prisma';

export type GetUserListWithMatchResultByLeagueIdResponce = Prisma.UserGetPayload<{
  include: { matchUserResultList: true };
}>[];

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
