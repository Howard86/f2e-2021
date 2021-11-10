import React, { useEffect, useRef, useState } from 'react';

import {
  Avatar,
  Divider,
  Flex,
  FlexProps,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import throttle from 'lodash.throttle';
import { FiSearch } from 'react-icons/fi';

import Logo from '../icons/Logo';
import RouteLink from '../RouteLink';

const THROTTLED_TIME_MS = 500;

const initialState = { onTop: true, isScrollingUp: false };

const Header = (props: FlexProps) => {
  const scrollRef = useRef(0);
  const [state, setState] = useState(initialState);

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

  const isSolid = !state.onTop && state.isScrollingUp;

  return (
    <Flex
      as="header"
      bg={isSolid ? 'brand.2' : 'transparent'}
      shadow={isSolid ? 'xl' : 'none'}
      borderBottomColor="purple.600"
      left="0"
      right="0"
      pos="fixed"
      zIndex="banner"
      alignItems="center"
      justify="space-between"
      top={state.onTop || state.isScrollingUp ? 0 : '-200px'}
      px="8"
      py="2"
      color={isSolid ? 'white' : 'text.body'}
      translateY="50%"
      transitionProperty="top, translateY"
      transitionDuration="0.5s"
      transitionTimingFunction="ease-out"
      {...props}
    >
      <RouteLink href="/">
        <Logo width={12} height={12} />
      </RouteLink>

      <HStack
        h="4"
        fontWeight="bold"
        divider={
          <Divider
            orientation="vertical"
            borderColor={isSolid ? 'white' : 'text.body'}
          />
        }
        spacing={4}
      >
        <RouteLink href="/">活動新訊</RouteLink>
        <RouteLink href="/scenes">景點</RouteLink>
        <RouteLink href="/restaurants">美食</RouteLink>
        <RouteLink href="/hotels">住宿</RouteLink>
        <RouteLink href="/transports">交通</RouteLink>
        <IconButton
          variant="ghost"
          aria-label="search scene"
          fontSize="2xl"
          rounded="full"
          icon={<FiSearch />}
          _hover={{
            bgColor: isSolid ? 'brand.1' : 'white',
          }}
        />
        <Avatar size="sm" />
      </HStack>
    </Flex>
  );
};

export default Header;
