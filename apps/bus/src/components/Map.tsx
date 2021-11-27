import React, { useEffect, useRef } from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import type mapboxgl from 'mapbox-gl';
import Head from 'next/head';
import Image from 'next/image';
import { IoLocate } from 'react-icons/io5';

import { useMap } from './MapContextProvider';

import useAppToast from '@/hooks/use-app-toast';
import background from '@/map.jpg';

const DEFAULT_ZOOM = 15;

const Map = () => {
  const toast = useAppToast();
  const { mapContextRef, divRef, isLoaded } = useMap();
  const currentPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  const onLocate = async () => {
    if (!window.navigator) {
      toast({ description: '偵測定位系統失敗', status: 'error' });
      return;
    }

    try {
      const geoLocation = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          window.navigator.geolocation.getCurrentPosition(resolve, reject),
      );

      toast({ description: '成功獲取定位' });

      console.warn(geoLocation);

      const newPosition = {
        center: [
          geoLocation.coords.longitude,
          geoLocation.coords.latitude,
        ] as mapboxgl.LngLatLike,
        zoom: DEFAULT_ZOOM,
      };

      const flyToCurrent = () => {
        mapContextRef.current.map.flyTo({
          center: newPosition.center,
          zoom: DEFAULT_ZOOM,
        });
      };

      currentPositionRef.current = {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      };

      const { createJSXMarker: attachJSXMarker } = await import(
        '@/services/mapbox'
      );

      if (mapContextRef.current.map && mapContextRef.current.positionMarker) {
        flyToCurrent();
        mapContextRef.current.positionMarker.remove();
      }

      mapContextRef.current.positionMarker = attachJSXMarker(
        <Box
          id="current"
          h="40px"
          w="40px"
          bgImage="url(/current.png)"
          pointer="cursor"
          onClick={flyToCurrent}
          zIndex="modal"
        />,
        newPosition.center,
      );
      mapContextRef.current.positionMarker.addTo(mapContextRef.current.map);
      flyToCurrent();
    } catch (error) {
      const { code } = error as GeolocationPositionError;
      console.error(error);

      let description: string;
      switch (code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          description = '授權定位失敗';
          break;

        case GeolocationPositionError.POSITION_UNAVAILABLE:
          description = '該地區無定位服務';
          break;

        case GeolocationPositionError.TIMEOUT:
          description = '獲取地址過久，連線中斷';
          break;

        default:
          description = '未知錯誤';
          break;
      }
      toast({ description, status: 'error' });
    }
  };

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
  }, [isLoaded, mapContextRef]);

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
        pos="absolute"
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
        isLoading={!isLoaded}
        bottom={isLoaded ? 12 : 4}
        right="4"
        fontSize="2xl"
        rounded="full"
        shadow="lg"
        aria-label="定位"
        zIndex="docked"
        icon={<IoLocate />}
        onClick={onLocate}
      />
    </>
  );
};

export default Map;
