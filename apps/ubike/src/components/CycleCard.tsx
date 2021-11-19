import React, { useRef } from 'react';

import {
  Box,
  Flex,
  Heading,
  HStack,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import type { City } from '@f2e/ptx';
import type { GeoJSONMultiLineString } from 'wellknown';

import DistanceIcon from './icons/DistanceIcon';
import PlaceIcon from './icons/PlaceIcon';
import StarIcon from './icons/StarIcon';
import { useMap } from './MapContextProvider';

import useAppToast from '@/hooks/use-app-toast';
import { Coordinate } from '@/services/mapbox';
import { getDifficulty } from '@/services/utils';

interface CycleCardProps {
  name: string;
  length?: number;
  city: City;
  onToggle: VoidFunction;
  geoJson: GeoJSONMultiLineString;
}

const CycleCard = ({
  name,
  city,
  length,
  onToggle,
  geoJson,
}: CycleCardProps) => {
  const toast = useAppToast();
  const ref = useRef();
  const { mapRef, layerIdRef, markersRef } = useMap();
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

    const { addLayerAndSource: addLayer, attachJSX } = await import(
      '@/services/mapbox'
    );

    if (mapRef.current.getLayer(layerIdRef.current)) {
      mapRef.current.removeLayer(layerIdRef.current);
    }

    if (mapRef.current.getSource(layerIdRef.current)) {
      mapRef.current.removeSource(layerIdRef.current);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const marker of markersRef.current) {
      marker.remove();
    }
    markersRef.current = [];

    layerIdRef.current = addLayer(
      mapRef.current,
      name,
      geoJson,
      theme.colors.primary.main,
    );
    const coordinates = geoJson.coordinates[0] as Coordinate[];

    markersRef.current.push(
      attachJSX(
        mapRef.current,
        <Box
          px="var(--chakra-space-2)"
          py="var(--chakra-space-1)"
          bgColor="var(--chakra-colors-primary-main)"
          color="white"
          rounded="var(--chakra-radii-xl)"
        >
          起點
        </Box>,
        coordinates[0],
      ),
    );
    markersRef.current.push(
      attachJSX(
        mapRef.current,
        <Box
          px="var(--chakra-space-2)"
          py="var(--chakra-space-1)"
          bgColor="var(--chakra-colors-primary-main)"
          color="white"
          rounded="var(--chakra-radii-xl)"
        >
          終點
        </Box>,
        coordinates[coordinates.length - 1],
      ),
    );

    onToggle();
  };

  return (
    <Box
      ref={ref}
      p={[4, 6]}
      bg="white"
      color="blackAlpha.800"
      rounded="xl"
      cursor="pointer"
      _hover={{
        bg: 'whiteAlpha.900',
      }}
      onClick={onClick}
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
    </Box>
  );
};

export default CycleCard;
