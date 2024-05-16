'use server';

import { prisma } from '@/infrastructures/prisma';

import { AddingTeam, AddingUser } from '../../page';

export const createLeague = async (addingTeamList: AddingTeam[], addingUserList: AddingUser[]) => {
  const transaction = prisma.$transaction(async (db) => {
    /* リーグ作成 */
    const league = await db.league.create({ data: {} });

    /* チーム作成 */
    const addingTeamQueryList = addingTeamList.map((addingTeam) => ({
      leagueId: league.id,
      iconUriIndex: addingTeam.iconUriIndex,
      name: addingTeam.name,
    }));
    const teamList = await db.team.createMany({
      data: addingTeamQueryList,
    });

    /* ユーザー作成 */
    const userListQuery = addingUserList.map((user) => ({
      name: user.userName,
      leagueId: league.id,
      teamLeagueId: league.id,
      teamName: user.teamName,
    }));
    const userList = await db.user.createMany({
      data: userListQuery,
    });
    return { league, teamList, userList };
  });

  return transaction;
};
