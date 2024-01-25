'use client';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormErrorMessage, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { createLeague } from '../mutations/createLeague';
import { createPlayers } from '../mutations/createPalyers';

interface CreateLeagueForm {
  leagueName: string;
  members: {
    name: string;
  }[];
}

export const CreateLeagueForm: React.FC = () => {
  const CreateLeagueFormSchema = z.object({
    leagueName: z.string(),
    members: z.array(z.object({ name: z.string() })),
  });

  const [leagueUrl, setLeagueUrl] = useState('');

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<CreateLeagueForm>({
    mode: 'onBlur',
    resolver: zodResolver(CreateLeagueFormSchema),
    defaultValues: {
      leagueName: '',
      members: [{ name: '' }],
    },
  });

  const {
    fields: members,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'members',
  });
  const pathName = usePathname();

  const handleFormSubmit = handleSubmit(async ({ leagueName, members }) => {
    console.log(errors);
    console.log({ leagueName, members });
    const playerNames = members.map((member) => member.name);
    const league = await createLeague(leagueName);
    await createPlayers(playerNames, league.id);
    setLeagueUrl(pathName + '/' + league.id.toString());
  });

  return (
    <Box as="form" onSubmit={handleFormSubmit}>
      <VStack>
        <Text fontSize={20}>リーグ名</Text>
        <Input required placeholder="リーグ名を入れてください" {...register('leagueName')} isDisabled={isSubmitted} />
        <Text fontSize={20}>メンバー</Text>
        {members.map((member, index) => {
          return (
            <HStack key={member.id}>
              <FormControl isInvalid={!!errors.members?.[index]?.name}>
                <Input
                  required
                  placeholder="名前を入力してください"
                  {...register(`members.${index}.name`)}
                  isDisabled={isSubmitted}
                />
                <FormErrorMessage>{errors.members?.[index]?.name?.message ?? ''}</FormErrorMessage>
              </FormControl>
              {index === members.length - 1 ? (
                <IconButton
                  aria-label="add-member"
                  icon={<AddIcon />}
                  onClick={() => append({ name: '' })}
                  isDisabled={isSubmitted}
                />
              ) : (
                <IconButton
                  aria-label="delete-member"
                  icon={<DeleteIcon />}
                  onClick={() => remove(index)}
                  isDisabled={isSubmitted}
                />
              )}
            </HStack>
          );
        })}
        <Button isLoading={isSubmitting} isDisabled={isSubmitted} type="submit">
          作成
        </Button>
        {leagueUrl ? (
          <VStack>
            <Text>リーグを作成しました。以下のURLに移動してください</Text>
            <Text as={NextLink} href={leagueUrl} color="blue">
              {leagueUrl}
            </Text>
          </VStack>
        ) : (
          <></>
        )}
      </VStack>
    </Box>
  );
};
