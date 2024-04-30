'use server';

import { prisma } from '@/infrastructures/prisma';

export const createLeague = async (nameList: string[]) => {
  const nameListObject = nameList.map((name) => ({ name }));
  const league = await prisma.league.create({
    data: {
      userList: {
        createMany: {
          data: nameListObject,
        },
      },
    },
  });
  return league;
};
