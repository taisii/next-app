import { Box, Card, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { MatchWitchMatchUserResult } from '../[leagueId]/page';

type MatchCardProps = {
  date: Date;
  userNameList: string[];
  matchList: MatchWitchMatchUserResult[];
};

export const MatchCard = ({ date, userNameList, matchList }: MatchCardProps) => {
  const dateDayjs = dayjs(date);
  return (
    <Card width="90%" p="1rem">
      <Box as="span" flex={1} textAlign="left">
        {dateDayjs.format('M/D')}
      </Box>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              {userNameList.map((userName, index) => (
                <Th key={index}>{userName}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {matchList.map((match, index) => (
              <Tr key={index}>
                {match.matchUserResultList.map((matchUserResult, index) => (
                  <Td key={index}>{matchUserResult.point}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};
