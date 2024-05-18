import { Avatar, Flex, Icon, Img, Text, VStack, Box, Spacer } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

import { teamIconUriList } from '../_constants/Constants';

export type RankingObject = {
  iconUriIndex?: number;
  name: string;
  point: number;
};

type RankingDisplayProps = {
  rankingObjectList: RankingObject[];
};

export const RankingDisplay = ({ rankingObjectList }: RankingDisplayProps) => {
  const rankingDisplayObjectList: (RankingObject & { pointGap: number })[] = [];

  const sortedRankingObjectList = rankingObjectList.sort((a, b) => b.point - a.point);

  sortedRankingObjectList.forEach((rankingObject, index) => {
    const pointGap = index === 0 ? -1 : sortedRankingObjectList[index - 1].point - rankingObject.point;
    rankingDisplayObjectList.push({
      ...rankingObject,
      pointGap,
    });
  });

  return (
    <VStack mb="3rem">
      {rankingDisplayObjectList.map(({ iconUriIndex, name, point, pointGap }, index) => (
        <Flex key={index} width="90%" alignItems="center" mt={2}>
          <Box width="2rem" mr="0.5rem">
            <Box
              bgColor={index === 0 ? 'red.500' : 'green.500'}
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              textColor="white"
              mr={2}
            >
              {index + 1}
            </Box>
          </Box>
          {iconUriIndex !== undefined ? (
            <Avatar
              icon={<Img src={teamIconUriList[iconUriIndex]} boxSize="3rem" />}
              objectFit="contain"
              bgColor="transparent"
            />
          ) : (
            <Avatar icon={<Icon as={AiOutlineUser} boxSize="2rem" color="black" />} bgColor="transparent" />
          )}
          <Text ml="1rem" fontWeight="bold">
            {name}
          </Text>
          <Spacer />
          <Text>{point}pt</Text>
          <Text ml="2rem">{pointGap === -1 ? '- ' : pointGap}pt</Text>
        </Flex>
      ))}
    </VStack>
  );
};
