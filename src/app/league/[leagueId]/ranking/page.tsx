'use client';

import { VStack, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getUserListWithMatchResultByLeagueId } from '../../_actions/queries/GetUserListWithMatchResultByLeagueId';

type UserRankingObject = {
  userName: string;
  userId: number;
  point: number;
};

const RankingPage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [userRankingObjectList, setUserRankingObjectList] = useState<UserRankingObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponceUserList = await getUserListWithMatchResultByLeagueId(leagueId);
      setUserRankingObjectList(apiResponceToUserRankingObjectList(apiResponceUserList));
    };
    fetchData();
  }, []);

  return (
    <>
      <Text fontSize="2rem" fontWeight="bold" textAlign="center" mt="3rem">
        Ranking
      </Text>
      <VStack>
        {userRankingObjectList.map((userRankingObject) => (
          <Box key={userRankingObject.userId}>{userRankingObject.userName}</Box>
        ))}
      </VStack>
    </>
  );
};

export default RankingPage;

const apiResponceToUserRankingObjectList = (
  apiResponce: ({
    matchUserResultList: {
      id: number;
      userId: number;
      matchId: number | null;
      rank: number;
      point: number;
    }[];
  } & {
    id: number;
    name: string;
    leagueId: number;
    teamId: number | null;
  })[]
) => {
  const rankingObjectList: {
    point: number;
    userId: number;
    userName: string;
  }[] = [];
  for (const user of apiResponce) {
    const { id, matchUserResultList, name } = user;
    let point = 0;
    for (const matchUserResult of matchUserResultList) {
      point += matchUserResult.point;
    }
    rankingObjectList.push({ userId: id, userName: name, point });
  }
  return rankingObjectList.sort((a, b) => b.point - a.point);
};
