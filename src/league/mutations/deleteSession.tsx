'use server';

import { revalidateTag } from 'next/cache';

import { prisma } from '@/infrastructures/prisma';

export const deleteSession = async (sessionId: number) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
  revalidateTag('session');
};
