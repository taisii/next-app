'use client';

import { VStack, Text, Box, Icon, HStack, Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { PiCrownThin } from 'react-icons/pi';

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
  if (userRankingObjectList.length === 0) {
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
  }
  const topUser = userRankingObjectList[0];
  const otherUserList = userRankingObjectList.slice(1);
  return (
    <>
      <Text fontSize="2rem" fontWeight="bold" textAlign="center" mt="3rem" mb="3rem">
        Ranking
      </Text>
      <VStack>
        <HStack width="90%" borderWidth={1} borderRadius={40} p="1rem" borderColor="black">
          <Icon as={AiOutlineUser} mr="2rem" boxSize="4rem" />
          <Icon as={PiCrownThin} mr="2rem" boxSize="2rem" position="absolute" top={100} left={51} />
          <VStack>
            <Text fontSize="2xl">{topUser.userName}</Text>
            <Text>{topUser.point}</Text>
          </VStack>
        </HStack>
        {otherUserList.map((userRankingObject, index) => (
          <Flex key={index} flexDir="row" width="90%" alignItems="center" mt="0.5rem">
            <Box width="10%" fontSize="lg" ml="1rem">
              {index + 2}
            </Box>
            <Icon as={AiOutlineUser} mr="2rem" boxSize="2rem" />
            <Text>{userRankingObject.userName}</Text>
            <Spacer />
            <Text mr="1rem">{userRankingObject.point}</Text>
          </Flex>
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
