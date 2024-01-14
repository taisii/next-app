'use server';

import { revalidateTag } from 'next/cache';

import { prisma } from '@/infrastructures/prisma';

export const deleteRecord = async (id: number) => {
  await prisma.record.delete({
    where: {
      id,
    },
  });
  revalidateTag('record');
};
