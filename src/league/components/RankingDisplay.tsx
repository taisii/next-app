import { OrderedList, ListItem, HStack, Text, Box, Center } from '@chakra-ui/react';

interface RankingDisplayProps {
  players: {
    id: number;
    name: string;
    MatchPlayerPoints: {
      id: number;
      point: number;
      matchResultId: number;
      playerId: number;
    }[];
  }[];
  leagueId: number;
}

export const RankingDisplay: React.FC<RankingDisplayProps> = ({ players, leagueId }) => {
  const playerTotalPoints: { playerName: string; playerId: number; totalPoint: number }[] = [];

  for (const player of players) {
    let playerPoint = 0;
    for (const matchPlayerPoint of player.MatchPlayerPoints) {
      playerPoint += matchPlayerPoint.point;
    }
    playerTotalPoints.push({
      playerName: player.name,
      playerId: player.id,
      totalPoint: roundToTwoDecimals(playerPoint),
    });
  }
  playerTotalPoints.sort((a, b) => b.totalPoint - a.totalPoint);
  return (
    <OrderedList>
      {playerTotalPoints.map((playerTotalPoint) => {
        return (
          <ListItem key={playerTotalPoint.playerId}>
            <HStack>
              <Text>{playerTotalPoint.playerName}</Text>
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
