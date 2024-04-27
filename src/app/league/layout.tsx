'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@/theme';

export interface LayoutProps {
  children: React.ReactNode;
}

const LeagueLayout: React.FC<LayoutProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default LeagueLayout;
