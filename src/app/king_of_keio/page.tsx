import { Card, CardBody, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

import { prisma } from '@/infrastructures/prisma';

export const dynamic = 'force-dynamic';

const LEAGUE_ID = 1;

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
  const playerTotalPoints: { name: String; totalPoint: number }[] = [];

  for (const player of players) {
    let playerPoint = 0;
    for (const matchPlayerPoint of player.MatchPlayerPoints) {
      playerPoint += matchPlayerPoint.point;
    }
    playerTotalPoints.push({ name: player.name, totalPoint: playerPoint });
  }
  playerTotalPoints.sort((a, b) => b.totalPoint - a.totalPoint);
  return (
    <>
      <VStack>
        <Text fontSize={40}>慶王位</Text>
        <OrderedList>
          {playerTotalPoints.map((playerTotalPoint) => {
            return <ListItem key={playerTotalPoint.totalPoint}>{playerTotalPoint.name}</ListItem>;
          })}
        </OrderedList>
        <Text fontSize={40}>対戦結果</Text>{' '}
        <Card>
          <CardBody>
            {league.sessions.map((session) => {
              return <Text key={session.id}>aaa</Text>;
            })}
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default keioPage;
