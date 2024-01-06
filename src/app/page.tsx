import { MemberList } from '@/components/MemberList';
import { SpreadSheet } from '@/components/SpreadSheet';
import { Card, CardBody, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';

const HomePage: NextPage = async () => {
  return (
    <>
      <VStack>
        <Text fontSize="4xl">What is M.LEAGUE</Text>
        <Text fontSize="sm">いま、最高の個人競技が、最高の団体競技になる。</Text>
        <Card>
          <CardBody>
            <MemberList />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <SpreadSheet />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default HomePage;
