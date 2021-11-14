import React from 'react';

import { Flex, FlexProps, HStack, Text } from '@chakra-ui/react';

import CloudIcon from './icons/CloudIcon';
import RainWithCloudIcon from './icons/RainWithCloudIcon';
import SunIcon from './icons/SunIcon';
import SunWithCloudIcon from './icons/SunWithCloudIcon';
import UmbrellaIcon from './icons/UmbrellaIcon';

interface WeatherStatProps extends FlexProps {
  city: string;
  minT: string;
  maxT: string;
  weather: OpenData.Weather;
}

const getWeatherIcon = (weather: OpenData.Weather) => {
  switch (weather) {
    case '多雲':
    case '陰天':
    case '陰時多雲':
    case '多雲時陰':
      return CloudIcon;

    case '短暫雨':
      return UmbrellaIcon;

    case '陰短暫雨':
    case '多雲短暫雨':
      return RainWithCloudIcon;

    case '晴':
      return SunIcon;

    default:
    case '多雲時晴':
    case '晴時多雲':
      return SunWithCloudIcon;
  }
};

const TemperatureText = ({ text }: { text: string }) => (
  <Text fontWeight="bold" fontSize="lg" lineHeight="3">
    {text}
    <Text as="sup" fontSize="sm">
      &deg;C
    </Text>
  </Text>
);

const WeatherStat = ({
  city,
  minT,
  maxT,
  weather,
  ...props
}: WeatherStatProps) => {
  const WeatherIcon = getWeatherIcon(weather);

  return (
    <Flex flexDir="column" justify="center" align="center" {...props}>
      <Text fontWeight="bold" color="blackAlpha.700">
        {city}
      </Text>
      <WeatherIcon boxSize="20" my="4" />
      <HStack spacing={1}>
        <TemperatureText text={minT} />
        <Text>-</Text>
        <TemperatureText text={maxT} />
      </HStack>
    </Flex>
  );
};

export default WeatherStat;
