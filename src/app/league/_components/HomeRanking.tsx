import { Avatar, Box, Flex, Icon, Img, Skeleton, Spacer, Text, VStack } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

import { teamIconUriList } from '../_constants/Constants';

type HomeRankingProps = {
  rankingObjectList: {
    iconUriIndex?: number;
    name: string;
    point: number;
  }[];
  title: string;
  unit: string;
  isToFixed?: boolean;
};

export const HomeRanking = ({ rankingObjectList, title, unit, isToFixed = false }: HomeRankingProps) => {
  const sortedRankingObjectList = rankingObjectList.sort((a, b) => b.point - a.point).slice(0, 3);
  if (sortedRankingObjectList.length === 0) {
    return (
      <VStack width="100%" borderWidth={1} borderColor="green" borderRadius="lg" p={3}>
        <Text fontWeight="bold" fontSize="1.5rem">
          {title}
        </Text>
        {[0, 0, 0].map((_, index) => (
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
            <Avatar icon={<Icon as={AiOutlineUser} boxSize="2rem" color="black" />} bgColor="transparent" />
            <Skeleton borderRadius="lg">
              <Text ml="1rem" fontWeight="bold">
                サンプル名前
              </Text>
            </Skeleton>
            <Spacer />
            <Skeleton borderRadius="lg">
              <Text>200px</Text>
            </Skeleton>
          </Flex>
        ))}
      </VStack>
    );
  }
  return (
    <VStack width="100%" borderWidth={1} borderColor="green" borderRadius="lg" p={3}>
      <Text fontWeight="bold" fontSize="1.5rem">
        {title}
      </Text>
      {sortedRankingObjectList.map(({ iconUriIndex, name, point }, index) => (
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
          <Text>
            {isToFixed ? point.toFixed(2) : point}
            {unit}
          </Text>
        </Flex>
      ))}
    </VStack>
  );
};
