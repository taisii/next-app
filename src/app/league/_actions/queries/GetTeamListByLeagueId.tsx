'use server';
import { Prisma } from '@prisma/client';

import { prisma } from '@/infrastructures/prisma';

export type GetTeamListLeagueIdResponce = Prisma.TeamGetPayload<{
  include: {
    memberList: {
      include: {
        matchUserResultList: true;
      };
    };
  };
}>;

export const getTeamListByLeagueId = async (leagueId: number) => {
  const teamList = await prisma.team.findMany({
    where: {
      leagueId,
    },
    include: {
      memberList: {
        include: {
          matchUserResultList: true,
        },
      },
    },
  });
  return teamList;
};
