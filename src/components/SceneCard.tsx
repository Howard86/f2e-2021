import React from 'react';

import {
  Box,
  Flex,
  Icon,
  Image,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

import CardBanner from './CardBanner';
import RouteLink from './RouteLink';

import { CityMap } from '@/constants/category';

interface SceneCardProps extends LinkBoxProps {
  id: string;
  name: string;
  city: string;
  image: string;
}

const SceneCard = ({ id, name, city, image }: SceneCardProps) => (
  <LinkBox
    h={['380px', '420px', '420px', '500px']}
    pos="relative"
    overflow="hidden"
    rounded="2xl"
  >
    <Image
      objectFit="cover"
      objectPosition="center"
      fallbackSrc="/static/fallback.jpg"
      src={image}
      w="full"
      h="full"
    />
    <Flex
      pos="absolute"
      flexDir="column"
      zIndex="docked"
      top="0"
      left="0"
      right="0"
      bottom="0"
    >
      {/* TODO: add rate & view */}
      <CardBanner rate={4.5} view={67} saved />
      <Box flexGrow={1} />
      <Flex
        display="flex"
        flexDir="column"
        bgColor="blackAlpha.500"
        p="4"
        color="white"
        roundedBottom="3xl"
        zIndex="docked"
      >
        <Text variant="headline-3">
          <RouteLink as={LinkOverlay} href={`/scenes/${CityMap[city]}/${id}`}>
            {name}
          </RouteLink>
        </Text>
        <Flex alignSelf="flex-end" align="center">
          <Icon as={FiMapPin} boxSize="24px" mr="1" />
          <Text as="span">{city}</Text>
        </Flex>
      </Flex>
    </Flex>
  </LinkBox>
);

export default SceneCard;
