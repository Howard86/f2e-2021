import React from 'react';

import { Box, Flex, FlexProps, HStack, Icon, Text } from '@chakra-ui/react';
import { AiFillStar, AiOutlineEye } from 'react-icons/ai';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';

interface CardBannerProps extends FlexProps {
  rate: number;
  view: number;
  saved?: boolean;
}

const CardBanner = ({ rate, view, saved, ...props }: CardBannerProps) => (
  <Flex m="4" justify="space-between" color="blackAlpha.400" {...props}>
    <HStack
      fontWeight="bold"
      bg="white"
      px="4"
      py="2"
      rounded="full"
      shadow="lg"
    >
      <Icon as={AiFillStar} color="yellow.300" boxSize="24px" />
      <Text as="span">{rate}</Text>
      <Icon as={AiOutlineEye} color="blackAlpha.500" boxSize="24px" />
      <Text as="span">{view}</Text>
    </HStack>
    <Box as="span" rounded="full" p="2" bgColor="white">
      <Icon
        w="24px"
        h="24px"
        as={saved ? BsBookmarkPlusFill : BsBookmarkPlus}
        color={saved ? 'red.600' : 'blackAlpha.600'}
      />
    </Box>
  </Flex>
);

export default CardBanner;
