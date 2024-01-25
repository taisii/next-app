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
import { useEffect } from 'react';

import { DeleteSessionButton } from './DeleteSessionButton';
import { useLeagueSelector } from '../contexts/leagueContext';

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
  players: {
    name: string;
    id: number;
    MatchPlayerPoints: {
      id: number;
      point: number;
      matchResultId: number;
      playerId: number;
    }[];
  }[];
}

export const SessionList: React.FC<SessionListProps> = ({ session, players }) => {
  const date = dayjs(session.createdAt).format('YYYY/M/D');
  const setPlayerIdToPlayerName = useLeagueSelector((v) => v.setPlayerIdToPlayerName);
  const playerIdToPlayerName = useLeagueSelector((v) => v.playerIdToPlayerName);

  useEffect(() => {
    const tempPlayerIdToPlayerName: Record<number, string> = {};
    for (const player of players) {
      tempPlayerIdToPlayerName[player.id] = player.name;
    }
    setPlayerIdToPlayerName(tempPlayerIdToPlayerName);
  }, []);

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
        <AccordionButton display="contents">
          <HStack spacing={8}>
            {playerNames.map((playerName, index) => {
              return <Text key={playerIds[index]}>{playerName}</Text>;
            })}
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          <VStack>
            <HStack>
              <Text>記入日</Text>
              <Text>{date}</Text>
            </HStack>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    {playerNames.map((playerName, index) => (
                      <Th key={playerIds[index]}>{playerName}</Th>
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
            <DeleteSessionButton sessionId={session.id} />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
