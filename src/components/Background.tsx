import React, { ReactNode } from 'react';

import { Box, Container, ContainerProps, Flex, HStack } from '@chakra-ui/react';
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
}

const Background = ({
  children,
  image,
  name,
  wordOne,
  wordOneAlt,
  wordTwo,
  wordTwoAlt,
  ...props
}: BackgroundProps) => (
  <Container maxW="container.lg" h="100vh" centerContent {...props}>
    <Box
      pos="absolute"
      top="0"
      left="0"
      right="0"
      h="100vh"
      w="100vw"
      overflow="hidden"
      zIndex="hide"
    >
      <Image
        alt={`${name}背景`}
        src={image}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </Box>
    <Logo color="white" my="12" w="152" h="117" />
    <Flex flexDir="column" align="center">
      <HStack spacing={8}>
        <Box w={[100, 200, 300]}>
          <Image
            alt={wordOneAlt}
            src={wordOne}
            placeholder="blur"
            width={300}
            height={300}
            priority
          />
        </Box>
        <Box w={[100, 200, 300]}>
          <Image
            alt={wordTwoAlt}
            src={wordTwo}
            placeholder="blur"
            width={300}
            height={300}
            priority
          />
        </Box>
      </HStack>
      {children}
    </Flex>
  </Container>
);

export default Background;
