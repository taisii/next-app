'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/infrastructures/prisma';

export type UserWithMatchResultAndTeam = Prisma.UserGetPayload<{
  include: { matchUserResultList: true; Team: true };
}>;

export const getUserListByLeagueId = async (leagueId: number) => {
  const userList = prisma.user.findMany({
    where: {
      leagueId,
    },
    include: {
      matchUserResultList: true,
      Team: true,
    },
  });
  return userList;
};
