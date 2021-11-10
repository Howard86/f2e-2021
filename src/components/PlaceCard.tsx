import React from 'react';

import { Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

import CardBanner from './CardBanner';

interface PlaceCardProps extends FlexProps {
  name: string;
  city: string;
  address: string;
  openingHours: string;
  contactNumber: string;
  image: string | StaticImageData;
}

const PlaceCard = ({
  name,
  city,
  address,
  openingHours,
  contactNumber,
  image,
}: PlaceCardProps) => (
  <Flex
    pos="relative"
    flexDir="column"
    rounded="2xl"
    border="1px"
    borderColor="blackAlpha.600"
  >
    {/* TODO: add rate & view */}
    <CardBanner
      pos="absolute"
      top="0"
      rate={4}
      view={39}
      saved
      left="0"
      right="0"
      zIndex="docked"
    />
    <Image src={image} width={400} height={300} />
    <Flex flexDir="column" m="2">
      <Flex justify="space-between">
        <Text variant="headline-2" noOfLines={1}>
          {name}
        </Text>
        <Flex alignItems="center">
          <Icon as={FiMapPin} boxSize="24px" mr="1" />
          <Text as="span">{city}</Text>
        </Flex>
      </Flex>
      <Text fontWeight="bold" color="text.body">
        {address}
      </Text>
      <Text variant="body" color="text.body">
        營業時間：{openingHours}
      </Text>
      <Text variant="body" color="text.body">
        電話：{contactNumber}
      </Text>
    </Flex>
  </Flex>
);

export default PlaceCard;
