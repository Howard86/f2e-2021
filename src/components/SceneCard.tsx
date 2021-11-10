import React from 'react';

import {
  Box,
  Flex,
  Icon,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { FiMapPin } from 'react-icons/fi';

import CardBanner from './CardBanner';

interface SceneCardProps extends LinkBoxProps {
  id: string;
  name: string;
  city: string;
  image: string | StaticImageData;
}

const SceneCard = ({ id, name, city, image }: SceneCardProps) => (
  <LinkBox pos="relative" overflow="hidden" rounded="2xl">
    <Image
      layout="responsive"
      objectFit="cover"
      objectPosition="center"
      src={image}
      width={368}
      height={420}
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
        bgColor="blackAlpha.700"
        p="4"
        color="white"
        justify="space-between"
        align="center"
        roundedBottom="3xl"
        zIndex="docked"
      >
        <NextLink href={`/scenes/${id}`} passHref>
          <LinkOverlay>
            <Text variant="headline-3">{name}</Text>
          </LinkOverlay>
        </NextLink>
        <Flex align="center">
          <Icon as={FiMapPin} boxSize="24px" mr="1" />
          <Text as="span">{city}</Text>
        </Flex>
      </Flex>
    </Flex>
  </LinkBox>
);

export default SceneCard;
