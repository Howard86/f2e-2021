import React from 'react';

import { Flex, FlexProps, Text } from '@chakra-ui/react';

import SunnyIcon from './icons/SunnyIcon';

interface WeatherStatProps extends FlexProps {
  city: string;
  temperature: number;
}

const WeatherStat = ({ city, temperature, ...props }: WeatherStatProps) => (
  <Flex flexDir="column" justify="center" align="center" {...props}>
    <Text fontWeight="bold" color="blackAlpha.700">
      {city}
    </Text>
    <SunnyIcon boxSize="20" mt="4" mb="6" />
    <Text variant="headline-1" lineHeight="3">
      {temperature}
      <Text as="sup" variant="subtitle" verticalAlign="top">
        &deg;C
      </Text>
    </Text>
  </Flex>
);

export default WeatherStat;
