import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import type mapboxgl from 'mapbox-gl';
import Head from 'next/head';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoLocate } from 'react-icons/io5';

import useAppToast from '@/hooks/use-app-toast';

const DEFAULT_ZOOM = 18;

const HomePage = () => {
  const toast = useAppToast();
  const mapRef = useRef<mapboxgl.Map>(null);
  const divRef = useRef<HTMLDivElement>();

  const [position, setPosition] = useState<Partial<mapboxgl.MapboxOptions>>({
    center: [0, 0],
    zoom: 0,
  });
  const [loaded, setLoaded] = useState(false);

  // eslint-disable-next-line no-console
  console.log('position :>> ', position);

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

      const newPosition: Partial<mapboxgl.MapboxOptions> = {
        center: [geoLocation.coords.longitude, geoLocation.coords.latitude],
        zoom: DEFAULT_ZOOM,
      };

      const MapboxGL = (await import('mapbox-gl')).default;
      MapboxGL.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      setPosition(newPosition);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: newPosition.center,
          zoom: DEFAULT_ZOOM,
        });
      } else {
        mapRef.current = new MapboxGL.Map({
          container: divRef.current,
          style: 'mapbox://styles/mapbox/dark-v10',

          ...newPosition,
        });
      }

      mapRef.current.setLayoutProperty('country-label', 'text-field', [
        'get',
        'name_zh-TW',
      ]);
      new MapboxGL.Marker({ color: 'var(--chakra-colors-secondary-main' })
        .setLngLat(newPosition.center)
        .addTo(mapRef.current);

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
    if (!mapRef.current || !loaded) {
      return;
    }

    const handleMove = () => {
      const center = mapRef.current.getCenter();
      setPosition({
        center: [center.lng, center.lat],
        zoom: mapRef.current.getZoom(),
      });
    };

    mapRef.current.on('move', handleMove);

    // eslint-disable-next-line consistent-return
    return () => {
      mapRef.current.off('move', handleMove);
    };
  }, [loaded]);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Box h="full">
        <Tabs variant="unstyled">
          <TabList
            sx={{
              display: 'inline-flex',
              pos: 'relative',
              rounded: 'full',
              bg: 'whiteAlpha.200',
              zIndex: 'docked',
              m: 8,
              button: {
                px: 5,
                py: 3,
                rounded: 'full',
                fontWeight: 'bold',
                _selected: {
                  _before: {
                    content: '""',
                    bg: 'whiteAlpha.100',
                    h: 'full',
                    w: '50%',
                    pos: 'absolute',
                    rounded: 'full',
                  },
                  bg: 'primary.main',
                  _hover: {
                    bg: 'primary.dark',
                  },
                },
                _hover: {
                  bg: 'whiteAlpha.200',
                },
                _first: {
                  mr: -2.5,
                },
              },
            }}
          >
            <Tab>租車/還車</Tab>
            <Tab>騎乘路線</Tab>
          </TabList>
          <TabPanels
            sx={{
              pos: 'absolute',
              top: 0,
              div: {
                p: 0,
              },
            }}
          >
            <TabPanel>
              <Box h="100vh">
                <Box
                  pos="absolute"
                  ref={divRef}
                  top="0"
                  bottom="0"
                  left="0"
                  right="0"
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
                  <IconButton
                    aria-label="放大"
                    icon={<BiPlus />}
                    onClick={onZoomIn}
                  />
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
                    aria-label="定位"
                    icon={<IoLocate />}
                    onClick={onLocate}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel />
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default HomePage;
