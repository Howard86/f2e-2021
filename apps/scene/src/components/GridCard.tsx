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

import RouteLink from './RouteLink';

interface GridCardProps extends GridItemProps {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  isExternal?: boolean;
}

const GridCard = ({
  title,
  subtitle,
  image,
  href,
  isExternal,
  ...props
}: GridCardProps) => (
  <GridItem
    as={LinkBox}
    pos="relative"
    overflow="hidden"
    rounded="2xl"
    {...props}
  >
    <Image
      alt={title}
      src={image}
      fallbackSrc="/static/fallback.jpg"
      fit="cover"
      align="center"
      h="full"
      w="full"
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
      p={[2, 4]}
      transition="ease-out"
      transitionDuration="0.2s"
      _hover={{
        bgColor: 'blackAlpha.600',
      }}
    >
      {isExternal ? (
        <LinkOverlay fontWeight="bold" fontSize="lg" href={href} isExternal>
          {title}
        </LinkOverlay>
      ) : (
        <RouteLink as={LinkOverlay} href={href}>
          {title}
        </RouteLink>
      )}
      <Text>{subtitle}</Text>
      <Box flexGrow={1} />
    </Flex>
  </GridItem>
);

export default GridCard;
