import { Flex, type FlexProps, HStack, Text } from '@chakra-ui/react';

import CloudIcon from './icons/cloud-icon';
import RainWithCloudIcon from './icons/rain-with-cloud-icon';
import SunIcon from './icons/sun-icon';
import SunWithCloudIcon from './icons/sun-with-cloud-icon';
import UmbrellaIcon from './icons/umbrella-icon';

interface WeatherStatProps extends FlexProps {
  city: string;
  maxT: string;
  minT: string;
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
      return SunWithCloudIcon;
  }
};

const TemperatureText = ({ text }: { text: string }) => (
  <Text fontSize="lg" fontWeight="bold" lineHeight="3">
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
    <Flex align="center" flexDir="column" justify="center" {...props}>
      <Text color="blackAlpha.700" fontWeight="bold">
        {city}
      </Text>
      <WeatherIcon boxSize="20" my="4" />
      <HStack gap={1}>
        <TemperatureText text={minT} />
        <Text>-</Text>
        <TemperatureText text={maxT} />
      </HStack>
    </Flex>
  );
};

export default WeatherStat;
