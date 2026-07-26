import { Box, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import useGetLocation from '@/hooks/use-get-location';
import background from '@/map.jpg';
import { useMap } from './map-context-provider';

interface MapProps {
  hideLocate?: boolean;
}

const MapView = ({ hideLocate }: MapProps) => {
  const { mapContextRef, divRef, isLoaded } = useMap();
  const { onLocate, currentPositionRef } = useGetLocation();

  useEffect(() => {
    if (!(isLoaded && mapContextRef.current.map)) {
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
      <Box
        bottom="0"
        left="0"
        pos="absolute"
        ref={divRef}
        right="0"
        top="0"
        zIndex="docked"
      />
      <Box
        bottom="0"
        left="0"
        overflow="hidden"
        pos="relative"
        right="0"
        top="0"
      >
        <Image
          alt="背景"
          fill
          sizes="100vw"
          src={background}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Box>
      <IconButton
        aria-label="定位"
        bottom="4"
        display={hideLocate ? 'none' : 'inline-flex'}
        fontSize="2xl"
        onClick={onLocate}
        pos="absolute"
        right="4"
        rounded="full"
        shadow="lg"
        zIndex="docked"
      >
        <BiCurrentLocation />
      </IconButton>
    </>
  );
};

export default MapView;
