import React, { useMemo, useState } from 'react';

import { HStack, IconButton, StackProps } from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import WeatherStat from './WeatherStat';

const NUMBER_OF_SLIDES = 6;

interface WeatherCarouselProps extends StackProps {
  weathers: Weather.City[];
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
    <HStack
      color="blackAlpha.500"
      justify="center"
      mt="8"
      spacing={8}
      {...props}
    >
      <IconButton
        aria-label="show previous wether"
        rounded="full"
        icon={<BiChevronLeft />}
        onClick={decrement}
      />
      {slides.map((weather) => (
        <WeatherStat
          key={weather.id}
          city={weather.city}
          temperature={weather.temperature}
        />
      ))}
      <IconButton
        rounded="full"
        aria-label="show next wether"
        icon={<BiChevronRight />}
        onClick={increment}
      />
    </HStack>
  );
};

export default WeatherCarousel;
