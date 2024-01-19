import { Card, CardBody, StackDivider, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

import { prisma } from '@/infrastructures/prisma';
import { RankingDisplay } from '@/league/components/RankingDisplay';
import { SessionForm } from '@/league/components/SessionForm';
import { SessionList } from '@/league/components/SessionList';

export const dynamic = 'force-dynamic';

export const LEAGUE_ID = 1;

const keioPage: NextPage = async () => {
  const players = await prisma.player.findMany({
    where: {
      leagueId: LEAGUE_ID,
    },
    select: {
      name: true,
      MatchPlayerPoints: true,
    },
  });

  const league = await prisma.league.findUnique({
    where: {
      id: LEAGUE_ID,
    },
    select: {
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
        <Text fontSize={40}>慶王位</Text>
        <RankingDisplay players={players} />
        <Text fontSize={40}>対戦結果</Text>
        <Card>
          <CardBody>
            <VStack divider={<StackDivider borderColor="gray.200" />}>
              {league.sessions.map((session) => {
                return <SessionList key={session.id} session={session} />;
              })}
            </VStack>
          </CardBody>
        </Card>
        <Text fontSize={40}>入力</Text>
        <Card>
          <CardBody>
            <SessionForm leagueId={LEAGUE_ID} />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default keioPage;
