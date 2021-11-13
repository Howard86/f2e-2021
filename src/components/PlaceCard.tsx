import React from 'react';

import { Flex, FlexProps, Icon, Image, Text } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

import CardBanner from './CardBanner';

interface PlaceCardProps extends FlexProps {
  name: string;
  city?: string;
  address: string;
  openingHours?: string;
  contactNumber?: string;
  serviceInfo?: string;
  image: string;
}

const PlaceCard = ({
  name,
  city = '-',
  address,
  openingHours,
  contactNumber,
  serviceInfo,
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
      fallbackSrc="/static/fallback.jpg"
      objectFit="cover"
      objectPosition="cover"
      w="full"
      height={300}
    />
    <Flex flexDir="column" m="4" lineHeight="6">
      <Flex justify="space-between" fontWeight="bold">
        <Text as="h3" fontSize={['lg', 'xl']} color="blackAlpha.800" my="2">
          {name}
        </Text>
        <Flex flexShrink={0} align="center" pt="2" pb="4">
          <Icon as={FiMapPin} boxSize={6} mr="1" />
          <Text as="span">{city}</Text>
        </Flex>
      </Flex>
      <Text fontWeight="bold">{address}</Text>
      {contactNumber && <Text variant="body">電話：{contactNumber}</Text>}
      {openingHours && <Text variant="body">營業時間：{openingHours}</Text>}
      {serviceInfo && <Text variant="body">服務：{serviceInfo}</Text>}
    </Flex>
  </Flex>
);

export default PlaceCard;
