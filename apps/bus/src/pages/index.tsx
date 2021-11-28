import React from 'react';

import {
  Box,
  Button,
  Center,
  Heading,
  keyframes,
  VStack,
} from '@chakra-ui/react';

import bus from '@/bus.png';
import LogoIcon from '@/components/icons/Logo';
import Image from '@/components/Image';
import RouteLink from '@/components/RouteLink';
import human from '@/human.png';
import station from '@/station.png';

const busAnimation = keyframes`
  0% {
    left: -100%;
  }
  45% {
    left: 32%;
  }
  65% {
    left: 32%;
  }
  100% {
    left: 150%;
  }
`;

const humanAnimation = keyframes`
  0% {
    opacity: 1;
  }
  22.5% {
    opacity: 1;
  }
  32.5% {
    opacity: 0;
  }
  72.5% {
    opacity: 0;
  }
  82.5% {
    opacity: 1; 
  }
`;

const HomePage = () => (
  <>
    <Center
      pos="relative"
      color="white"
      flexDir="column"
      h="full"
      zIndex="docked"
      mx="8"
    >
      <LogoIcon minW="145px" width="50%" />
      <Heading as="h1" mb="8" fontSize="xl" textAlign="center">
        提供最即時的公車動態，讓您輕鬆掌握資訊，現在就開始規劃您的路線吧！
      </Heading>
      <VStack spacing={4}>
        {/* TODO: add local storage helper */}
        <Button as={RouteLink} href="/city/taipei/bus">
          市區公車
        </Button>
        <Button as={RouteLink} href="/coach">
          公路客運
        </Button>
        <Button as={RouteLink} href="/">
          乘車規劃
        </Button>
      </VStack>
    </Center>
    <Box pos="fixed" left="60%" bottom="5.5%" w="full">
      <Image alt="station" src={station} placeholder="blur" />
    </Box>
    <Box pos="fixed" left="70%" bottom="4.8%" w="full">
      <Image
        alt="human"
        src={human}
        placeholder="blur"
        animation={`${humanAnimation} 20s ease-in-out infinite`}
      />
    </Box>
    <Box
      pos="fixed"
      bottom="4.5%"
      w="full"
      animation={`${busAnimation} 10s ease-in-out infinite`}
    >
      <Image alt="bus" src={bus} placeholder="blur" />
    </Box>
  </>
);

export default HomePage;
