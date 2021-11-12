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

import RouteLink from './RouteLink';

interface ThemeCardProps extends LinkBoxProps {
  id: string;
  theme: string;
  image: string;
}

const ThemeCard = ({ id, theme, image, ...props }: ThemeCardProps) => (
  <LinkBox
    pos="relative"
    overflow="hidden"
    rounded="3xl"
    h={['420']}
    {...props}
  >
    <Image
      alt={theme}
      objectFit="cover"
      objectPosition="center"
      fallbackSrc="/static/mock/theme.png"
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
          <RouteLink as={LinkOverlay} href={`/scenes/${theme}/${id}`}>
            {theme}
          </RouteLink>
        </Text>
      </Box>
    </Flex>
  </LinkBox>
);

export default ThemeCard;
