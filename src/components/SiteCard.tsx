import React from 'react';

import {
  Box,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

interface SiteCardProps extends LinkBoxProps {
  title: string;
  href: string;
  image: string | StaticImageData;
}

const SiteCard = ({ title, href, image, ...props }: SiteCardProps) => (
  <LinkBox pos="relative" {...props}>
    <Box
      right="2"
      top="-2"
      textAlign="center"
      fontWeight="bold"
      fontSize="3xl"
      pos="absolute"
      zIndex="docked"
      bg="white"
      shadow="xl"
      borderColor="blackAlpha.300"
      rounded="md"
      borderWidth="1px"
      py="4"
      sx={{ writingMode: 'vertical-rl' }}
    >
      <Text as="h2">
        <NextLink href={href} passHref>
          <LinkOverlay>{title}</LinkOverlay>
        </NextLink>
      </Text>
    </Box>
    <Image src={image} layout="responsive" width={285} height={380} />
    <Text as="span" opacity={0}>
      <NextLink href={href} passHref>
        <LinkOverlay>{title}鏈結</LinkOverlay>
      </NextLink>
    </Text>
  </LinkBox>
);

export default SiteCard;
