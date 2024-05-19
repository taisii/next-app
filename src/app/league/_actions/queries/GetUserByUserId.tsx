'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/infrastructures/prisma';

export type GetUserByUserIdResponse = Prisma.UserGetPayload<{ include: { matchUserResultList: true; Team: true } }>;

export const getUserByUserId = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      matchUserResultList: true,
      Team: true,
    },
  });
  return user ?? undefined;
};
