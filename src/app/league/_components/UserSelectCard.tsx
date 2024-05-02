import { Box, Checkbox, Flex, Icon, Spacer } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

type UserSelectCardProps = {
  userName: string;
  userId: number;
};

export const UserSelectCard = ({ userName, userId }: UserSelectCardProps) => {
  return (
    <Flex flexDir="row" alignItems="center" mt="1rem">
      <Icon as={AiOutlineUser} mr="2rem" boxSize="1.7rem" />
      <Box>{userName}</Box>
      <Spacer />
      <Checkbox value={userId} size="lg" />
    </Flex>
  );
};
