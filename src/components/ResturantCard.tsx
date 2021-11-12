import React from 'react';

import {
  Box,
  Flex,
  Image,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';

interface ThemeCardProps extends LinkBoxProps {
  name: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  href?: string;
}

const RestaurantCard = ({
  name,
  image,
  href = '#',
  ...props
}: ThemeCardProps) => (
  <LinkBox pos="relative" overflow="hidden" rounded="xl" {...props}>
    <Image alt={name} src={image} fit="cover" h="100%" w="100%" />
    <Flex
      pos="absolute"
      flexDir="column"
      zIndex="docked"
      top="0"
      left="0"
      right="0"
      bottom="0"
      fontWeight="bold"
      fontSize="sm"
      color="white"
    >
      <Box flexGrow={1} />
      <Box
        bgColor="whiteAlpha.400"
        p="2"
        justify="space-between"
        align="center"
      >
        <Text as="h3" fontWeight="bold" color="white" fontSize={['sm', '2xl']}>
          <LinkOverlay href={href} isExternal>
            {name}
          </LinkOverlay>
        </Text>
      </Box>
    </Flex>
  </LinkBox>
);

export default RestaurantCard;
