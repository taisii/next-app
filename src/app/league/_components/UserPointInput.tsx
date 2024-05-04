'use client';

import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { MatchResult } from '../[leagueId]/matchLog/page';

type UserPointInputProps = {
  user: User;
  matchResultList: MatchResult[];
  setMatchResultList: Dispatch<SetStateAction<MatchResult[]>>;
};

export const UserPointInput = ({ user, matchResultList, setMatchResultList }: UserPointInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);
    setIsInvalidInput(isNaN(Number(input)));
    if (input === '' || isNaN(Number(input))) {
      // 入力が空文字か数字でない場合にオブジェクトを削除する
      setMatchResultList([...matchResultList.filter((matchResult) => matchResult.userId !== user.id)]);
    } else {
      // 入力されたポイントを更新する
      setMatchResultList([
        ...matchResultList.filter((matchResult) => matchResult.userId !== user.id),
        { userId: user.id, point: Number(input) },
      ]);
    }
  };

  return (
    <Box width="90%" mt="1rem">
      <Box>{user.name}</Box>
      <FormControl isInvalid={isInvalidInput}>
        <Input size="lg" value={inputValue} onChange={handleOnChange} />
        <FormErrorMessage>数字を入力してください</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
