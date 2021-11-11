import React from 'react';

import {
  Box,
  Flex,
  GridItem,
  GridItemProps,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

interface GridCardProps extends GridItemProps {
  title: string;
  subtitle?: string;
  image: string | StaticImageData;
  imageWidth?: number;
  imageHeight?: number;
}

const GridCard = ({
  title,
  subtitle,
  image,
  imageHeight = 400,
  imageWidth = 300,
  ...props
}: GridCardProps) => (
  <LinkBox
    as={GridItem}
    pos="relative"
    overflow="hidden"
    rounded="2xl"
    {...props}
  >
    <Image
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
      bottom="0"
      color="white"
      p="4"
    >
      <LinkOverlay fontWeight="bold" fontSize="lg" href="#" isExternal>
        {title}
      </LinkOverlay>
      <Text>{subtitle}</Text>
      <Box flexGrow={1} />
    </Flex>
  </LinkBox>
);

export default GridCard;
