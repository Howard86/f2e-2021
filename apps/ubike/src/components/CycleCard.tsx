import React, { useRef } from 'react';

import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import type { City } from '@f2e/ptx';
import { motion, Variants } from 'framer-motion';
import type { GeoJSONMultiLineString } from 'wellknown';

import DistanceIcon from './icons/DistanceIcon';
import PlaceIcon from './icons/PlaceIcon';
import StarIcon from './icons/StarIcon';
import { useMap } from './MapContextProvider';
import RouteMarker from './RouteMarker';

import useAppToast from '@/hooks/use-app-toast';
import { Coordinate } from '@/services/mapbox';
import { getDifficulty } from '@/services/utils';

interface CycleCardProps {
  name: string;
  key: string;
  length?: number;
  city: City;
  onToggle: VoidFunction;
  geoJson: GeoJSONMultiLineString;
}

const MotionBox = motion<BoxProps>(Box);

const variants: Variants = {
  hidden: { opacity: 0, translateY: 20 },
  show: { opacity: 1, translateY: 0 },
};

const CycleCard = ({
  name,
  key,
  city,
  length,
  onToggle,
  geoJson,
}: CycleCardProps) => {
  const toast = useAppToast();
  const ref = useRef();
  const { mapRef, layerIdRef, markersRef, stationIdSetRef } = useMap();
  const theme = useTheme();

  const onClick = async () => {
    if (!mapRef.current) {
      toast({
        description: '麻煩請先打開定位',
        status: 'info',
      });
      onToggle();
      return;
    }

    const { addLayerAndSource, attachJSXMarker } = await import(
      '@/services/mapbox'
    );

    if (mapRef.current.getLayer(layerIdRef.current)) {
      mapRef.current.removeLayer(layerIdRef.current);
    }

    if (mapRef.current.getSource(layerIdRef.current)) {
      mapRef.current.removeSource(layerIdRef.current);
    }

    stationIdSetRef.current.clear();
    // eslint-disable-next-line no-restricted-syntax
    for (const marker of markersRef.current) {
      marker.remove();
    }
    markersRef.current = [];

    layerIdRef.current = addLayerAndSource(
      mapRef.current,
      name,
      geoJson,
      theme.colors.primary.main,
    );
    const coordinates = geoJson.coordinates[0] as Coordinate[];

    markersRef.current.push(
      attachJSXMarker(
        mapRef.current,
        <RouteMarker>起點</RouteMarker>,
        coordinates[0],
      ),
    );
    markersRef.current.push(
      attachJSXMarker(
        mapRef.current,
        <RouteMarker>終點</RouteMarker>,
        coordinates[coordinates.length - 1],
      ),
    );

    onToggle();
  };

  return (
    <MotionBox
      ref={ref}
      key={key}
      p={[4, 6]}
      bg="white"
      color="blackAlpha.800"
      rounded="xl"
      cursor="pointer"
      _hover={{
        bg: 'whiteAlpha.900',
      }}
      onClick={onClick}
      variants={variants}
    >
      <Tooltip label={name}>
        <Heading fontSize="lg" mb="2" noOfLines={1}>
          {name}
        </Heading>
      </Tooltip>
      <Flex
        fontSize="sm"
        sx={{
          mb: 4,
          div: { w: '50%', alignItems: 'center' },
        }}
      >
        <Flex>
          <DistanceIcon fontSize="2xl" mr="1" />
          {length ? (length / 1000).toFixed(1) : '-'}
          KM
        </Flex>
        <Flex>
          <PlaceIcon color="secondary.main" fontSize="2xl" mr="1" />
          {city}
        </Flex>
      </Flex>
      <HStack>
        {new Array(getDifficulty(length)).fill(0).map((_, index) => (
          <StarIcon
            // eslint-disable-next-line react/no-array-index-key
            key={`${name}-${index}`}
            color="primary.main"
          />
        ))}
      </HStack>
    </MotionBox>
  );
};

export default CycleCard;
