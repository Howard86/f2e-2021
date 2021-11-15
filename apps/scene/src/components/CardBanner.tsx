import React from 'react';

import {
  Circle,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Text,
  useToken,
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineEye } from 'react-icons/ai';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';

interface CardBannerProps extends FlexProps {
  rate: number;
  view: number;
  saved?: boolean;
}

const CardBanner = ({ rate, view, saved, ...props }: CardBannerProps) => {
  const size = useToken('boxSize', ['16px', '16px', '24px']);

  return (
    <Flex
      m={[3, 3, 4]}
      justify="space-between"
      color="blackAlpha.400"
      {...props}
    >
      <HStack
        fontWeight="bold"
        bg="white"
        px={[2, 2, 4]}
        py={[1, 1, 2]}
        spacing={[1, 1, 2]}
        rounded="full"
        shadow="dark-lg"
      >
        <Icon as={AiFillStar} color="yellow.300" boxSize={size} />
        <Text as="span" color="blackAlpha.600">
          {rate}
        </Text>
        <Icon as={AiOutlineEye} color="blackAlpha.500" boxSize={size} />
        <Text as="span" color="blackAlpha.600">
          {view}
        </Text>
      </HStack>
      <Circle as="span" rounded="full" size={[8, 8, 12]} bgColor="white">
        <Icon
          boxSize={size}
          as={saved ? BsBookmarkPlusFill : BsBookmarkPlus}
          color={saved ? 'red.600' : 'blackAlpha.600'}
        />
      </Circle>
    </Flex>
  );
};

export default CardBanner;
