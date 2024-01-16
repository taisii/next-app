'use client';

import { HamburgerIcon, AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Header: React.FC = () => {
  return (
    <HStack bgColor="white">
      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" _expanded={{ bg: 'blue.400' }} />
        <Portal>
          <MenuList>
            <MenuItem icon={<AddIcon />} as={NextLink} href="/">
              ホーム
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} as={NextLink} href="/record">
              麻雀記録ページ
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} as={NextLink} href="/king_of_keio">
              慶王位
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </HStack>
  );
};
