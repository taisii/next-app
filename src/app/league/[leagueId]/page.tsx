'use client';

import { AddIcon } from '@chakra-ui/icons';
import { Box, Icon, IconButton, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FaRankingStar } from 'react-icons/fa6';

const LeaguePage = ({ params }: { params: { leagueId: number } }) => {
  const { leagueId } = params;
  return (
    <VStack mt="3rem">
      <Box width="90%" borderWidth={1} borderColor="gray" height="17rem">
        ここにグラフを入れる
      </Box>
      <Box flexDir="row" width="90%" justifyContent="space-between">
        <IconButton aria-label="ranking" variant="outline" icon={<Icon as={FaRankingStar} boxSize="1.5rem" />} />
      </Box>
      <IconButton
        as={Link}
        href={`${leagueId}/matchLog`}
        aria-label="add-mutch"
        icon={<AddIcon />}
        position="fixed"
        right="2rem"
        bottom="2rem"
      />
    </VStack>
  );
};

export default LeaguePage;
