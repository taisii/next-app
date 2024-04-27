'use client';

import { Box, Button, Flex, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const LeagueInitPage: NextPage = () => {
  const [nameList, setNameList] = useState<String[]>([]);
  const [addingName, setAddingName] = useState('');
  const [isNameEmptyLabelShown, setIsNameEmptyLabelShown] = useState(false);
  const [isNameExistLabelShown, setIsNameExistLabelShown] = useState(false);

  const handleOnChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setAddingName(e.target.value);
  };

  const handleClickAddButton = () => {
    const isNameEmpty = addingName === '';
    const isNameExist = nameList.includes(addingName);
    setIsNameEmptyLabelShown(isNameEmpty);
    setIsNameExistLabelShown(isNameExist);
    if (!isNameEmpty && !isNameExist) {
      setNameList([...nameList, addingName]);
      setAddingName('');
    }
  };

  return (
    <VStack mt="3rem">
      <Flex direction={'column'} width="90%">
        <FormControl isInvalid={isNameEmptyLabelShown || isNameExistLabelShown} height="5rem">
          <Input
            size="lg"
            placeholder="name"
            focusBorderColor="yellow.500"
            value={addingName}
            onChange={handleOnChangeText}
          />
          <NameFormHelperText
            isNameEmptyLabelShown={isNameEmptyLabelShown}
            isNameExistLabelShown={isNameExistLabelShown}
          />
        </FormControl>

        <Button onClick={handleClickAddButton}>Add</Button>
        {nameList.map((name, index) => (
          <Box key={index}>{name}</Box>
        ))}
      </Flex>
      <Button position="fixed" width="90%" mb="2rem" bottom={0}>
        Finalise
      </Button>
    </VStack>
  );
};

const NameFormHelperText = ({
  isNameEmptyLabelShown,
  isNameExistLabelShown,
}: {
  isNameEmptyLabelShown: boolean;
  isNameExistLabelShown: boolean;
}) => {
  if (isNameEmptyLabelShown) {
    return <FormErrorMessage>名前を入力してください</FormErrorMessage>;
  } else if (isNameExistLabelShown) {
    return <FormErrorMessage>同じ名前は使えません</FormErrorMessage>;
  }
};

export default LeagueInitPage;
