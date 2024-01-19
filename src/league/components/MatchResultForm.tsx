'use client';

import { Button, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { playerIdToPlayerName } from './SessionList';

interface MatchResultFormProps {
  playerIds: number[];
}

export const MatchResultForm: React.FC<MatchResultFormProps> = ({ playerIds }) => {
  const [matchCount, setMatchCount] = useState(4);
  return (
    <VStack>
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
            {Array.from({ length: matchCount }).map((_, index) => {
              return (
                <Tr key={index}>
                  {playerIds.map((playerId) => {
                    return (
                      <Td key={playerId}>
                        <Input size="sm"></Input>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setMatchCount(matchCount + 1)}>行の追加</Button>
    </VStack>
  );
};
