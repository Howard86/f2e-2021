import React, { useCallback, useRef } from 'react';

import { Box } from '@chakra-ui/react';

import useAppToast from './use-app-toast';

import { ZoomLevel } from '@/components/BusStopDrawer';
import { useMap } from '@/components/MapContextProvider';

const useGetLocation = () => {
  const toast = useAppToast();
  const { mapContextRef } = useMap();
  const currentPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  const onLocate = useCallback(async () => {
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
        zoom: ZoomLevel.Stops,
      };

      const flyToCurrent = () => {
        mapContextRef.current.map.flyTo({
          center: newPosition.center,
          zoom: ZoomLevel.Stops,
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

      if (mapContextRef.current.map) {
        mapContextRef.current.positionMarker.addTo(mapContextRef.current.map);
        flyToCurrent();
      }
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
  }, [mapContextRef, toast]);

  return { currentPositionRef, onLocate };
};

export default useGetLocation;
