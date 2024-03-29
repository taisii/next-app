'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@/theme';

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </>
  );
};
