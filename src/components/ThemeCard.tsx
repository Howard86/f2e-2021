import React from 'react';

import {
  Box,
  Flex,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

interface ThemeCardProps extends LinkBoxProps {
  name: string;
  image: string | StaticImageData;
  imageWidth?: number;
  imageHeight?: number;
  href?: string;
}

const ThemeCard = ({
  name,
  image,
  imageHeight = 420,
  imageWidth = 386,
  href = '#',
  ...props
}: ThemeCardProps) => (
  <LinkBox pos="relative" overflow="hidden" rounded="3xl" {...props}>
    <Image
      alt={name}
      objectFit="cover"
      objectPosition="center"
      src={image}
      width={imageWidth}
      height={imageHeight}
    />
    <Flex
      pos="absolute"
      flexDir="column"
      zIndex="docked"
      top="0"
      left="0"
      right="0"
      bottom="1"
    >
      <Box flexGrow={1} />
      <Box>
        <Text
          as="h3"
          fontWeight="bold"
          bgColor="blackAlpha.600"
          p="4"
          color="white"
          fontSize={['xl', '2xl']}
        >
          <LinkOverlay href={href} isExternal>
            {name}
          </LinkOverlay>
        </Text>
      </Box>
    </Flex>
  </LinkBox>
);

export default ThemeCard;
