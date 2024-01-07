import { RecordList } from '@/components/RecordList';
import { prisma } from '@/infrastructures/prisma';
import { Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

const RecordPage: NextPage = async () => {
  const records = await prisma.record.findMany();
  console.log(records);
  return (
    <>
      <VStack>
        <Text fontSize="4xl">麻雀記録ページ</Text>
        <Text fontSize="xl">最近の記録</Text>
        <Card>
          <CardBody>
            <RecordList records={records} />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default RecordPage;
