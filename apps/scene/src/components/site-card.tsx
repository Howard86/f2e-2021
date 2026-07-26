import {
  Box,
  Flex,
  LinkBox,
  type LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image, { type StaticImageData } from 'next/image';

import RouteLink from './route-link';

interface SiteCardProps extends LinkBoxProps {
  href: string;
  image: string | StaticImageData;
  title: string;
}

const SiteCard = ({ title, href, image, ...props }: SiteCardProps) => (
  <LinkBox pos="relative" {...props}>
    <Image
      alt={title}
      placeholder="blur"
      src={image}
      style={{
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
    <Flex
      _hover={{
        boxShadow: '10px 10px 10px',
        color: 'blackAlpha.400',
      }}
      align="flex-end"
      bottom="0"
      flexDir="column"
      left="0"
      pos="absolute"
      right="0"
      rounded="3xl"
      top="0"
      transition="ease-out"
      transitionDuration="0.2s"
      zIndex="docked"
    >
      <Box
        bg="white"
        css={{ writingMode: 'vertical-rl' }}
        flexGrow={0}
        fontSize={['lg', '3xl']}
        fontWeight="bold"
        mr={[2, 4]}
        mt={[-3, -6]}
        py={[2, 4]}
        shadow="dark-lg"
        textAlign="center"
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
