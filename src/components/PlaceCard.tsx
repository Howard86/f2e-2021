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
    overflow="hidden"
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
    <Image
      src={image}
      objectFit="cover"
      objectPosition="cover"
      width={400}
      height={300}
    />
    <Flex flexDir="column" m="4" lineHeight="6">
      <Flex
        flexDir={['row', 'column', 'row']}
        justify="space-between"
        fontWeight="bold"
      >
        <Text as="h3" fontSize="2xl" color="blackAlpha.800" noOfLines={1}>
          {name}
        </Text>
        <Flex align="center" pt="2" pb="4">
          <Icon as={FiMapPin} boxSize={6} mr="1" />
          <Text as="span">{city}</Text>
        </Flex>
      </Flex>
      <Text fontWeight="bold">{address}</Text>
      <Text variant="body">營業時間：{openingHours}</Text>
      <Text variant="body">電話：{contactNumber}</Text>
    </Flex>
  </Flex>
);

export default PlaceCard;
