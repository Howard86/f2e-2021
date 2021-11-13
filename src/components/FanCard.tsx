import React from 'react';

import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useToken,
} from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';
import {
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';

import RouteLink from './RouteLink';

interface FanCardProps extends BoxProps {
  id: string;
  city: string;
  name: string;
  description: string;
  image: string;
  liked?: boolean;
  saved?: boolean;
  href: string;
}

// TODO: this design is a bit against the structure, consider refactor all cards
const FanCard = ({
  id,
  name,
  city,
  description,
  image,
  liked,
  saved,
  href,
  ...props
}: FanCardProps) => {
  const size = useToken('w', ['64px', '64px', '128px']);

  return (
    <Box mt={[8, 8, 16]} pos="relative" {...props}>
      <Avatar
        w={size}
        h={size}
        pos="absolute"
        zIndex="docked"
        top={[-8, -8, -16]}
        left={['calc(50% - 32px)', 'calc(50% - 32px)', 'calc(50% - 64px)']}
      />
      <IconButton
        pos="absolute"
        right="0"
        m="4"
        aria-label="save-as-bookmark"
        rounded="full"
        icon={saved ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
        fontSize="2xl"
        color={saved ? 'red.600' : 'blackAlpha.600'}
        zIndex="docked"
      />
      <Flex
        pos="relative"
        flexDir="column"
        rounded="3xl"
        border="1px"
        borderColor="blackAlpha.600"
        overflow="hidden"
      >
        <Image
          alt={name}
          src={image}
          w="full"
          h={[300, 200]}
          fallbackSrc="/static/fallback.jpg"
          objectFit="cover"
          objectPosition="center"
        />
        <LinkBox display="flex" flexDir="column" m="4" h={[200, 180]}>
          <Text
            as="h3"
            mb="4"
            fontSize={['xl', '2xl']}
            fontWeight="bold"
            noOfLines={1}
          >
            <RouteLink as={LinkOverlay} href={href}>
              {name}
            </RouteLink>
          </Text>
          <Text noOfLines={[4, 3]}>{description}</Text>
          <Box flexGrow={1} />
          <Flex justify="flex-end" mt="8">
            <HStack color="blackAlpha.600">
              <Icon as={AiOutlineEye} boxSize="24px" />
              <Text as="span">{id.charAt(id.length - 1)}萬</Text>
              <Icon
                as={liked ? BsHeartFill : BsHeart}
                color={liked ? 'red.600' : 'inherit'}
                boxSize="24px"
              />
              <Text as="span">{id.charAt(id.length - 2)}千</Text>
            </HStack>
          </Flex>
        </LinkBox>
      </Flex>
    </Box>
  );
};

export default FanCard;
