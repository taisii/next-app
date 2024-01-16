'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  HStack,
  Text,
  VStack,
  AccordionPanel,
  StackDivider,
  Box,
  Center,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { DeleteRecordButton } from '../atoms/DeleteRecordButton';

interface RecordProps {
  records: {
    id: number;
    createdAt: Date;
    point: number;
    top: number;
    second: number;
    three: number;
    four: number;
  }[];
}

export const RecordList: React.FC<RecordProps> = ({ records }) => {
  return (
    <>
      <VStack divider={<StackDivider borderColor="gray.200" />}>
        {records.map((record) => (
          <RecordRow {...record} key={record.id} />
        ))}
      </VStack>
    </>
  );
};

export type Record = {
  id: number;
  createdAt: Date;
  point: number;
  top: number;
  second: number;
  three: number;
  four: number;
};

//TODO: 中央揃えはもっといい方法がありそう
const RecordRow: React.FC<Record> = (record) => {
  const date = dayjs(record.createdAt).format('YYYY/M/D');
  return (
    <Accordion key={record.id} allowToggle display="contents">
      <AccordionItem display="contents">
        <HStack spacing={8}>
          <Box width={90}>
            <Center>{date}</Center>
          </Box>
          <Box width={10}>
            {record.point > 0 ? <Center>{record.point}</Center> : <Center color="red">{record.point}</Center>}
          </Box>
          <AccordionButton display="contents">
            <AccordionIcon />
          </AccordionButton>
        </HStack>
        <AccordionPanel>
          <VStack>
            <HStack>
              <Text>獲得ポイント</Text>
              <Text>{record.point}</Text>
            </HStack>
            <HStack>
              <Text>1着</Text>
              <Text>{record.top}</Text>
            </HStack>
            <HStack>
              <Text>2着</Text>
              <Text>{record.second}</Text>
            </HStack>
            <HStack>
              <Text>3着</Text>
              <Text>{record.three}</Text>
            </HStack>
            <HStack>
              <Text>4着</Text>
              <Text>{record.four}</Text>
            </HStack>
            <DeleteRecordButton id={record.id} />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
