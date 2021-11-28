import React, { useEffect } from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { BiCurrentLocation } from 'react-icons/bi';

import { useMap } from './MapContextProvider';

import useGetLocation from '@/hooks/use-get-location';
import background from '@/map.jpg';

interface MapProps {
  hideLocate?: boolean;
}

const Map = ({ hideLocate }: MapProps) => {
  const { mapContextRef, divRef, isLoaded } = useMap();
  const { onLocate, currentPositionRef } = useGetLocation();

  useEffect(() => {
    if (!isLoaded || !mapContextRef.current.map) {
      return;
    }

    const { map } = mapContextRef.current;

    const handleMapLoad = () => {
      map.resize();
    };

    const handleMapMove = () => {
      const center = map.getCenter();
      currentPositionRef.current = {
        lat: center.lat,
        lng: center.lng,
      };
    };

    map.on('render', handleMapLoad);
    map.on('move', handleMapMove);

    // eslint-disable-next-line consistent-return
    return () => {
      map.off('render', handleMapLoad);
      map.off('move', handleMapMove);
    };
  }, [currentPositionRef, isLoaded, mapContextRef]);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Box
        pos="absolute"
        ref={divRef}
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="docked"
      />
      <Box
        pos="relative"
        top="0"
        bottom="0"
        left="0"
        right="0"
        overflow="hidden"
      >
        <Image
          alt="背景"
          src={background}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <IconButton
        pos="absolute"
        display={hideLocate ? 'none' : 'inline-flex'}
        bottom="4"
        right="4"
        fontSize="2xl"
        rounded="full"
        shadow="lg"
        aria-label="定位"
        zIndex="docked"
        icon={<BiCurrentLocation />}
        onClick={onLocate}
      />
    </>
  );
};

export default Map;
