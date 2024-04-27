'use client';

import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const LeagueInitPage: NextPage = () => {
  const [nameList, setNameList] = useState<String[]>([]);
  const [addingName, setAddingName] = useState('');

  const handleOnChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setAddingName(e.target.value);
  };

  const handleClickAddButton = () => {
    setNameList([...nameList, addingName]);
    setAddingName('');
  };

  return (
    <VStack mt={10}>
      <Input
        size="lg"
        width="90%"
        placeholder="name"
        focusBorderColor="yellow.500"
        value={addingName}
        onChange={handleOnChangeText}
      />
      <Button onClick={handleClickAddButton}>Add</Button>
      {nameList.map((name, index) => (
        <Box key={index}>{name}</Box>
      ))}
      <Button>Finalise</Button>
    </VStack>
  );
};

export default LeagueInitPage;
