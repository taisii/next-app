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
  StackDivider,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

interface MatchResultListProps {
  matchResults: {
    id: number;
    createdAt: Date;
    matchPlayerDatas: {
      id: number;
      point: number;
      player: {
        id: number;
        name: string;
      };
    }[];
  }[];
}

export const MatchResultList: React.FC<MatchResultListProps> = ({ matchResults }) => {
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />}>
      {matchResults.map((matchResult) => (
        <MatchResultRow key={matchResult.id} matchResult={matchResult} />
      ))}
    </VStack>
  );
};

interface matchResultProps {
  matchResult: {
    id: number;
    createdAt: Date;
    matchPlayerDatas: {
      id: number;
      point: number;
      player: {
        id: number;
        name: string;
      };
    }[];
  };
}

const MatchResultRow: React.FC<matchResultProps> = ({ matchResult }) => {
  const date = dayjs(matchResult.createdAt).format('YYYY/M/D');
  return (
    <Accordion key={matchResult.id} allowToggle display="contents">
      <AccordionItem display="contents">
        <HStack spacing={8}>
          {matchResult.matchPlayerDatas.map((matchPlayerData) => {
            return <Text key={matchPlayerData.player.id}>{matchPlayerData.player.name}</Text>;
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
            <MatchResultTable matchResult={matchResult} />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const MatchResultTable: React.FC<matchResultProps> = ({ matchResult }) => {
  const playerDatas = matchResult.matchPlayerDatas.sort((a, b) => b.point - a.point);
  return (
    <VStack>
      {playerDatas.map((playerData) => {
        return (
          <HStack key={playerData.id}>
            <Text>{playerData.player.name}</Text>
            <Text>{playerData.point}</Text>
          </HStack>
        );
      })}
    </VStack>
  );
};
