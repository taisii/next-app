import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';

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
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>日時</Th>
              <Th>ポイント</Th>
              <Th>1着</Th>
              <Th>2着</Th>
              <Th>3着</Th>
              <Th>4着</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((record) => (
              <RecordRow key={record.id} {...record} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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

export const RecordRow: React.FC<Record> = (record) => {
  const date = dayjs(record.createdAt);
  return (
    <Tr>
      <Td>{date.format('YYYY/MM/DD')}</Td>
      <Td>{record.point}</Td>
      <Td>{record.top}</Td>
      <Td>{record.second}</Td>
      <Td>{record.three}</Td>
      <Td>{record.four}</Td>
    </Tr>
  );
};
