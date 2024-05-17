'use client';

import { Box, Button, VStack } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createMatch } from '../../_actions/mutations/CreateMatch';
import { getUserListByLeagueId } from '../../_actions/queries/GetUserListByLeagueId';
import { UserPointInput } from '../../_components/UserPointInput';

export type MatchResult = {
  userId: number;
  point: number;
};

const MatchLogPage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const searchParams = useSearchParams();
  const [selectedUserList, setSelectedUserIdList] = useState<User[]>([]);
  const [matchResultList, setMatchResultList] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const selectedUserIdList = searchParams.getAll('selectedUserId').map(Number);
  const isInvalidSubmit = matchResultList.length !== selectedUserIdList.length;

  useEffect(() => {
    const fetchSelectedUserList = async () => {
      const ApiResponceUserList = await getUserListByLeagueId(leagueId);
      setSelectedUserIdList(ApiResponceUserList.filter((user) => selectedUserIdList.includes(user.id)));
    };

    fetchSelectedUserList();
  }, [leagueId, selectedUserIdList]);

  const handleClickDecisionButton = async () => {
    setIsLoading(true);
    const sortedMatchResultList = [...matchResultList].sort((a, b) => b.point - a.point);
    const createMatchObjectList = sortedMatchResultList.map((matchResult, index) => ({
      rank: index + 1,
      ...matchResult,
    }));
    const match = await createMatch(leagueId, createMatchObjectList);
    router.replace(`/league/${leagueId}`);
  };

  return (
    <VStack mt="3rem">
      <Box fontSize="2rem" fontWeight="bold">
        Record
      </Box>
      {selectedUserList.map((user) => (
        <UserPointInput
          key={user.id}
          user={user}
          setMatchResultList={setMatchResultList}
          matchResultList={matchResultList}
        />
      ))}
      <Button
        isDisabled={isInvalidSubmit}
        isLoading={isLoading}
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
