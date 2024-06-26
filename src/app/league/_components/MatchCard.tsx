import { Box, Card, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { MatchWithMatchUserResult } from '../[leagueId]/page';

type MatchCardProps = {
  date: Date;
  userNameList: string[];
  matchList: MatchWithMatchUserResult[];
};

export const MatchCard = ({ date, userNameList, matchList }: MatchCardProps) => {
  const dateDayjs = dayjs(date);
  return (
    <Card width="100%" mb="1rem" p="1rem">
      <Box as="span" flex={1} textAlign="left">
        {dateDayjs.format('M/D')}
      </Box>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              {userNameList.map((userName, index) => (
                <Th key={index} textAlign="center">
                  {userName}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {matchList.map((match, index) => (
              <Tr key={index}>
                {match.matchUserResultList.map((matchUserResult, index) => (
                  <Td key={index} textAlign="center">
                    {matchUserResult.point}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};
