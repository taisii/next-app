'use server';

import { prisma } from '@/infrastructures/prisma';

export type createMatchObject = {
  userId: number;
  rank: number;
  point: number;
};

export const createMatch = async (createMatchObjectList: createMatchObject[]) => {
  const match = await prisma.match.create({
    data: {
      matchUserResultList: {
        createMany: {
          data: createMatchObjectList,
        },
      },
    },
  });
  return match;
};
