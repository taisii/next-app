'use client';

import {
  Box,
  Button,
  HStack,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { playerIdToPlayerName } from './SessionList';
import { useLeagueSelector } from '../contexts/leagueContext';
import { createMatchPlayerPoint } from '../mutations/createMatchPlayerPoint';
import { createMatchResult } from '../mutations/createMatchRecords';
import { createSession } from '../mutations/createSession';
import { LEAGUE_ID, MatchPlayerPoint, SessionFormInput } from '../types';

interface MatchResultFormProps {
  playerIds: number[];
}

const SessionFormInputSchema = z.object({
  matchResults: z.array(
    z.object({
      matchPlayerPoints: z.array(
        z.object({
          playerId: z.coerce.number(),
          point: z.coerce.number(),
        })
      ),
    })
  ),
});

export const MatchResultForm: React.FC<MatchResultFormProps> = ({ playerIds }) => {
  const [isLoading, setIsLoading] = useState(false);
  const resetSessionForm = useLeagueSelector((v) => v.resetSessionForm);

  const defaultValues = {
    matchResults: [
      {
        matchPlayerPoints: [] as MatchPlayerPoint[],
      },
    ],
  };
  for (const playerId of playerIds) {
    defaultValues.matchResults[0].matchPlayerPoints.push({ playerId, point: 0 });
  }

  const method = useForm<SessionFormInput>({
    resolver: zodResolver(SessionFormInputSchema),
    defaultValues,
  });

  const router = useRouter();
  const handleFormSubmit = method.handleSubmit(async (data) => {
    setIsLoading(true);
    const session = await createSession(LEAGUE_ID);
    if (!session) {
      return <></>;
    }
    for (const matchResultData of data.matchResults) {
      const matchResult = await createMatchResult(session.id);
      if (!matchResult) {
        return <></>;
      }
      await createMatchPlayerPoint(matchResult.id, matchResultData.matchPlayerPoints);
    }

    setIsLoading(false);
    resetSessionForm();
    router.refresh();
  });

  const {
    fields: matchResultFields,
    append,
    remove,
  } = useFieldArray({
    control: method.control,
    name: 'matchResults',
  });

  //TODO: formのエラーハンドリング
  return (
    <VStack>
      <FormProvider {...method}>
        <Box as="form" onSubmit={handleFormSubmit}>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  {playerIds.map((playerId) => {
                    return <Th key={playerId}>{playerIdToPlayerName[playerId]}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {matchResultFields.map((matchResult, matchResultIndex) => {
                  return (
                    <Tr key={matchResult.id}>
                      <MatchResultRow index={matchResultIndex} />
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <HStack mt={4}>
            <Button onClick={() => remove(matchResultFields.length - 1)} color="red">
              削除
            </Button>
            <Button onClick={() => append(defaultValues.matchResults)}>追加</Button>
            <Spacer />
            <Button type="submit" isLoading={isLoading} border={1} borderColor="black" borderStyle="solid">
              記録
            </Button>
          </HStack>
        </Box>
      </FormProvider>
      {method.formState.errors.matchResults && <p>{method.formState.errors.matchResults.message}</p>}
    </VStack>
  );
};

interface MatchResultRowProps {
  index: number;
}

const MatchResultRow: React.FC<MatchResultRowProps> = ({ index }) => {
  const { control } = useFormContext();
  const { fields: MatchResultRowFields } = useFieldArray({
    control,
    name: `matchResults.${index}.matchPlayerPoints`,
  });
  return (
    <>
      {MatchResultRowFields.map((field, fieldindex) => {
        return (
          <Td key={field.id}>
            <Controller
              control={control}
              name={`matchResults.${index}.matchPlayerPoints.${fieldindex}.point`}
              render={({ field }) => <Input size="xs" {...field} />}
            />
          </Td>
        );
      })}
    </>
  );
};
