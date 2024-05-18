'use client';

import { Avatar, Icon, Img, VStack, Text, Flex, Spacer, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { GetUserByUserIdResponse, getUserByUserId } from '@/app/league/_actions/queries/GetUserByUserId';
import { teamIconUriList } from '@/app/league/_constants/Constants';

const initialUserData: GetUserByUserIdResponse = {
  id: -1,
  name: 'sampleName',
  leagueId: -1,
  teamLeagueId: null,
  teamName: null,
  matchUserResultList: [],
  Team: null,
};

const UserPage = ({ params }: { params: { leagueId: string; userId: string } }) => {
  const userId = Number(params.userId);
  const [userData, setUserData] = useState<GetUserByUserIdResponse>(initialUserData);
  const [isLoading, setIsLoading] = useState(true);

  const iconUriIndex = userData?.Team?.iconUriIndex;
  const { gameCount, averageRank, rankingProbabilities, totalPoint } = userDataToDisplayData(userData);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponseUser = await getUserByUserId(userId);
      if (apiResponseUser) {
        setUserData(apiResponseUser);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId]);

  return (
    <VStack mt="3rem">
      {iconUriIndex !== undefined ? (
        <Avatar
          icon={<Img src={teamIconUriList[iconUriIndex]} boxSize="7rem" />}
          objectFit="contain"
          bgColor="gray.200"
          size="2xl"
        />
      ) : (
        <Avatar icon={<Icon as={AiOutlineUser} boxSize="5rem" color="black" />} size="2xl" bgColor="gray.200" />
      )}
      <Skeleton isLoaded={!isLoading}>
        <Text fontSize="2rem" fontWeight="bold" textAlign="center">
          {userData?.name ?? 'サンプル名前'}
        </Text>
      </Skeleton>
      <Flex width="90%" mt="3rem">
        <Text>個人スコア</Text>
        <Spacer />
        <Skeleton isLoaded={!isLoading}>
          <Text>{totalPoint}</Text>
        </Skeleton>
      </Flex>

      <Flex width="90%">
        <Text>平均着順</Text>
        <Spacer />
        <Skeleton isLoaded={!isLoading}>
          <Text>{averageRank}</Text>
        </Skeleton>
      </Flex>
      <Flex width="90%" mb="3rem">
        <Text>ゲーム数</Text>
        <Spacer />
        <Skeleton isLoaded={!isLoading}>
          <Text>{gameCount}</Text>
        </Skeleton>
      </Flex>

      {/* 各着順の確率を表示する */}
      {rankingProbabilities.map((rankingProbability, index) => (
        <Flex width="90%" key={index}>
          <Text>{index + 1}位率</Text>
          <Spacer />
          <Skeleton isLoaded={!isLoading}>
            <Text>{rankingProbability}</Text>
          </Skeleton>
        </Flex>
      ))}
    </VStack>
  );
};

export default UserPage;

const userDataToDisplayData = (userData: GetUserByUserIdResponse) => {
  const gameCount = userData.matchUserResultList.length;
  let rankingCount = [0, 0, 0, 0];
  let totalRankSum = 0;
  let totalPoint = 0;

  for (const matchUserResult of userData.matchUserResultList) {
    rankingCount[matchUserResult.rank]++;
    totalRankSum += matchUserResult.rank;
    totalPoint += matchUserResult.point;
  }

  const rankingProbabilities = rankingCount.map((count) => (count / gameCount).toFixed(2));
  const averageRank = (totalRankSum / gameCount + 1).toFixed(2);

  return { gameCount, rankingProbabilities, averageRank, totalPoint };
};
