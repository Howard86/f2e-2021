import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type mapboxgl from 'mapbox-gl';
import Head from 'next/head';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoLocate } from 'react-icons/io5';
import { MdOutlinePlace } from 'react-icons/md';

import { useMap } from './MapContextProvider';

import BikeIcon from '@/components/icons/BikeIcon';
import DockIcon from '@/components/icons/DockIcon';
import useAppToast from '@/hooks/use-app-toast';
import { useGetStationsByCoordinateMutation } from '@/services/local';
import type { Coordinate } from '@/services/mapbox';

const DEFAULT_ZOOM = 15;

interface StationModalProps {
  name: string;
  rentNumber: number;
  returnNumber: number;
  address: string;
}

const Map = () => {
  const toast = useAppToast();
  const { mapRef, markersRef, positionMarkerRef, stationIdSetRef } = useMap();
  const currentPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  // TODO: refactor with useReducer
  const [modalProps, setModalProps] = useState<StationModalProps>({
    name: '',
    rentNumber: 0,
    returnNumber: 0,
    address: '',
  });
  const divRef = useRef<HTMLDivElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getStations, { isLoading }] = useGetStationsByCoordinateMutation();

  const [loaded, setLoaded] = useState(false);

  const loadStationMarker = async () => {
    if (!currentPositionRef.current) {
      return;
    }

    const { attachJSXMarker } = await import('@/services/mapbox');

    const result = await getStations(currentPositionRef.current).unwrap();

    result.data.forEach((station) => {
      if (!stationIdSetRef.current.has(station.StationUID)) {
        const coordinate = [
          station.StationPosition.PositionLon,
          station.StationPosition.PositionLat,
        ] as Coordinate;

        stationIdSetRef.current.add(station.StationUID);

        markersRef.current.push(
          attachJSXMarker(
            mapRef.current,
            <Box
              id={station.StationUID}
              h="82px"
              w="80px"
              bgImage="url(/icons/marker.png)"
              cursor="pointer"
              onClick={() => {
                setModalProps({
                  name: station.StationName.Zh_tw,
                  address: station.StationAddress.Zh_tw,
                  rentNumber: station.bike.AvailableRentBikes,
                  returnNumber: station.bike.AvailableReturnBikes,
                });
                onOpen();
                mapRef.current.flyTo({
                  center: coordinate,
                  zoom: DEFAULT_ZOOM,
                });
              }}
              zIndex="modal"
            />,
            coordinate,
          ),
        );
      }
    });
  };

  const onLocate = async () => {
    if (currentPositionRef.current) {
      await loadStationMarker();
      return;
    }

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
        mapRef.current.flyTo({
          center: newPosition.center,
          zoom: DEFAULT_ZOOM,
        });
      };

      currentPositionRef.current = {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      };

      const { initialize, attachJSXMarker } = await import('@/services/mapbox');

      if (mapRef.current && positionMarkerRef.current) {
        flyToCurrent();
        positionMarkerRef.current.remove();
      } else {
        mapRef.current = initialize(divRef.current, newPosition);
      }

      positionMarkerRef.current = attachJSXMarker(
        mapRef.current,
        <Box
          id="current"
          h="40px"
          w="40px"
          bgImage="url(/icons/current.png)"
          pointer="cursor"
          onClick={flyToCurrent}
          zIndex="modal"
        />,
        newPosition.center,
      );

      await loadStationMarker();

      setLoaded(true);
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

  const onZoomIn = () => {
    if (!mapRef.current) {
      toast({ description: '請先定位', status: 'info' });
      return;
    }

    mapRef.current.zoomIn();
  };

  const onZoomOut = () => {
    if (!mapRef.current) {
      toast({ description: '請先定位', status: 'info' });
      return;
    }

    mapRef.current.zoomOut();
  };

  useEffect(() => {
    if (!loaded || !mapRef.current) {
      return;
    }

    const handleMapLoad = () => {
      mapRef.current.resize();
    };

    const handleMapMove = () => {
      const center = mapRef.current.getCenter();
      currentPositionRef.current = {
        lat: center.lat,
        lng: center.lng,
      };
    };

    mapRef.current.on('render', handleMapLoad);
    mapRef.current.on('move', handleMapMove);

    // eslint-disable-next-line consistent-return
    return () => {
      mapRef.current.off('render', handleMapLoad);
      mapRef.current.off('move', handleMapMove);
    };
  }, [loaded, mapRef]);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Box h="calc(100vh - 128px)" maxW="fill-available">
        <Box
          pos="absolute"
          ref={divRef}
          top="0"
          left="0"
          right="0"
          bottom="0"
        />
        <VStack
          sx={{
            pos: 'absolute',
            bottom: 0,
            left: 0,
            m: 8,
            button: {
              fontSize: '32px',
              display: 'inline-flex',
              rounded: 'full',
              bg: 'blackAlpha.700',
              boxSize: '64px',
              _hover: {
                bg: 'blackAlpha.600',
              },
            },
            zIndex: 11,
          }}
          spacing={4}
        >
          <IconButton aria-label="放大" icon={<BiPlus />} onClick={onZoomIn} />
          <IconButton
            aria-label="縮小"
            icon={<BiMinus />}
            onClick={onZoomOut}
          />
        </VStack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pos: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            button: {
              display: 'inline-flex',
              fontSize: '60px',
              bg: 'primary.main',
              boxShadow: '0 0 20px var(--chakra-colors-secondary-main)',
              rounded: 'full',
              boxSize: '100px',
              _hover: {
                bg: 'primary.dark',
              },
            },
            m: 8,
            zIndex: 'docked',
          }}
        >
          <IconButton
            isLoading={isLoading}
            aria-label="定位"
            icon={<IoLocate />}
            onClick={onLocate}
          />
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="sm"
        initialFocusRef={undefined}
      >
        <ModalContent mt="auto" color="black" rounded="3xl">
          <ModalHeader maxW="95%" pb="2">
            {modalProps.name}
          </ModalHeader>
          <ModalCloseButton mt="1.5" />
          <ModalBody mb="4" fontSize="lg">
            <Flex sx={{ mb: 4, div: { w: '50%', alignItems: 'center' } }}>
              <Flex>
                <BikeIcon color="secondary.main" fontSize="2xl" mr="2" />
                可租借：{modalProps.rentNumber}台
              </Flex>
              <Flex>
                <DockIcon color="secondary.main" fontSize="2xl" mr="2" />
                可歸還：{modalProps.returnNumber}台
              </Flex>
            </Flex>
            <Flex>
              <Icon
                color="secondary.main"
                as={MdOutlinePlace}
                fontSize="2xl"
                mr="2"
              />
              {modalProps.address}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Map;
