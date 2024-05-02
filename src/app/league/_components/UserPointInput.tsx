import { Box, Input } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

import { createMatchObject } from '../_actions/mutations/CreateMatch';

type UserPointInputProps = {
  user: User;
  createMatchObjectList: createMatchObject[];
  setCreateMatchObjectList: Dispatch<SetStateAction<createMatchObject[]>>;
};

export const UserPointInput = ({ user, createMatchObjectList, setCreateMatchObjectList }: UserPointInputProps) => {
  return (
    <Box width="90%" mt="1rem">
      <Box>{user.name}</Box>
      <Input size="lg" />
    </Box>
  );
};
