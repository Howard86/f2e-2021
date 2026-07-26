import React from 'react';

import { HStack, StackProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import LogoIcon from './icons/Logo';
import RouteLink from './RouteLink';

interface NavBarItemsProps {
  display?: StackProps['display'];
}

const NavBarItems = ({ display }: NavBarItemsProps) => {
  const router = useRouter();

  return (
    <>
      <RouteLink href="/">
        <LogoIcon display={display} maxH="34px" />
      </RouteLink>
      <HStack display={display} fontSize="xl">
        <RouteLink
          href="/city"
          textShadow={router.pathname === '/city' ? 'text' : undefined}
          mr={6}
        >
          公車定位
        </RouteLink>
        <RouteLink
          href="/nearby"
          textShadow={router.pathname === '/nearby' ? 'text' : undefined}
        >
          附近站牌
        </RouteLink>
      </HStack>
    </>
  );
};

export default NavBarItems;
