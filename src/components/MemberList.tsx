import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export const MemberList: React.FC = () => {
  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>安斎</Th>
              <Th>飯田</Th>
              <Th>植木</Th>
              <Th>竹下</Th>
              <Th>村岡</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>堀</Td>
              <Td>仲林</Td>
              <Td>勝又</Td>
              <Td>滝沢</Td>
              <Td>多井</Td>
            </Tr>
            <Tr>
              <Td>醍醐</Td>
              <Td>白鳥</Td>
              <Td>松本</Td>
              <Td>寿人</Td>
              <Td>瀬戸熊</Td>
            </Tr>
            <Tr>
              <Td>伊達</Td>
              <Td>本田</Td>
              <Td>萩原</Td>
              <Td>難波</Td>
              <Td>瑞原</Td>
            </Tr>
            <Tr>
              <Td>高宮</Td>
              <Td>黒沢</Td>
              <Td>菅原</Td>
              <Td>猿川</Td>
              <Td>大介</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
