import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Icon, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { SelectTeamModal } from './SelectTeamModal';
import { AddingTeam, AddingUser } from '../page';

type UserCardProps = {
  addingUser: AddingUser;
  userList: AddingUser[];
  setUserList: Dispatch<SetStateAction<AddingUser[]>>;
  teamList: AddingTeam[];
};

export const UserCard = ({ addingUser, userList, setUserList, teamList }: UserCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnDeleteButton = () => {
    setUserList(userList.filter((user) => user.userName !== addingUser.userName));
  };

  return (
    <>
      <Flex flexDir="row" alignItems="center">
        <Icon as={AiOutlineUser} mr="2rem" boxSize="2rem" onClick={onOpen} />
        <Text>{addingUser.userName}</Text>
        <Spacer />
        <IconButton
          aria-label="user"
          icon={<DeleteIcon />}
          variant="unstyled"
          justifySelf="flex-end"
          onClick={handleOnDeleteButton}
        />
      </Flex>

      <SelectTeamModal
        isOpen={isOpen}
        onClose={onClose}
        teamList={teamList}
        userList={userList}
        setUserList={setUserList}
        addingUser={addingUser}
      />
    </>
  );
};
