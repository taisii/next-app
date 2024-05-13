'use client';

import { Box, Button, Flex, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { CreateTeamButton } from './_components/CreateTeamButton';
import { UserCard } from './_components/UserCard';

export type AddingUser = {
  userName: string;
  teamIndex?: number;
};

export type AddingTeam = {
  name: string;
  iconUriIndex: number;
};

const LeagueInitPage: NextPage = () => {
  const [userList, setUserList] = useState<AddingUser[]>([]);
  const [addingName, setAddingName] = useState('');
  const [isNameEmptyLabelShown, setIsNameEmptyLabelShown] = useState(false);
  const [isNameExistLabelShown, setIsNameExistLabelShown] = useState(false);
  const [isFinalizedButtonLoading, setIsFinalizedButtonLoading] = useState(false);
  const [teamList, setTeamList] = useState<AddingTeam[]>([]);
  const router = useRouter();

  const handleOnChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setAddingName(e.target.value);
  };

  const handleClickAddButton = () => {
    const isNameEmpty = addingName === '';
    const isNameExist = userList.some((user) => user.userName === addingName);
    setIsNameEmptyLabelShown(isNameEmpty);
    setIsNameExistLabelShown(isNameExist);
    if (!isNameEmpty && !isNameExist) {
      setUserList([...userList, { userName: addingName }]);
      setAddingName('');
    }
  };

  const handleFinalize = async () => {
    setIsFinalizedButtonLoading(true);
    // const league = await createLeague(nameList);
    // router.push(`/league/${league.id}`);
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
        <Box mt="2rem" width="100%">
          <CreateTeamButton teamList={teamList} setTeamList={setTeamList} key={teamList.length} />
        </Box>
        <Box mt="1rem">
          {userList.map((user, index) => (
            <UserCard key={index} addingUser={user} setUserList={setUserList} userList={userList} teamList={teamList} />
          ))}
        </Box>
      </Flex>
      <Button
        isDisabled={userList.length <= 0}
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
