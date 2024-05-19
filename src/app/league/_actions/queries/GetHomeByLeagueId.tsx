'use server';

import { User } from '@prisma/client';

import { prisma } from '@/infrastructures/prisma';

import { UserWithMatchResultAndTeam } from './GetUserListByLeagueId';

export const GetHomeByLeagueId = async (leagueId: number) => {
  const league = await prisma.league.findFirst({
    where: {
      id: leagueId,
    },
    include: {
      userList: { include: { matchUserResultList: true, Team: true } },
      teamList: true,
      matchList: {
        include: {
          matchUserResultList: true,
        },
        orderBy: {
          date: 'asc',
        },
      },
    },
  });
  const userList: User[] =
    league?.userList.map(({ id, name, leagueId, teamLeagueId, teamName }) => ({
      id,
      name,
      leagueId,
      teamLeagueId,
      teamName,
    })) ?? [];
  const matchList = league?.matchList ?? [];
  const teamList = league?.teamList ?? [];
  const userListWitchMatchAndTeam: UserWithMatchResultAndTeam[] = league?.userList ?? [];
  return { userList, matchList, teamList, userListWitchMatchAndTeam };
};
