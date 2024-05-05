'use client';

import { Box, Button, Flex, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { createLeague } from './_actions/mutations/CreateLeague';
import { UserCard } from './_components/UserCard';

const LeagueInitPage: NextPage = () => {
  const [nameList, setNameList] = useState<string[]>([]);
  const [addingName, setAddingName] = useState('');
  const [isNameEmptyLabelShown, setIsNameEmptyLabelShown] = useState(false);
  const [isNameExistLabelShown, setIsNameExistLabelShown] = useState(false);
  const [isFinalizedButtonLoading, setIsFinalizedButtonLoading] = useState(false);
  const router = useRouter();

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

  const handleFinalize = async () => {
    setIsFinalizedButtonLoading(true);
    const league = await createLeague(nameList);
    router.push(`/league/${league.id}`);
  };

  return (
    <VStack mt="3rem">
      <Flex direction={'column'} width="90%">
        <FormControl isInvalid={isNameEmptyLabelShown || isNameExistLabelShown} height="5rem">
          <Input size="lg" placeholder="name" value={addingName} onChange={handleOnChangeText} />
          <NameFormHelperText
            isNameEmptyLabelShown={isNameEmptyLabelShown}
            isNameExistLabelShown={isNameExistLabelShown}
          />
        </FormControl>

        <Button onClick={handleClickAddButton}>Add</Button>
        <Box mt="1rem">
          {nameList.map((name, index) => (
            <UserCard key={index} userName={name} nameList={nameList} setNameList={setNameList} />
          ))}
        </Box>
      </Flex>
      <Button
        isDisabled={nameList.length <= 0}
        position="fixed"
        width="90%"
        mb="2rem"
        bottom={0}
        onClick={handleFinalize}
        isLoading={isFinalizedButtonLoading}
      >
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
