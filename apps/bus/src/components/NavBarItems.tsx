import React from 'react';

import { HStack, StackProps, useTheme } from '@chakra-ui/react';
import type { CitySlug } from '@f2e/ptx';
import { useRouter } from 'next/router';

import LogoIcon from './icons/Logo';
import RouteLink from './RouteLink';

interface NavBarItemsProps {
  display?: StackProps['display'];
  citySlug: CitySlug | '';
}

const NavBarItems = ({ display, citySlug }: NavBarItemsProps) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <RouteLink href="/">
        <LogoIcon display={display} maxH="34px" />
      </RouteLink>
      <HStack display={display} spacing={6} fontSize="xl">
        <RouteLink
          href={`/city/${citySlug}`}
          textShadow={
            router.pathname === '/city/[citySlug]'
              ? theme.colors.shadow.text
              : undefined
          }
        >
          公車定位
        </RouteLink>
        <RouteLink
          href="/nearby"
          textShadow={
            router.pathname === '/nearby' ? theme.colors.shadow.text : undefined
          }
        >
          附近站牌
        </RouteLink>
      </HStack>
    </>
  );
};

export default NavBarItems;
