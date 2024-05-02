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
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaRankingStar } from 'react-icons/fa6';

import { getLeagueUsers } from '../_actions/queries/GetLeagueUsers';
import { UserSelectCard } from '../_components/UserSelectCard';

const LeaguePage = ({ params }: { params: { leagueId: string } }) => {
  const leagueId = Number(params.leagueId);
  const [userList, setUserList] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserIdList, setSelectedUserIdList] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const ApiResponceUserList = await getLeagueUsers(leagueId);
      setUserList(ApiResponceUserList);
    };
    fetchUserData();
  }, [leagueId]);

  // const handleOnClickCheckBox=(value:)=>{
  //   setSelectedUserIdList(id);
  // }

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
        {userList.map((user) => {
          return <Box key={user.id}>{user.name}</Box>;
        })}
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
            {/* <Button onClick={() => alert(selectedUserIdList)}> */}
            <Button as={Link} href={`${leagueId}/matchLog?selectedUserList=${selectedUserIdList}`}>
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeaguePage;
