import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Img,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { teamIconUriList } from '../_constants/Constants';
import { AddingTeam, AddingUser } from '../page';

type SelectTeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
  teamList: AddingTeam[];
  userList: AddingUser[];
  setUserList: Dispatch<SetStateAction<AddingUser[]>>;
  addingUser: AddingUser;
};

export const SelectTeamModal = ({
  isOpen,
  onClose,
  teamList,
  userList,
  setUserList,
  addingUser,
}: SelectTeamModalProps) => {
  const [selectedTeamName, setSelectedTeamName] = useState(addingUser.teamName);

  const handleOnClose = () => {
    setSelectedTeamName(addingUser.teamName);
    onClose();
  };

  const handleOnClickDecideButton = () => {
    const newUserList = userList.map((user) => {
      if (user.userName === addingUser.userName) {
        /* 現在選択中のUserの場合は情報を変更 */
        return { userName: addingUser.userName, teamName: selectedTeamName };
      } else {
        /* それ以外の場合はそのまま */
        return user;
      }
    });
    setUserList(newUserList);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent width="90%">
        <ModalHeader fontWeight="bold">Select Team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box overflowY="scroll" height="20rem">
            {teamList.map((team, index) => {
              if (team.name === selectedTeamName) {
                return (
                  <Flex
                    key={team.iconUriIndex}
                    alignItems="center"
                    borderWidth="2px"
                    borderColor="green.500"
                    borderRadius="md"
                    pt={1}
                    pb={1}
                    pr={3}
                    pl={3}
                    onClick={() => setSelectedTeamName(team.name)}
                  >
                    <Img
                      src={teamIconUriList[team.iconUriIndex]}
                      borderWidth={1}
                      borderColor="black"
                      width="4rem"
                      height="4rem"
                    />
                    <Box display="flex" flex={1} justifyContent="center">
                      {team.name}
                    </Box>
                  </Flex>
                );
              } else {
                return (
                  <Flex
                    key={team.iconUriIndex}
                    alignItems="center"
                    borderWidth="2px"
                    borderColor="transparent"
                    borderRadius="md"
                    pt={1}
                    pb={1}
                    pr={3}
                    pl={3}
                    onClick={() => setSelectedTeamName(team.name)}
                  >
                    <Img
                      src={teamIconUriList[team.iconUriIndex]}
                      borderWidth={1}
                      borderColor="black"
                      width="4rem"
                      height="4rem"
                    />
                    <Box display="flex" flex={1} justifyContent="center">
                      {team.name}
                    </Box>
                  </Flex>
                );
              }
            })}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleOnClickDecideButton}>
            決定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
