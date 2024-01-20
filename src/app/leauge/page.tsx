import { Text } from '@chakra-ui/react';
import { NextPage } from 'next';

import { CreateLeagueForm } from '@/league/components/CreateLeagueForm';

const LeaguePage: NextPage = async () => {
  return (
    <>
      <Text fontSize={40}>リーグ作成</Text>
      <CreateLeagueForm />
    </>
  );
};

export default LeaguePage;
