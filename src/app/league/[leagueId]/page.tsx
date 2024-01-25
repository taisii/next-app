import { Card, CardBody, StackDivider, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

import { prisma } from '@/infrastructures/prisma';
import { RankingDisplay } from '@/league/components/RankingDisplay';
import { SessionForm } from '@/league/components/SessionForm';
import { SessionList } from '@/league/components/SessionList';

export const dynamic = 'force-dynamic';

interface Props {
  params: { leagueId: string };
}

const LeaguePage: NextPage<Props> = async ({ params }) => {
  const leagueId = Number(params.leagueId);
  const players = await prisma.player.findMany({
    where: {
      leagueId,
    },
    select: {
      name: true,
      MatchPlayerPoints: true,
      id: true,
    },
  });

  const league = await prisma.league.findUnique({
    where: {
      id: leagueId,
    },
    select: {
      name: true,
      sessions: {
        include: {
          matchResults: {
            include: {
              MatchPlayerPoints: true,
            },
          },
        },
      },
    },
  });

  if (!league) {
    return <></>;
  }
  return (
    <>
      <VStack>
        <Text fontSize={40}>{league.name}</Text>
        <RankingDisplay players={players} leagueId={leagueId} />
        <Text fontSize={40}>対戦結果</Text>
        <Card>
          <CardBody>
            <VStack divider={<StackDivider borderColor="gray.200" />}>
              {league.sessions.map((session) => {
                return <SessionList key={session.id} session={session} players={players} />;
              })}
            </VStack>
          </CardBody>
        </Card>
        <Text fontSize={40}>入力</Text>
        <Card m={4}>
          <CardBody>
            <SessionForm players={players} leagueId={leagueId} />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default LeaguePage;
