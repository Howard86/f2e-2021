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

interface SceneCardProps extends LinkBoxProps {
  name: string;
  image: string | StaticImageData;
}

const ThemeCard = ({ name, image }: SceneCardProps) => (
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
      <Box flexGrow={1} />
      <Flex
        display="flex"
        bgColor="blackAlpha.700"
        p="4"
        color="white"
        justify="space-between"
        align="center"
        roundedBottom="3xl"
      >
        <LinkOverlay href="#" isExternal>
          <Text variant="headline-3">{name}</Text>
        </LinkOverlay>
      </Flex>
    </Flex>
  </LinkBox>
);

export default ThemeCard;
