import React, { ReactNode } from 'react';

import { Box, Container, ContainerProps, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';

import Logo from './icons/Logo';

interface BackgroundProps extends ContainerProps {
  children: ReactNode;
  name: string;
  image: string | StaticImageData;
  wordOneAlt: string;
  wordOne: string | StaticImageData;
  wordTwoAlt: string;
  wordTwo: string | StaticImageData;
  bgColor: ContainerProps['bgColor'];
}

const Background = ({
  children,
  image,
  name,
  wordOne,
  wordOneAlt,
  wordTwo,
  wordTwoAlt,
  bgColor,
  ...props
}: BackgroundProps) => (
  <Container
    maxW="container.lg"
    h="100vh"
    maxH={[589, 700]}
    centerContent
    {...props}
  >
    <Box
      pos="absolute"
      top="0"
      left="0"
      right="0"
      h="inherit"
      maxH="inherit"
      overflow="hidden"
      zIndex="hide"
      bgColor={bgColor}
    >
      <Image
        alt={`${name}背景`}
        src={image}
        layout="fill"
        objectFit="cover"
        objectPosition="20% 100%"
        quality={100}
        priority
      />
    </Box>
    <Logo
      color="whiteAlpha.700"
      my={[8, 12]}
      w="30%"
      h="auto"
      maxW="152"
      maxH="117"
    />
    <SimpleGrid mx="10%" spacing={[2, 4, 8]} columns={2}>
      <Image alt={wordOneAlt} src={wordOne} priority />
      <Image alt={wordTwoAlt} src={wordTwo} priority />
    </SimpleGrid>
    {children}
  </Container>
);

export default Background;
