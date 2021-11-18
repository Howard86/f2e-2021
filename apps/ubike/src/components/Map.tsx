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

import BikeIcon from '@/components/icons/BikeIcon';
import DockIcon from '@/components/icons/DockIcon';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetStationsQuery } from '@/services/local';

const DEFAULT_ZOOM = 15;

interface StationModalProps {
  name: string;
  rentNumber: number;
  returnNumber: number;
  address: string;
}

const Map = () => {
  const toast = useAppToast();
  const mapRef = useRef<mapboxgl.Map>(null);
  // TODO: refactor with useReducer
  const [modalProps, setModalProps] = useState<StationModalProps>({
    name: '',
    rentNumber: 0,
    returnNumber: 0,
    address: '',
  });
  const divRef = useRef<HTMLDivElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getStations, { data }] = useLazyGetStationsQuery();

  const [loaded, setLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);

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
        mapRef.current.flyTo({
          center: newPosition.center,
          zoom: DEFAULT_ZOOM,
        });
      };

      if (mapRef.current) {
        flyToCurrent();
        return;
      }

      const { initialize, attachJSX } = await import('@/services/mapbox');
      mapRef.current = initialize(divRef.current, newPosition);

      attachJSX(
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

      getStations({
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      });

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
    const setMarkers = async () => {
      if (!data || !loaded || rendered) {
        return;
      }

      const { attachJSX } = await import('@/services/mapbox');

      const stations = {
        type: 'FeatureCollection' as const,
        features: data.data.map((station) => {
          const coordinates = [
            station.StationPosition.PositionLon,
            station.StationPosition.PositionLat,
          ] as [number, number];

          const onClick = () => {
            setModalProps({
              name: station.StationName.Zh_tw,
              address: station.StationAddress.Zh_tw,
              rentNumber: station.bike.AvailableRentBikes,
              returnNumber: station.bike.AvailableReturnBikes,
            });
            onOpen();
            mapRef.current.flyTo({ center: coordinates, zoom: DEFAULT_ZOOM });
          };

          attachJSX(
            mapRef.current,
            <Box
              id={station.StationUID}
              h="82px"
              w="80px"
              bgImage="url(/icons/marker.png)"
              cursor="pointer"
              onClick={onClick}
              zIndex="modal"
            />,
            coordinates,
          );

          return {
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates,
            },
            properties: station,
          };
        }),
      };

      if (!mapRef.current.getSource('stations')) {
        mapRef.current.addSource('stations', {
          type: 'geojson',
          data: stations,
        });
      }

      setRendered(true);
    };

    setMarkers();
  }, [data, loaded, onOpen, rendered, toast]);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Box pos="absolute" ref={divRef} top="0" bottom="0" left="0" right="0" />
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
        <IconButton aria-label="縮小" icon={<BiMinus />} onClick={onZoomOut} />
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
          isLoading={loaded && !rendered}
          aria-label="定位"
          icon={<IoLocate />}
          onClick={onLocate}
        />
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
