import { Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

import { CreateLeagueForm } from '@/league/components/CreateLeagueForm';

const LeagueInitPage: NextPage = async () => {
  return (
    <>
      <VStack>
        <Text fontSize={40}>リーグ作成</Text>
        <CreateLeagueForm />
      </VStack>
    </>
  );
};

export default LeagueInitPage;
