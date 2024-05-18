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

import { getMatchListByLeagueId } from '../_actions/queries/GetMatchListByLeagueId';
import { GetTeamAndUserByLeagueId } from '../_actions/queries/GetTeamAndUserByLeagueId';
import { HomeDrawer } from '../_components/HomeDrawer';
import { MatchCard } from '../_components/MatchCard';
import { UserSelectCard } from '../_components/UserSelectCard';

export type MatchWitchMatchUserResult = Match & { matchUserResultList: MatchUserResult[] };

const LeaguePage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [userList, setUserList] = useState<User[]>([]);
  const [teamList, setTeamList] = useState<Team[]>([]);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [selectedUserIdList, setSelectedUserIdList] = useState<number[]>([]);
  const [matchList, setMatchList] = useState<MatchWitchMatchUserResult[]>([]);
  const matchCardObjectList = matchListTomatchCardObjectList(matchList);

  useEffect(() => {
    const fetchData = async () => {
      const { userList: ApiResponceUserList, teamList: ApiResponceTeamList } = await GetTeamAndUserByLeagueId(leagueId);
      const ApiResponceMatchList = await getMatchListByLeagueId(leagueId);
      setUserList(ApiResponceUserList);
      setTeamList(ApiResponceTeamList);
      setMatchList(ApiResponceMatchList);
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
        <Box width="90%" borderWidth={1} borderColor="gray" height="17rem">
          ここにグラフを入れる
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
  matchList: MatchWitchMatchUserResult[];
};

const matchListTomatchCardObjectList = (matchList: MatchWitchMatchUserResult[]) => {
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
