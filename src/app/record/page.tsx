import { Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

import { RecordForm } from '@/components/RecordForm';
import { RecordList } from '@/components/RecordList';
import { prisma } from '@/infrastructures/prisma';

export const dynamic = 'force-dynamic';

const RecordPage: NextPage = async () => {
  const records = await prisma.record.findMany({
    orderBy: { createdAt: 'desc' },
  });
  let pointSum = 0;
  let averageRank = 0;
  let gemeCount = 0;
  for (const record of records) {
    pointSum += record.point;
    averageRank += 1 * record.top + 2 * record.second + 3 * record.three + 4 * record.four;
    gemeCount += record.top + record.second + record.three + record.four;
  }
  return (
    <>
      <VStack>
        <Text fontSize="4xl">麻雀記録ページ</Text>
        <Text fontSize="xl">最近の記録</Text>
        <Card>
          <CardBody>
            <RecordList records={records.slice(0, 5)} />
          </CardBody>
        </Card>
        <Text fontSize="xl">平均順位</Text>
        <Text>{averageRank / gemeCount}</Text>
        <Text fontSize="xl">獲得ポイント</Text>
        <Text>{pointSum}</Text>
        <Card>
          <CardBody>
            <RecordForm />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default RecordPage;
