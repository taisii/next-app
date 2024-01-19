'use client';

import { Box, Button, HStack, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { playerIdToPlayerName } from './SessionList';
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

  const handleFormSubmit = method.handleSubmit(async (data) => {
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

    console.log(data);
  });

  const { fields: matchResultFields, append } = useFieldArray({
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
            <Button onClick={() => append(defaultValues.matchResults)}>行の追加</Button>
            <Button type="submit">submit</Button>
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
              render={({ field }) => <Input {...field} />}
            />
          </Td>
        );
      })}
    </>
  );
};
