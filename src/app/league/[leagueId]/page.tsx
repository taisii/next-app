'use client';

import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  CheckboxGroup,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Match, MatchUserResult, Team, User } from '@prisma/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { GetHomeByLeagueId } from '../_actions/queries/GetHomeByLeagueId';
import { UserWithMatchResultAndTeam } from '../_actions/queries/GetUserListByLeagueId';
import { HomeDrawer } from '../_components/HomeDrawer';
import { HomeRanking } from '../_components/HomeRanking';
import { MatchCard } from '../_components/MatchCard';
import { UserSelectCard } from '../_components/UserSelectCard';

export type MatchWithMatchUserResult = Match & { matchUserResultList: MatchUserResult[] };

const LeaguePage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [userList, setUserList] = useState<User[]>([]);
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [userListWithMatchAndTeam, setUserListWithMatchAndTeam] = useState<UserWithMatchResultAndTeam[]>([]);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [selectedUserIdList, setSelectedUserIdList] = useState<number[]>([]);
  const [matchList, setMatchList] = useState<MatchWithMatchUserResult[]>([]);

  const matchCardObjectList = matchListTomatchCardObjectList(matchList);
  const { pointRankingList, lastRateRankingList } =
    userListWithMatchAndTeamToPointRankingObject(userListWithMatchAndTeam);

  useEffect(() => {
    const fetchData = async () => {
      const ApiResponce = await GetHomeByLeagueId(leagueId);
      setUserList(ApiResponce.userList);
      setTeamList(ApiResponce.teamList);
      setMatchList(ApiResponce.matchList);
      setUserListWithMatchAndTeam(ApiResponce.userListWitchMatchAndTeam);
    };
    fetchData();
  }, [leagueId]);

  const userIdListQueryStrings = selectedUserIdList
    .map((selectedUserId) => `selectedUserId=${selectedUserId}`)
    .join('&');

  return (
    <>
      <HomeDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        leagueId={leagueId}
        userList={userList}
        teamList={teamList}
      />

      <HStack justifyContent="space-between" mt="3rem">
        <IconButton
          position="absolute"
          aria-label="hamburger"
          variant="outline"
          borderRadius="md"
          icon={<HamburgerIcon />}
          onClick={onDrawerOpen}
          m="1rem"
        />
        <Text fontSize="2rem" fontWeight="bold" flex={1} textAlign="center">
          Home
        </Text>
      </HStack>
      <VStack>
        <Box width="90%" mt="2rem">
          <HomeRanking rankingObjectList={pointRankingList} title="個人スコア" unit="pt" />
        </Box>
        <Box width="90%" mt="2rem">
          <HomeRanking rankingObjectList={lastRateRankingList} title="4着回避率" unit="" isToFixed={true} />
        </Box>
        <IconButton
          aria-label="add-mutch"
          icon={<AddIcon />}
          position="fixed"
          right="2rem"
          bottom="2rem"
          onClick={onModalOpen}
          zIndex={10}
        />
        <Text fontWeight="bold" fontSize="1.5rem" mt="2rem">
          Detail
        </Text>
        <Box width="95%" mb="3rem">
          {matchCardObjectList.map((matchCardObject, index) => (
            <MatchCard
              key={index}
              userNameList={userIdListToUserNameList(matchCardObject.userIdList, userList)}
              matchList={matchCardObject.matchList}
              date={matchCardObject.date}
            />
          ))}
        </Box>
      </VStack>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent width="90%">
          <ModalHeader>メンバー選択</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup value={selectedUserIdList} onChange={(values) => setSelectedUserIdList(values.map(Number))}>
              {userList.map((user) => (
                <UserSelectCard userId={user.id} userName={user.name} key={user.id} />
              ))}
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button as={Link} href={`${leagueId}/matchLog?${userIdListQueryStrings}`}>
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeaguePage;

type MatchCardObject = {
  date: Date;
  userIdList: number[];
  matchList: MatchWithMatchUserResult[];
};

const matchListTomatchCardObjectList = (matchList: MatchWithMatchUserResult[]) => {
  const groupMap = new Map<string, MatchCardObject>();

  for (const match of matchList) {
    const date = dayjs(match.date).format('YYYY-MM-DD'); // 日付をフォーマット
    const userIdList = match.matchUserResultList.map((matchUserResult) => matchUserResult.userId).sort();
    const userNameList = userIdList.join('-'); // ユーザーIDをソートして結合
    const key = `${date}_${userNameList}`; // 日付とユーザーIDリストを組み合わせたキー

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        date: match.date,
        userIdList,
        matchList: [],
      });
    }
    groupMap.get(key)?.matchList.push(match);
  }

  return Array.from(groupMap.values());
};

const userIdListToUserNameList = (userIdList: number[], userList: User[]) => {
  const userNameList: string[] = [];
  for (const userId of userIdList) {
    const user = userList.find((user) => user.id === userId);
    if (user) {
      userNameList.push(user.name);
    }
  }
  return userNameList;
};

const userListWithMatchAndTeamToPointRankingObject = (userListWithMatchAndTeam: UserWithMatchResultAndTeam[]) => {
  // ランキングコンポーネントに渡すためのデータ整形
  const pointRankingList: { name: string; iconUriIndex?: number; point: number }[] = [];
  const lastRateRankingList: { name: string; iconUriIndex?: number; point: number }[] = [];
  for (const userWithMatchAndTeam of userListWithMatchAndTeam) {
    let pointSum = 0;
    let lastCount = 0;
    let gameCount = 0;
    for (const { point, rank } of userWithMatchAndTeam.matchUserResultList) {
      pointSum += point;
      gameCount++;
      if (rank === 3) {
        lastCount++;
      }
    }
    pointRankingList.push({
      name: userWithMatchAndTeam.name,
      iconUriIndex: userWithMatchAndTeam.Team?.iconUriIndex,
      point: pointSum,
    });
    lastRateRankingList.push({
      name: userWithMatchAndTeam.name,
      iconUriIndex: userWithMatchAndTeam.Team?.iconUriIndex,
      point: lastCount / gameCount,
    });
  }
  return { pointRankingList, lastRateRankingList };
};
