import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import puppeteer from 'puppeteer';

export const ScoreMap: React.FC = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://m-league.jp/stats/');

    const xpathExpressions=[
      [
        "/html/body/div/div/div/main/article/div[3]/div/div/section[3]/div/div/table/tbody/tr[4]/td[3]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[6]/div/div/table/tbody/tr[4]/td[4]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[4]/div/div/table/tbody/tr[4]/td[4]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[4]/div/div/table/tbody/tr[4]/td[3]"
      ],
      [
        "/html/body/div/div/div/main/article/div[3]/div/div/section[9]/div/div/table/tbody/tr[4]/td[4]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[5]/div/div/table/tbody/tr[4]/td[2]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[7]/div/div/table/tbody/tr[4]/td[4]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[7]/div/div/table/tbody/tr[4]/td[3]"
      ],
      [
        "/html/body/div/div/div/main/article/div[3]/div/div/section[2]/div/div/table/tbody/tr[4]/td[2]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[5]/div/div/table/tbody/tr[4]/td[3]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[7]/div/div/table/tbody/tr[4]/td[1]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[8]/div/div/table/tbody/tr[4]/td[2]"
      ],
      [
        "/html/body/div/div/div/main/article/div[3]/div/div/section[4]/div/div/table/tbody/tr[4]/td[1]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[4]/div/div/table/tbody/tr[4]/td[2]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[3]/div/div/table/tbody/tr[4]/td[4]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[8]/div/div/table/tbody/tr[4]/td[1]"
      ],
      [
        "/html/body/div/div/div/main/article/div[3]/div/div/section[5]/div/div/table/tbody/tr[4]/td[1]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[7]/div/div/table/tbody/tr[4]/td[2]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[9]/div/div/table/tbody/tr[4]/td[2]",
        "/html/body/div/div/div/main/article/div[3]/div/div/section[8]/div/div/table/tbody/tr[4]/td[3]"
      ]
    ];
    const pointsList:number[][]=[];
    let pointSumList=[0,0,0,0,0];

    for(let i =0;i<5;i++){
      const points:number[]=[];
      for(let j=0;j<4;j++){
        const elements=await page.$x(xpathExpressions[i][j]);
        const textContent = await page.evaluate(element => element.textContent, elements[0]);
        if(textContent){
          points.push(Number(textContent));
          pointSumList[i]+=Number(textContent);
        }
      }
      pointsList.push(points);
    }
  return (
    <>
<TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>名前</Th>
        <Th isNumeric>1巡目</Th>
        <Th isNumeric>2巡目</Th>
        <Th isNumeric>3巡目</Th>
        <Th isNumeric>4巡目</Th>
        <Th isNumeric>合計ポイント</Th>
        <Th isNumeric>ソシー</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>安斎</Td>
        <Td isNumeric>{pointsList[0][0]}</Td>
        <Td isNumeric>{pointsList[0][1]}</Td>
        <Td isNumeric>{pointsList[0][2]}</Td>
        <Td isNumeric>{pointsList[0][3]}</Td>
        <Td isNumeric>{pointSumList[0]}</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>飯田</Td>
        <Td isNumeric>{pointsList[1][0]}</Td>
        <Td isNumeric>{pointsList[1][1]}</Td>
        <Td isNumeric>{pointsList[1][2]}</Td>
        <Td isNumeric>{pointsList[1][3]}</Td>
        <Td isNumeric>{pointSumList[1]}</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>植木</Td>
        <Td isNumeric>{pointsList[2][0]}</Td>
        <Td isNumeric>{pointsList[2][1]}</Td>
        <Td isNumeric>{pointsList[2][2]}</Td>
        <Td isNumeric>{pointsList[2][3]}</Td>
        <Td isNumeric>{pointSumList[2]}</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
      <Tr>
        <Td>竹下</Td>
        <Td isNumeric>{pointsList[3][0]}</Td>
        <Td isNumeric>{pointsList[3][1]}</Td>
        <Td isNumeric>{pointsList[3][2]}</Td>
        <Td isNumeric>{pointsList[3][3]}</Td>
        <Td isNumeric>{pointSumList[3]}</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
      <Tr>
        <Td>村岡</Td>
        <Td isNumeric>{pointsList[4][0]}</Td>
        <Td isNumeric>{pointsList[4][1]}</Td>
        <Td isNumeric>{pointsList[4][2]}</Td>
        <Td isNumeric>{pointsList[4][3]}</Td>
        <Td isNumeric>{pointSumList[4]}</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
    </>
  )
};
