import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

type UserCardProps = {
  userName: string;
  nameList: string[];
  setNameList: Dispatch<SetStateAction<string[]>>;
};

export const UserCard = ({ userName, nameList, setNameList }: UserCardProps) => {
  const handleOnDeleteButton = () => {
    setNameList(nameList.filter((name) => name !== userName));
  };
  return (
    <Flex flexDir="row" alignItems="center">
      <Icon as={AiOutlineUser} mr="2rem" boxSize="1.7rem" />
      <Box>{userName}</Box>
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
