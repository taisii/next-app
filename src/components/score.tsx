import { Box } from '@chakra-ui/react';
import puppeteer from 'puppeteer';

export const Score: React.FC = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://m-league.jp/stats');
  const element1 = await page.$('p-stats__table');
  console.log(element1);
  return <Box>aaa</Box>;
};
