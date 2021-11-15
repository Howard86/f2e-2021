import React from 'react';

import {
  Flex,
  FlexProps,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

import CardBanner from './CardBanner';
import RouteLink from './RouteLink';

interface PlaceCardProps extends FlexProps {
  name: string;
  city: string;
  address: string;
  openingHours?: string;
  contactNumber?: string;
  serviceInfo?: string;
  image: string;
  href: string;
}

const PlaceCard = ({
  name,
  city,
  address,
  openingHours,
  contactNumber,
  serviceInfo,
  image,
  href,
}: PlaceCardProps) => (
  <LinkBox
    display="flex"
    pos="relative"
    flexDir="column"
    rounded="2xl"
    border="1px"
    borderColor="blackAlpha.600"
    overflow="hidden"
    transition="ease-out"
    transitionDuration="0.2s"
    _hover={{
      color: 'blackAlpha.400',
      boxShadow: '12px 12px 10px',
    }}
  >
    {/* TODO: add rate & view */}
    <CardBanner
      pos="absolute"
      top="0"
      rate={(name.length % 3) + 2}
      view={address.length}
      saved
      left="0"
      right="0"
      zIndex="docked"
    />
    <Image
      src={image}
      fallbackSrc="/static/fallback.jpg"
      objectFit="cover"
      align="center"
      w="full"
      height={300}
    />
    <Flex flexDir="column" m="4" lineHeight="6" color="text.body">
      <Flex justify="space-between" fontWeight="bold">
        <Text as="h3" fontSize={['lg', 'xl']} color="blackAlpha.800" my="2">
          <RouteLink href={href} as={LinkOverlay}>
            {name}
          </RouteLink>
        </Text>
        <Flex flexShrink={0} align="center" pt="2" pb="4">
          <Icon as={FiMapPin} boxSize={6} mr="1" />
          <Text as="span">{city}</Text>
        </Flex>
      </Flex>
      <Text fontWeight="bold">{address}</Text>
      {contactNumber && <Text variant="body">電話：{contactNumber}</Text>}
      {openingHours && <Text variant="body">營業時間：{openingHours}</Text>}
      {serviceInfo && <Text variant="body">{serviceInfo}</Text>}
    </Flex>
  </LinkBox>
);

export default PlaceCard;
