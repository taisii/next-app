'use server';
import { prisma } from '@/infrastructures/prisma';

export const createMatchResult = async (sessionId: number) => {
  const matchResult = await prisma.matchResult.create({ data: { sessionId } });
  return matchResult;
};
