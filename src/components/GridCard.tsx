import React from 'react';

import {
  Box,
  Flex,
  GridItem,
  GridItemProps,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';

interface GridCardProps extends GridItemProps {
  title: string;
  subtitle?: string;
  image: string;
}

const GridCard = ({ title, subtitle, image, ...props }: GridCardProps) => (
  <GridItem
    as={LinkBox}
    pos="relative"
    overflow="hidden"
    rounded="2xl"
    {...props}
  >
    <Image alt={title} src={image} fit="cover" h="100%" w="100%" />
    <Flex
      pos="absolute"
      flexDir="column"
      zIndex="docked"
      top="0"
      left="0"
      right="0"
      bottom="0"
      color="white"
      p={[2, 4]}
    >
      <LinkOverlay fontWeight="bold" fontSize="lg" href="#" isExternal>
        {title}
      </LinkOverlay>
      <Text>{subtitle}</Text>
      <Box flexGrow={1} />
    </Flex>
  </GridItem>
);

export default GridCard;
