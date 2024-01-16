import { Card, CardBody, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

import { MatchResultList } from '@/components/organisms/MatchResultRow';
import { prisma } from '@/infrastructures/prisma';

const keioPage: NextPage = async () => {
  const matchResults = await prisma.matchResult.findMany({
    select: {
      id: true,
      createdAt: true,
      matchPlayerDatas: {
        select: {
          id: true,
          player: true,
          point: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return (
    <>
      <VStack>
        <Text fontSize={40}>慶王位</Text>
        <OrderedList>
          <ListItem>飯田</ListItem>
          <ListItem>安斎</ListItem>
          <ListItem>植木</ListItem>
          <ListItem>村岡</ListItem>
          <ListItem>竹下</ListItem>
        </OrderedList>
        <Text fontSize={40}>対戦結果</Text>{' '}
        <Card>
          <CardBody>
            <MatchResultList matchResults={matchResults} />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default keioPage;
