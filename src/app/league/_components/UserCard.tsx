import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Icon, Spacer, IconButton, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { AddingUser } from '../page';

type UserCardProps = {
  addingUser: AddingUser;
  userList: AddingUser[];
  setUserList: Dispatch<SetStateAction<AddingUser[]>>;
};

export const UserCard = ({ addingUser, userList, setUserList }: UserCardProps) => {
  const handleOnDeleteButton = () => {
    setUserList(userList.filter((user) => user.userName !== addingUser.userName));
  };

  return (
    <Flex flexDir="row" alignItems="center">
      <Icon as={AiOutlineUser} mr="2rem" boxSize="2rem" />
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
  );
};
