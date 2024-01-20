'use server';

import { prisma } from '@/infrastructures/prisma';

export const deleteSession = async (sessionId: number) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
