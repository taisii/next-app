'use client';

import { Box, Button, VStack } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createMatch, createMatchObject } from '../../_actions/mutations/CreateMatch';
import { getLeagueUserList } from '../../_actions/queries/GetLeagueUsers';
import { UserPointInput } from '../../_components/UserPointInput';

const MatchLogPage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const searchParams = useSearchParams();
  const [selectedUserList, setSelectedUserIdList] = useState<User[]>([]);
  const [createMatchObjectList, setCreateMatchObjectList] = useState<createMatchObject[]>([]);

  const selectedUserIdList = searchParams.getAll('selectedUserId').map(Number);

  useEffect(() => {
    const fetchSelectedUserList = async () => {
      const ApiResponceUserList = await getLeagueUserList(leagueId);
      setSelectedUserIdList(ApiResponceUserList.filter((user) => selectedUserIdList.includes(user.id)));
    };

    fetchSelectedUserList();
  }, [leagueId, selectedUserIdList]);

  const handleClickDecisionButton = () => {
    const match = createMatch(createMatchObjectList);
    console.log(match);
  };

  return (
    <VStack mt="3rem">
      <Box>マッチを記録するためのページ</Box>
      {selectedUserList.map((user) => (
        <UserPointInput
          key={user.id}
          user={user}
          setCreateMatchObjectList={setCreateMatchObjectList}
          createMatchObjectList={createMatchObjectList}
        />
      ))}
      <Button
        position="fixed"
        bottom={0}
        mb="2rem"
        width="90%"
        justifySelf="flex-end"
        onClick={handleClickDecisionButton}
      >
        決定
      </Button>
    </VStack>
  );
};

export default MatchLogPage;
