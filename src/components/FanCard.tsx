import React from 'react';

import {
  Avatar,
  Box,
  BoxProps,
  Flex,
  HStack,
  Icon,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { AiOutlineEye } from 'react-icons/ai';
import {
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';

interface PlaceCardProps extends BoxProps {
  name: string;
  description: string;
  image: string | StaticImageData;
  liked?: boolean;
  saved?: boolean;
}

const FanCard = ({
  name,
  description,
  image,
  liked,
  saved,
  ...props
}: PlaceCardProps) => (
  <Box pos="relative" mt="16" {...props}>
    <Avatar
      size="2xl"
      pos="absolute"
      zIndex="docked"
      top="-16"
      left="calc(50% - 64px)"
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
      rounded="2xl"
      border="1px"
      borderColor="blackAlpha.600"
      overflow="hidden"
    >
      <Image src={image} width={400} height={300} />
      <LinkBox display="flex" flexDir="column" m="4">
        <LinkOverlay href="#" isExternal>
          <Text variant="headline-2" noOfLines={1}>
            {name}
          </Text>
        </LinkOverlay>
        <Text>{description}</Text>
        <Flex justify="flex-end" mt="8">
          <HStack fontWeight="bold">
            <Icon as={AiOutlineEye} color="blackAlpha.500" boxSize="24px" />
            <Text as="span">3萬</Text>
            <Icon
              as={liked ? BsHeartFill : BsHeart}
              color={liked ? 'red.600' : 'blackAlpha.500'}
              boxSize="24px"
            />
            <Text as="span">3千</Text>
          </HStack>
        </Flex>
      </LinkBox>
    </Flex>
  </Box>
);

export default FanCard;
