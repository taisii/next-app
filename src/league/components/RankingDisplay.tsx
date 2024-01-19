import { OrderedList, ListItem, HStack, Text, Box, Center } from '@chakra-ui/react';

interface RankingDisplayProps {
  players: {
    name: string;
    MatchPlayerPoints: {
      id: number;
      point: number;
      matchResultId: number;
      playerId: number;
    }[];
  }[];
}

export const RankingDisplay: React.FC<RankingDisplayProps> = ({ players }) => {
  const playerTotalPoints: { name: string; totalPoint: number }[] = [];

  for (const player of players) {
    let playerPoint = 0;
    for (const matchPlayerPoint of player.MatchPlayerPoints) {
      playerPoint += matchPlayerPoint.point;
    }
    playerTotalPoints.push({ name: player.name, totalPoint: roundToTwoDecimals(playerPoint) });
  }
  playerTotalPoints.sort((a, b) => b.totalPoint - a.totalPoint);
  return (
    <OrderedList>
      {playerTotalPoints.map((playerTotalPoint) => {
        return (
          <ListItem key={playerTotalPoint.totalPoint}>
            <HStack>
              <Text>{playerTotalPoint.name}</Text>
              <Box width={10}>
                {playerTotalPoint.totalPoint >= 0 ? (
                  <Center>{playerTotalPoint.totalPoint}</Center>
                ) : (
                  <Center color="red">{playerTotalPoint.totalPoint}</Center>
                )}
              </Box>
            </HStack>
          </ListItem>
        );
      })}
    </OrderedList>
  );
};

function roundToTwoDecimals(num: number): number {
  return Number(num.toFixed(2));
}
