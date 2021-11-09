import React from 'react';

import { Flex, FlexboxProps, Text } from '@chakra-ui/react';

import SunnyIcon from './icons/SunnyIcon';

interface WeatherStatProps extends FlexboxProps {
  city: string;
  temperature: number;
}

const WeatherStat = ({ city, temperature, ...props }: WeatherStatProps) => (
  <Flex flexDir="column" justify="center" align="center" {...props}>
    <Text>{city}</Text>
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
