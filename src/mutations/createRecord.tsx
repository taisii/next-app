'use server';

import { prisma } from '@/infrastructures/prisma';

export interface RecordInput {
  point: number;
  top: number;
  second: number;
  three: number;
  four: number;
}

export const createRecord = async ({ point, top, second, three, four }: RecordInput): Promise<void> => {
  await prisma.record.create({
    data: {
      point,
      top,
      second,
      three,
      four,
    },
  });
};
