import React from 'react';

import {
  Box,
  Button,
  Center,
  Heading,
  keyframes,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BiCurrentLocation } from 'react-icons/bi';
import { FaBusAlt } from 'react-icons/fa';

import bus from '@/bus.png';
import PinkLogoIcon from '@/components/icons/PinkLogo';
import Image from '@/components/Image';
import RouteLink from '@/components/RouteLink';
import human from '@/human.png';
import station from '@/station.png';

const busAnimation = keyframes`
  0% {
    right: 150%;
  }
  45% {
    right: 32%;
  }
  60% {
    right: calc(32% - 2px);
  }
  65% {
    right: 32%;
  }
  100% {
    right: -100%;
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

const HomePage = () => {
  const size = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Center
      pos="relative"
      color="white"
      flexDir="column"
      h="full"
      zIndex="docked"
      px="8"
      overflowX="hidden"
    >
      <PinkLogoIcon minW="146" maxW="217.5" h="auto" w="50%" />
      <Heading
        as="h1"
        my="8"
        fontSize={['xl', '2xl']}
        textAlign="center"
        maxW="344"
      >
        提供最即時的公車動態，讓您輕鬆掌握資訊，現在就開始規劃您的路線吧！
      </Heading>
      <Stack direction={['column', 'row']} spacing={[4, 8]}>
        <Button
          as={RouteLink}
          href="/city"
          leftIcon={<FaBusAlt />}
          variant="neon"
          size={size}
        >
          市區公車
        </Button>
        <Button
          as={RouteLink}
          href="/nearby"
          leftIcon={<BiCurrentLocation />}
          variant="neon"
          size={size}
        >
          附近站牌
        </Button>
      </Stack>
      <Box
        pos="absolute"
        bottom="5.6%"
        right="30%"
        w={[117, 234]}
        h={[70, 140]}
      >
        <Image
          alt="station"
          src={station}
          placeholder="blur"
          width={234}
          height={140}
        />
      </Box>
      <Box
        pos="absolute"
        bottom="4.9%"
        right="35%"
        w={[25, 50]}
        h={[55, 110]}
        animation={`${humanAnimation} 20s ease-in-out infinite`}
      >
        <Image
          alt="human"
          src={human}
          placeholder="blur"
          width={50}
          height={110}
        />
      </Box>
      <Box
        pos="absolute"
        bottom="4.5%"
        w={[203, 406]}
        h={['60px', 120]}
        animation={`${busAnimation} 10s ease-in-out infinite`}
      >
        <Image
          alt="bus"
          src={bus}
          placeholder="blur"
          width={406}
          height={120}
        />
      </Box>
    </Center>
  );
};

export default HomePage;
