import React, { useMemo, useState } from 'react';

import { Box, Flex, IconButton, StackProps } from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import WeatherStat from './WeatherStat';

const NUMBER_OF_SLIDES = 5;

interface WeatherCarouselProps extends StackProps {
  weathers: OpenData.CityWeather[];
}

const WeatherCarousel = ({ weathers, ...props }: WeatherCarouselProps) => {
  const [sliceIndex, setSliceIndex] = useState(0);

  const increment = () =>
    setSliceIndex((index) => (index === weathers.length - 1 ? 0 : index + 1));
  const decrement = () =>
    setSliceIndex((index) => (index > 0 ? index - 1 : weathers.length - 1));

  const slides = useMemo(
    () =>
      [...weathers, ...weathers].slice(
        sliceIndex,
        sliceIndex + NUMBER_OF_SLIDES,
      ),
    [sliceIndex, weathers],
  );

  return (
    <Flex
      pos="relative"
      maxW="container.md"
      align="center"
      sx={{
        button: {
          bgColor: ['transparent', 'gray.100'],
          h: ['full', 10],
          pos: ['absolute', 'initial'],
          opacity: [0, 1],
          rounded: ['none', 'full'],
          _hover: {
            bgColor: ['whiteAlpha.800', 'gray.200'],
          },
          _first: {
            bgGradient: [
              'linear(to-r, whiteAlpha.800, whiteAlpha.100)',
              'none',
            ],
            left: 0,
          },
          _last: {
            bgGradient: [
              'linear(to-l, whiteAlpha.800, whiteAlpha.100)',
              'none',
            ],
            right: 0,
          },
        },
        _hover: {
          button: {
            opacity: 1,
          },
        },
      }}
    >
      <Box display={['none', 'inline']} flexGrow={1} />
      <IconButton
        aria-label="show previous wether"
        icon={<BiChevronLeft />}
        onClick={decrement}
      />
      <Flex
        color="blackAlpha.500"
        justify="center"
        py="8"
        overflowY="hidden"
        {...props}
      >
        {slides.map((weather) => (
          <WeatherStat
            mx="4"
            key={weather.id}
            city={weather.city}
            minT={weather.minT}
            maxT={weather.maxT}
            weather={weather.weather}
          />
        ))}
      </Flex>
      <IconButton
        aria-label="show next wether"
        icon={<BiChevronRight />}
        onClick={increment}
      />
      <Box display={['none', 'inline']} flexGrow={1} />
    </Flex>
  );
};

export default WeatherCarousel;
