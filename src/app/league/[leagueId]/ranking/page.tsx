'use client';

import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { UserWithMatchResultAndTeam, getUserListByLeagueId } from '../../_actions/queries/GetUserListByLeagueId';
import { RankingDisplay, RankingObject } from '../../_components/RankingDisplay';

const RankingPage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [rankingObjectList, setRankingObjectList] = useState<RankingObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponceUserList = await getUserListByLeagueId(leagueId);
      setRankingObjectList(apiResponceToRankingObjectList(apiResponceUserList));
    };
    fetchData();
  }, [leagueId]);

  return (
    <>
      <Text fontSize="2rem" fontWeight="bold" textAlign="center" mt="3rem" mb="3rem">
        Ranking
      </Text>
      <RankingDisplay rankingObjectList={rankingObjectList} />
    </>
  );
};

export default RankingPage;

const apiResponceToRankingObjectList = (apiResponce: UserWithMatchResultAndTeam[]) => {
  const rankingObjectList: RankingObject[] = [];
  for (const user of apiResponce) {
    const { Team, matchUserResultList, name } = user;
    let point = 0;
    for (const matchUserResult of matchUserResultList) {
      point += matchUserResult.point;
    }
    rankingObjectList.push({ iconUriIndex: Team?.iconUriIndex, name, point });
  }
  return rankingObjectList;
};
