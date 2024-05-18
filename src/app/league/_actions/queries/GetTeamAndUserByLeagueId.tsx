'use server';

import { prisma } from '@/infrastructures/prisma';

export const GetTeamAndUserByLeagueId = async (leagueId: number) => {
  const league = await prisma.league.findFirst({
    where: {
      id: leagueId,
    },
    include: {
      userList: true,
      teamList: true,
    },
  });
  if (league) {
    return { userList: league.userList, teamList: league.teamList };
  } else {
    return { userList: [], teamList: [] };
  }
};
