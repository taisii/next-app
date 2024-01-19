'use client';

import {
  Accordion,
  AccordionItem,
  HStack,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  VStack,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

interface SessionListProps {
  session: {
    matchResults: ({
      MatchPlayerPoints: {
        id: number;
        point: number;
        matchResultId: number;
        playerId: number;
      }[];
    } & {
      id: number;
      sessionId: number;
    })[];
  } & {
    id: number;
    createdAt: Date;
    leagueId: number;
  };
}

// TODO: sessionからうまくplayer名をとる方法
export const SessionList: React.FC<SessionListProps> = ({ session }) => {
  const date = dayjs(session.createdAt).format('YYYY/M/D');
  const playerIds: number[] = [];
  for (const matchPlayerPoint of session.matchResults[0].MatchPlayerPoints) {
    if (!playerIds.includes(matchPlayerPoint.playerId)) {
      playerIds.push(matchPlayerPoint.playerId);
    }
  }
  playerIds.sort();
  const playerNames = playerIds.map((playerId) => playerIdToPlayerName[playerId]);
  return (
    <Accordion key={session.id} allowToggle display="contents">
      <AccordionItem display="contents">
        <HStack spacing={8}>
          {playerNames.map((playerName) => {
            return <Text key={playerName}>{playerName}</Text>;
          })}
          <AccordionButton display="contents">
            <AccordionIcon />
          </AccordionButton>
        </HStack>
        <AccordionPanel>
          <VStack>
            <HStack>
              <Text>実施日</Text>
              <Text>{date}</Text>
            </HStack>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    {playerNames.map((playerName) => (
                      <Th key={playerName}>{playerName}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {session.matchResults.map((matchResult) => {
                    matchResult.MatchPlayerPoints.sort((a, b) => a.playerId - b.playerId);
                    return (
                      <Tr key={matchResult.id}>
                        {matchResult.MatchPlayerPoints.map((matchPlayerPoint) => {
                          return <Td key={matchPlayerPoint.id}>{matchPlayerPoint.point}</Td>;
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const playerIdToPlayerName: Record<number, string> = {
  1: '飯田',
  2: '安斎',
  3: '植木',
  4: '村岡',
  5: '竹下',
};
