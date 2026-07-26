import React from 'react';

import {
  Box,
  Button,
  ButtonProps,
  Center,
  Heading,
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

const HomePage = () => {
  const size = useBreakpointValue<ButtonProps['size']>({
    base: 'md',
    md: 'lg',
  });

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
      <Stack direction={['column', 'row']} gap={[4, 8]}>
        <Button asChild variant="outline" size={size}>
          <RouteLink href="/city">
            <FaBusAlt />
            市區公車
          </RouteLink>
        </Button>
        <Button asChild variant="outline" size={size}>
          <RouteLink href="/nearby">
            <BiCurrentLocation />
            附近站牌
          </RouteLink>
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
        animation="humanFade 20s ease-in-out infinite"
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
        animation="busTravel 10s ease-in-out infinite"
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
