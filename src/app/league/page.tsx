'use client';

import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Spacer } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { createLeague } from './_actions/mutations/CreateLeague';
import { CreateTeamButton } from './_components/CreateTeamButton';
import { UserCard } from './_components/UserCard';

export type AddingUser = {
  userName: string;
  teamName?: string;
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
    const { league } = await createLeague(teamList, userList);
    router.push(`/league/${league.id}`);
  };

  return (
    <Flex pt="3rem" direction="column" alignItems="center" flex={1} minHeight="100vh">
      <Box width="90%">
        <FormControl isInvalid={isNameEmptyLabelShown || isNameExistLabelShown} height="5rem">
          <Input size="lg" placeholder="name" value={addingName} onChange={handleOnChangeText} />
          <NameFormHelperText
            isNameEmptyLabelShown={isNameEmptyLabelShown}
            isNameExistLabelShown={isNameExistLabelShown}
          />
        </FormControl>

        <Button onClick={handleClickAddButton} width="100%">
          Add
        </Button>
        <Box mt="2rem" width="100%">
          <CreateTeamButton teamList={teamList} setTeamList={setTeamList} key={teamList.length} />
        </Box>
        <Box mt="1rem" overflowY="scroll">
          {userList.map((user, index) => (
            <UserCard key={index} addingUser={user} setUserList={setUserList} userList={userList} teamList={teamList} />
          ))}
        </Box>
      </Box>
      <Spacer />
      <Button
        isDisabled={userList.length <= 0}
        width="90%"
        mt="2rem"
        mb="2rem"
        onClick={handleFinalize}
        isLoading={isFinalizedButtonLoading}
      >
        Finalise
      </Button>
    </Flex>
  );
};

export const NameFormHelperText = ({
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
