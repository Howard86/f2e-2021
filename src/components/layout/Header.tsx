import React, { useEffect, useRef, useState } from 'react';

import {
  Avatar,
  Box,
  Divider,
  Flex,
  FlexProps,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import throttle from 'lodash.throttle';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

import Logo from '../icons/Logo';
import RouteLink from '../RouteLink';

import MenuPopover from './MenuPopover';

import ROUTES from '@/constants/routes';
import getAvatar from '@/services/avatar';

const THROTTLED_TIME_MS = 500;

const initialState = { onTop: true, isScrollingUp: false };

interface HeaderProps extends FlexProps {
  mainColor: FlexProps['color'];
}

const Header = ({ mainColor, ...props }: HeaderProps) => {
  const router = useRouter();
  const scrollRef = useRef(0);
  const [state, setState] = useState(initialState);

  const isSolid = !state.onTop && state.isScrollingUp;

  const handleOnSearch = () => {
    router.push('/scenes');
  };

  useEffect(() => {
    const handleOnScroll = throttle(
      () => {
        setState({
          onTop: window.scrollY < 10,
          isScrollingUp: scrollRef.current > window.scrollY,
        });

        scrollRef.current = window.scrollY;
      },
      THROTTLED_TIME_MS,
      { leading: true },
    );

    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <Flex
      as="header"
      bg={isSolid ? mainColor : 'transparent'}
      shadow={isSolid ? 'xl' : 'none'}
      borderBottomColor="purple.600"
      left="0"
      right="0"
      pos="fixed"
      zIndex="banner"
      alignItems="center"
      top={state.onTop || state.isScrollingUp ? 0 : '-200px'}
      px={[2, 4, 8]}
      py="2"
      color={isSolid ? 'white' : 'text.body'}
      translateY="50%"
      transitionProperty="top, translateY"
      transitionDuration="0.5s"
      transitionTimingFunction="ease-out"
      {...props}
    >
      <MenuPopover buttonBgColor={isSolid ? 'whiteAlpha.300' : 'transparent'} />
      <RouteLink display={['none', 'block']} href="/">
        <Logo width={12} height={12} />
      </RouteLink>

      <Box flexGrow={1} />
      <HStack
        display={['none', 'flex']}
        h="4"
        fontWeight="bold"
        divider={
          <Divider
            orientation="vertical"
            borderColor={isSolid ? 'white' : 'text.body'}
          />
        }
        spacing={[2, 2, 4]}
      >
        {ROUTES.map((route) => (
          <RouteLink key={route.label} href={route.href}>
            {route.label}
          </RouteLink>
        ))}
        <IconButton
          variant="ghost"
          aria-label="search scene"
          fontSize={['xl', '2xl']}
          rounded="full"
          icon={<FiSearch />}
          onClick={handleOnSearch}
          _hover={{
            bgColor: isSolid ? mainColor : 'white',
          }}
        />
      </HStack>
      <Avatar bg="white" src={getAvatar('f2e')} size="sm" ml="4" />
    </Flex>
  );
};

export default Header;
