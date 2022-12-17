import React, { useEffect, useState } from 'react';

import {
  Box,
  Circle,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
  Tag,
  Text,
  useBreakpointValue,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import {
  BusDirection,
  BusRoute,
  BusStopOfRoute,
  City,
  CityMap,
  CitySet,
} from '@f2e/tdx';
import type { EntityId } from '@reduxjs/toolkit';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import { BiChevronLeft } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { IoHome } from 'react-icons/io5';
import { GeoJSONLineString, parse } from 'wellknown';

import BusRouteInfoModal from '@/components/BusRouteInfoModal';
import BusStopDrawer, { ZoomLevel } from '@/components/BusStopDrawer';
import { DESKTOP_MAP_LEFT } from '@/components/Layout';
import { useMap } from '@/components/MapContextProvider';
import NavBarItems from '@/components/NavBarItems';
import { DESKTOP_DISPLAY, MOBILE_DISPLAY } from '@/constants/style';
import { ONE_DAY, THIRTY_SEC_IN_MS } from '@/constants/time';
import {
  busEstimationSelector,
  useGetBusEstimationQuery,
} from '@/services/local';
import { busService } from '@/services/tdx';
import { getMiddleElement } from '@/utils/array';
import { getBusEstimationStatus } from '@/utils/bus';
import { getTwoDigitString } from '@/utils/string';

interface BusRoutePageProps {
  city: City;
  routeName: string;
  geoJson: GeoJSONLineString;
  busRoute: BusRoute;
  directions: BusDirection[];
  busStopEntity: RouteStopEntity;
}

type RouteStopEntity = Record<BusDirection, BusStopOfRoute>;

const INITIAL_ID = '';
const STOP_LIST_MAX_HEIGHT = 'calc(100vh - 144px)';

const BusRoutePage = ({
  city,
  routeName,
  busRoute: route,
  geoJson,
  directions,
  busStopEntity: routeStopEntity,
}: BusRoutePageProps) => {
  const theme = useTheme();
  const router = useRouter();
  const tabsProps = useBreakpointValue<Omit<TabsProps, 'children'>>({
    base: { variant: 'solid-rounded' },
    md: { isFitted: true, variant: 'line' },
  });
  const buttonVariant = useBreakpointValue({ base: 'ghost', md: 'solid' });
  const [selectedDirection, setSelectedDirection] = useState<BusDirection>(
    BusDirection.去程,
  );
  const [selectedStopId, setSelectedStopId] = useState<EntityId>(INITIAL_ID);
  const { divRef, mapContextRef, isLoaded, setLoaded } = useMap();
  // TODO: refactor with useReducer
  const extendDisclosure = useDisclosure();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const stopDisclosure = useDisclosure();
  const { data, selectedBusEstimation } = useGetBusEstimationQuery(
    { city, route: routeName },
    {
      skip: router.isFallback,
      selectFromResult: (res) => ({
        ...res,
        selectedBusEstimation:
          res.data &&
          busEstimationSelector.selectById(res.data, selectedStopId),
      }),
      pollingInterval: THIRTY_SEC_IN_MS,
    },
  );

  // as bus direction might only be 迴圈
  const selectedBusRoute =
    routeStopEntity?.[selectedDirection] || routeStopEntity?.[directions[0]];

  const onDrawerClose = () => {
    stopDisclosure.onClose();
    extendDisclosure.onOpen();
  };

  const onSwitchTab = (index: number) => {
    setSelectedDirection(index);
  };

  const onArrowClick = () => {
    router.back();
  };

  const onHomeClick = () => {
    router.push('/');
  };

  useEffect(() => {
    if (isLoaded || router.isFallback) {
      return;
    }

    const handleInitialise = async () => {
      const { initialize, getPosition } = await import('@/services/mapbox');

      const middleStop = getMiddleElement(selectedBusRoute.Stops);

      mapContextRef.current.map = initialize(
        divRef.current,
        getPosition(
          middleStop.StopPosition.PositionLat,
          middleStop.StopPosition.PositionLon,
          ZoomLevel.City,
        ),
      );

      await new Promise<void>((res) => {
        mapContextRef.current.map.on('load', res);
      });
      setLoaded();
    };

    handleInitialise();
  }, [
    divRef,
    isLoaded,
    mapContextRef,
    router.isFallback,
    selectedBusRoute?.Stops,
    setLoaded,
  ]);

  useEffect(() => {
    if (!isLoaded || router.isFallback) {
      return;
    }

    const handleAttachStops = async () => {
      const { createJSXMarker, addLayerAndSource } = await import(
        '@/services/mapbox'
      );

      if (mapContextRef.current.markers.length > 0) {
        for (const marker of mapContextRef.current.markers) {
          marker.remove();
        }
      }

      mapContextRef.current.markers = selectedBusRoute.Stops.map((stop) =>
        createJSXMarker(
          <VStack
            spacing={0}
            cursor="pointer"
            onClick={async () => {
              const { getPosition } = await import('@/services/mapbox');
              mapContextRef.current.map.flyTo(
                getPosition(
                  stop.StopPosition.PositionLat,
                  stop.StopPosition.PositionLon,
                  ZoomLevel.Stops,
                ),
              );
            }}
          >
            <Circle
              borderWidth="1px"
              size="28px"
              borderColor="var(--chakra-colors-secondary-200)"
              bgColor="var(--chakra-colors-secondary-100)"
              color="var(--chakra-colors-secondary-800)"
            >
              {getTwoDigitString(stop.StopSequence)}
            </Circle>
            <Box
              h="12px"
              borderLeftWidth="2px"
              borderColor="var(--chakra-colors-secondary-200)"
            />
          </VStack>,
          [stop.StopPosition.PositionLon, stop.StopPosition.PositionLat],
          { offset: [0, -12] },
        ),
      );

      if (mapContextRef.current.map.getLayer(mapContextRef.current.layerId)) {
        mapContextRef.current.map.removeLayer(mapContextRef.current.layerId);
      }

      if (mapContextRef.current.map.getSource(mapContextRef.current.layerId)) {
        mapContextRef.current.map.removeSource(mapContextRef.current.layerId);
      }

      mapContextRef.current.layerId = addLayerAndSource(
        mapContextRef.current.map,
        route.RouteUID,
        geoJson,
        theme.colors.primary[200],
      );
    };

    handleAttachStops();
  }, [
    route?.RouteUID,
    geoJson,
    isLoaded,
    mapContextRef,
    router.isFallback,
    theme.colors.primary,
    selectedBusRoute?.Stops,
  ]);

  useEffect(() => {
    if (router.isFallback || !isLoaded || !mapContextRef.current.map) {
      return;
    }

    const { map } = mapContextRef.current;

    const handleZoom = () => {
      for (const marker of mapContextRef.current.markers) {
        marker.remove();
      }

      if (map.getZoom() >= ZoomLevel.Marker) {
        for (const marker of mapContextRef.current.markers) {
          marker.addTo(map);
        }
      }
    };

    map.on('zoomend', handleZoom);
    // eslint-disable-next-line consistent-return
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [isLoaded, mapContextRef, router.isFallback]);

  if (router.isFallback) {
    return null;
  }

  return (
    <>
      <NextHeadSeo title={`Iro Bus | ${routeName}-${CityMap[city]}`} />
      <Flex pos="relative" flexDir="column" h="full" color="white">
        <Flex p={4} bg="primary.800" justify="space-between" align="center">
          <IconButton
            display={MOBILE_DISPLAY}
            aria-label="back to previous page"
            variant="ghost"
            fontSize="4xl"
            onClick={onArrowClick}
            icon={<BiChevronLeft />}
          />
          <NavBarItems display={DESKTOP_DISPLAY} />
          <Stack
            direction={['row', 'column-reverse']}
            pos={['static', 'fixed']}
            spacing={[1, 4]}
            zIndex="overlay"
            right={[0, 4]}
            bottom={[0, '72px']}
          >
            <IconButton
              aria-label="show more detail"
              variant={buttonVariant}
              fontSize="2xl"
              rounded="full"
              icon={<BsInfoCircle />}
              onClick={onOpen}
            />
            <IconButton
              aria-label="move back to home"
              variant={buttonVariant}
              fontSize="2xl"
              rounded="full"
              icon={<IoHome />}
              onClick={onHomeClick}
            />
          </Stack>
        </Flex>
        <Flex flexDir={['column', 'row-reverse']} flexGrow={1}>
          <Box flexGrow={1} overflowY="auto" />
          <Tabs
            w={['auto', DESKTOP_MAP_LEFT]}
            index={selectedDirection}
            onChange={onSwitchTab}
            zIndex="sticky"
            {...tabsProps}
          >
            <TabList
              sx={{
                pos: 'relative',
                p: 4,
                bg: 'primary.600',
                button: {
                  whiteSpace: 'noWrap',
                },
              }}
            >
              <IconButton
                display={MOBILE_DISPLAY}
                pos="absolute"
                top="0"
                left="30%"
                w="40%"
                aria-label="extend to top"
                h="4px"
                onClick={extendDisclosure.onToggle}
              />
              <Heading
                display={MOBILE_DISPLAY}
                as="h1"
                alignSelf="center"
                noOfLines={1}
              >
                {route.RouteName.Zh_tw}
              </Heading>
              <Box display={MOBILE_DISPLAY} flexGrow={1} />
              {directions.length > 1 ? (
                <>
                  <Tab>{route.DestinationStopNameZh}</Tab>
                  <Tab>{route.DepartureStopNameZh}</Tab>
                </>
              ) : (
                <Tab>
                  {routeStopEntity[directions[0]].Stops[0].StopName.Zh_tw}
                </Tab>
              )}
            </TabList>
            <TabPanels
              bg="secondary.900"
              maxW={DESKTOP_MAP_LEFT}
              h={[
                extendDisclosure.isOpen ? STOP_LIST_MAX_HEIGHT : 128,
                STOP_LIST_MAX_HEIGHT,
              ]}
              transition="ease-in-out"
              transitionDuration="0.35s"
              overflowX="hidden"
            >
              {directions.map((busDirection) => (
                <TabPanel key={busDirection} p="0">
                  {routeStopEntity[busDirection].Stops.map((stop) => {
                    const status = getBusEstimationStatus(
                      data?.entities[stop.StopUID],
                    );

                    const isComing = status === '進站中';
                    return (
                      <Flex
                        key={`${busDirection}-${stop.StopUID}-${stop.StopSequence}`}
                        align="center"
                        px="4"
                        cursor="pointer"
                        onClick={async () => {
                          if (!mapContextRef.current.map || !isLoaded) {
                            return;
                          }

                          const { getPosition } = await import(
                            '@/services/mapbox'
                          );

                          setSelectedStopId(stop.StopUID);
                          stopDisclosure.onOpen();
                          extendDisclosure.onClose();
                          mapContextRef.current.map.flyTo(
                            getPosition(
                              stop.StopPosition.PositionLat,
                              stop.StopPosition.PositionLon,
                              ZoomLevel.Stop,
                            ),
                          );
                        }}
                      >
                        <Text>{stop.StopName.Zh_tw}</Text>
                        <Tag colorScheme="secondary" ml="2">
                          {status}
                        </Tag>
                        <Box flexGrow={1} />
                        <VStack spacing={0}>
                          <Box
                            h="20px"
                            borderLeft="2px"
                            borderColor="primary.200"
                          />
                          <Circle
                            size="20px"
                            fontSize="9px"
                            fontWeight="bold"
                            borderWidth="2px"
                            borderColor="primary.200"
                            bg={isComing ? 'primary.200' : 'transparent'}
                            color={isComing ? 'secondary.700' : 'white'}
                            boxShadow={
                              isComing
                                ? '0 0 5px var(--chakra-colors-secondary-200),0 0 10px var(--chakra-colors-secondary-300),0 0 15px var(--chakra-colors-secondary-400)'
                                : 'none'
                            }
                            rounded="full"
                          >
                            {getTwoDigitString(stop.StopSequence)}
                          </Circle>
                          <Box
                            h="20px"
                            borderLeft="2px"
                            borderColor="primary.200"
                          />
                        </VStack>
                      </Flex>
                    );
                  })}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <BusRouteInfoModal isOpen={isOpen} onClose={onClose} route={route} />
      {selectedBusEstimation && (
        <BusStopDrawer
          selectedStopId={selectedStopId}
          setSelectedStopId={setSelectedStopId}
          busRoute={route}
          busEstimation={selectedBusEstimation}
          selectedBusStop={selectedBusRoute}
          onClose={onDrawerClose}
          isOpen={stopDisclosure.isOpen}
        />
      )}
    </>
  );
};

export const getStaticPaths = (): GetStaticPathsResult => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<BusRoutePageProps>> => {
  const { routeName } = context.params;
  const city = context.params.city as City;

  if (
    typeof routeName !== 'string' ||
    typeof city !== 'string' ||
    !CitySet.has(city)
  )
    return {
      notFound: true,
    };

  const busRoutes = await busService.getBusRoutesByCityAndRouteName(
    city,
    routeName,
  );

  const busRoute = busRoutes[0];

  if (!busRoute)
    return {
      redirect: {
        destination: '/city',
        permanent: false,
      },
    };

  const [busShapes, busStops] = await Promise.all([
    busService.getBusShapesByCityAndRouteName(city, routeName),
    busService.getBusStopOfRoutesByCityAndRouteName(city, routeName, {
      filter: `RouteName/Zh_tw eq '${routeName}'`,
    }),
  ]);

  const busShape = busShapes[0];

  if (!busShape || busStops.length === 0)
    return {
      redirect: {
        destination: '/city',
        permanent: false,
      },
    };

  const directions: BusDirection[] = [];
  const routeStopEntity = {} as RouteStopEntity;

  for (const routeStop of busStops) {
    // TODO: might have routes that have multiple directions
    if (!directions.includes(routeStop.Direction)) {
      directions.push(routeStop.Direction);
      routeStopEntity[routeStop.Direction] = routeStop;
    }
  }

  return {
    props: {
      city,
      routeName,
      busRoute,
      geoJson: parse(busShape.Geometry) as GeoJSONLineString,
      directions,
      busStopEntity: routeStopEntity,
    },
    revalidate: ONE_DAY,
  };
};

BusRoutePage.layoutProps = {
  showMap: true,
};

export default BusRoutePage;
