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
  rounded = '2xl',
  href = '#',
  roundedLeft,
  roundedRight,
  ...props
}: ThemeCardProps) => (
  <LinkBox
    pos="relative"
    overflow="hidden"
    rounded={rounded}
    roundedLeft={roundedLeft}
    roundedRight={roundedRight}
    {...props}
  >
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
      <Flex
        display="flex"
        bgColor="blackAlpha.700"
        p="4"
        color="white"
        justify="space-between"
        align="center"
        roundedBottom={rounded}
        roundedBottomLeft={roundedLeft}
        roundedBottomRight={roundedRight}
      >
        <LinkOverlay href={href} isExternal>
          <Text variant="headline-3">{name}</Text>
        </LinkOverlay>
      </Flex>
    </Flex>
  </LinkBox>
);

export default ThemeCard;
