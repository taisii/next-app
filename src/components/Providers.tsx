// app/layout.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import React from 'react';

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </>
  );
};
