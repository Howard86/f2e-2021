import React from 'react';

import {
  Box,
  Flex,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';

import RouteLink from './RouteLink';

interface SiteCardProps extends LinkBoxProps {
  title: string;
  href: string;
  image: string | StaticImageData;
}

const SiteCard = ({ title, href, image, ...props }: SiteCardProps) => (
  <LinkBox pos="relative" {...props}>
    <Image
      alt={title}
      src={image}
      placeholder="blur"
      objectFit="cover"
      objectPosition="center"
    />
    <Flex
      rounded="2xl"
      flexDir="column"
      zIndex="docked"
      align="flex-end"
      pos="absolute"
      top="0"
      left="0"
      right="0"
      bottom="1.5"
      transition="ease-out"
      transitionDuration="0.2s"
      _hover={{
        color: 'blackAlpha.400',
        boxShadow: '10px 10px 10px',
      }}
    >
      <Box
        flexGrow={0}
        mt={[-3, -6]}
        mr={[2, 4]}
        textAlign="center"
        fontWeight="bold"
        fontSize={['lg', '3xl']}
        bg="white"
        shadow="dark-lg"
        py={[2, 4]}
        sx={{ writingMode: 'vertical-rl' }}
      >
        <Text as="h2">
          <RouteLink
            _hover={{ textDecor: 'none' }}
            as={LinkOverlay}
            href={href}
          >
            {title}
          </RouteLink>
        </Text>
      </Box>
      <Box flexGrow={1} />
    </Flex>
  </LinkBox>
);

export default SiteCard;
