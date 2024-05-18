'use client';

import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getTeamListByLeagueId, GetTeamListLeagueIdResponce } from '../../_actions/queries/GetTeamListByLeagueId';
import { RankingDisplay, RankingObject } from '../../_components/RankingDisplay';

const RankingPage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [rankingObjectList, setRankingObjectList] = useState<RankingObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResponceTeamList = await getTeamListByLeagueId(leagueId);
      setRankingObjectList(apiResponceToRankingObjectList(apiResponceTeamList));
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

const apiResponceToRankingObjectList = (apiResponce: GetTeamListLeagueIdResponce[]) => {
  const rankingObjectList: RankingObject[] = [];
  for (const team of apiResponce) {
    const { memberList, iconUriIndex, name } = team;
    let point = 0;
    for (const member of memberList) {
      for (const matchUserResult of member.matchUserResultList) {
        point += matchUserResult.point;
      }
    }
    rankingObjectList.push({ iconUriIndex, name, point });
  }
  return rankingObjectList;
};
