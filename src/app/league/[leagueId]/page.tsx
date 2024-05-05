'use client';

import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  CheckboxGroup,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Match, MatchUserResult, User } from '@prisma/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaRankingStar } from 'react-icons/fa6';

import { getLeagueUserList } from '../_actions/queries/GetLeagueUsers';
import { getMatchListByLeagueId } from '../_actions/queries/GetMatchListByLeagueId';
import { MatchCard } from '../_components/MatchCard';
import { UserSelectCard } from '../_components/UserSelectCard';

export type MatchWitchMatchUserResult = Match & { matchUserResultList: MatchUserResult[] };

const LeaguePage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [userList, setUserList] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserIdList, setSelectedUserIdList] = useState<number[]>([]);
  const [matchList, setMatchList] = useState<MatchWitchMatchUserResult[]>([]);
  const matchCardObjectList = matchListTomatchCardObjectList(matchList);

  useEffect(() => {
    const fetchData = async () => {
      const ApiResponceUserList = await getLeagueUserList(leagueId);
      const ApiResponceMatchList = await getMatchListByLeagueId(leagueId);
      setUserList(ApiResponceUserList);
      setMatchList(ApiResponceMatchList);
    };
    fetchData();
  }, [leagueId]);

  const userIdListQueryStrings = selectedUserIdList
    .map((selectedUserId) => `selectedUserId=${selectedUserId}`)
    .join('&');

  return (
    <>
      <VStack mt="3rem">
        <Box width="90%" borderWidth={1} borderColor="gray" height="17rem">
          ここにグラフを入れる
        </Box>
        <Box flexDir="row" width="90%" justifyContent="space-between">
          <IconButton aria-label="ranking" variant="outline" icon={<Icon as={FaRankingStar} boxSize="1.5rem" />} />
        </Box>
        <IconButton
          aria-label="add-mutch"
          icon={<AddIcon />}
          position="fixed"
          right="2rem"
          bottom="2rem"
          onClick={onOpen}
        />
        {matchCardObjectList.map((matchCardObject, index) => (
          <MatchCard
            key={index}
            userNameList={userIdListToUserNameList(matchCardObject.userIdList, userList)}
            matchList={matchCardObject.matchList}
            date={matchCardObject.date}
          />
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
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
