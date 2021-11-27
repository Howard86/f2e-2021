import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import {
  BusDirection,
  BusRouteDetail,
  BusStopStatus,
  CITIES,
  CitySlug,
  CitySlugMap,
  getBusRouteDetailByCityAndRouteName,
  getBusRouteShapeByCityAndRouteName,
  getRouteStopsByCityAndRouteName,
  RouteStop,
} from '@f2e/ptx';
import type { EntityId } from '@reduxjs/toolkit';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { IoHome } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { GeoJSONLineString, parse } from 'wellknown';

import background from '@/background-small.png';
import bus from '@/bus.png';
import ExternalLink from '@/components/ExternalLink';
import Image from '@/components/Image';
import { useMap } from '@/components/MapContextProvider';
import {
  busEstimationSelector,
  useGetBusEstimationQuery,
} from '@/services/local';
import { getMiddleElement } from '@/utils/array';
import { getTwoDigitString } from '@/utils/string';

type Nullable<T> = T | null;

interface BusRoutePageProps {
  citySlug: CitySlug;
  routeName: string;
  geoJson: GeoJSONLineString;
  route: BusRouteDetail;
  forward: Nullable<RouteStop>;
  backward: Nullable<RouteStop>;
}

enum ZoomLevel {
  Stop = 16,
  Stops = 15,
  Marker = 13.5,
  City = 12,
}

const INITIAL_ID = '';

const BusRoutePage = ({
  citySlug,
  routeName,
  route,
  forward,
  backward,
  geoJson,
}: BusRoutePageProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [selectedDirection, setSelectedDirection] = useState<BusDirection>(
    BusDirection.去程,
  );
  const [selectedStopId, setSelectedStopId] = useState<EntityId>(INITIAL_ID);
  const { divRef, mapContextRef, isLoaded, setLoaded } = useMap();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const stopDisclosure = useDisclosure();
  const { data, selectedStop } = useGetBusEstimationQuery(
    { city: citySlug, route: routeName },
    {
      skip: router.isFallback,
      selectFromResult: (res) => ({
        ...res,
        selectedStop:
          res.data &&
          busEstimationSelector.selectById(res.data, selectedStopId),
      }),
    },
  );

  const onSwitchTab = (index: number) => {
    setSelectedDirection(index);
  };

  const onArrowClick = () => {
    router.back();
  };

  const onHomeClick = () => {
    router.push('/');
  };

  const onNextStopClick = async () => {
    let nextStop =
      selectedDirection === BusDirection.去程
        ? forward.Stops[
            forward.Stops.findIndex((stop) => stop.StopUID === selectedStopId) +
              1
          ]
        : backward.Stops[
            backward.Stops.findIndex(
              (stop) => stop.StopUID === selectedStopId,
            ) + 1
          ];

    // could reach the end of the index
    if (!nextStop && selectedDirection === BusDirection.去程) {
      [nextStop] = backward.Stops;

      setSelectedDirection(BusDirection.返程);
    }

    setSelectedStopId(nextStop.StopUID);

    const { getPosition } = await import('@/services/mapbox');
    mapContextRef.current.map.flyTo(
      getPosition(
        nextStop.StopPosition.PositionLat,
        nextStop.StopPosition.PositionLon,
        ZoomLevel.Stop,
      ),
    );
  };

  const onPreviousStopClick = async () => {
    let previousStop =
      selectedDirection === BusDirection.去程
        ? forward.Stops[
            forward.Stops.findIndex((stop) => stop.StopUID === selectedStopId) -
              1
          ]
        : backward.Stops[
            backward.Stops.findIndex(
              (stop) => stop.StopUID === selectedStopId,
            ) - 1
          ];

    // could reach the end of the index
    if (!previousStop && selectedDirection === BusDirection.返程) {
      previousStop = forward.Stops[forward.Stops.length - 1];
      setSelectedDirection(BusDirection.去程);
    }
    setSelectedStopId(previousStop.StopUID);

    const { getPosition } = await import('@/services/mapbox');
    mapContextRef.current.map.flyTo(
      getPosition(
        previousStop.StopPosition.PositionLat,
        previousStop.StopPosition.PositionLon,
        ZoomLevel.Stop,
      ),
    );
  };

  const renderRouteStops = (routeStop: RouteStop | undefined) =>
    routeStop?.Stops.map((stop) => {
      const busEstimation = data?.entities[stop.StopUID];

      return (
        <Flex
          key={stop.StopUID}
          align="center"
          justify="space-between"
          px="4"
          cursor="pointer"
          onClick={async () => {
            if (!mapContextRef.current.map) {
              return;
            }

            const { getPosition } = await import('@/services/mapbox');

            setSelectedStopId(stop.StopUID);
            stopDisclosure.onOpen();
            mapContextRef.current.map.flyTo(
              getPosition(
                stop.StopPosition.PositionLat,
                stop.StopPosition.PositionLon,
                ZoomLevel.Stop,
              ),
            );
          }}
        >
          <Text>
            {/* TODO: add stop status util to better support different scenario */}
            {busEstimation?.StopStatus === BusStopStatus.正常
              ? `${
                  busEstimation?.EstimateTime
                    ? `${Math.floor(busEstimation?.EstimateTime / 60)}分`
                    : '進站中'
                }`
              : '今日未營運'}{' '}
            {stop.StopName.Zh_tw}
          </Text>
          <VStack spacing={0}>
            <Box h="20px" borderLeft="2px" borderColor="primary.200" />
            <Circle
              size="20px"
              fontSize="9px"
              fontWeight="bold"
              borderWidth="2px"
              borderColor="primary.200"
              rounded="full"
            >
              {getTwoDigitString(stop.StopSequence)}
            </Circle>
            <Box h="20px" borderLeft="2px" borderColor="primary.200" />
          </VStack>
        </Flex>
      );
    });

  useEffect(() => {
    if (isLoaded || router.isFallback) {
      return;
    }

    const handleInitialise = async () => {
      const { initialize, getPosition } = await import('@/services/mapbox');

      const middleStop = getMiddleElement(forward.Stops);

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
    forward?.Stops,
    isLoaded,
    mapContextRef,
    router.isFallback,
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

      mapContextRef.current.markers = [...forward.Stops, ...backward.Stops].map(
        (stop) =>
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
    backward?.Stops,
    forward?.Stops,
    route?.RouteUID,
    geoJson,
    isLoaded,
    mapContextRef,
    router.isFallback,
    theme.colors.primary,
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
      <Flex pos="relative" flexDir="column" h="full" color="white">
        <Flex p="4" bg="primary.800" justify="space-between" align="center">
          <IconButton
            aria-label="back to previous page"
            variant="ghost"
            fontSize="4xl"
            onClick={onArrowClick}
            icon={<BiChevronLeft />}
          />
          <HStack spacing={1}>
            <IconButton
              aria-label="show more detail"
              variant="ghost"
              fontSize="2xl"
              rounded="full"
              icon={<BsInfoCircle />}
              onClick={onOpen}
            />
            <IconButton
              aria-label="move back to home"
              variant="ghost"
              fontSize="2xl"
              icon={<IoHome />}
              onClick={onHomeClick}
            />
          </HStack>
        </Flex>
        <Box flexGrow={1} overflowY="auto" />
        <Tabs
          index={selectedDirection}
          onChange={onSwitchTab}
          variant="solid-rounded"
          zIndex="sticky"
        >
          <TabList bg="primary.600" p="4">
            <Heading as="h1" alignSelf="center">
              {route.RouteName.Zh_tw}
            </Heading>
            <Box flexGrow={1} />
            <Tab>{route.DepartureStopNameZh}</Tab>
            <Tab ml="2">{route.DestinationStopNameZh}</Tab>
          </TabList>
          <TabPanels bg="primary.800" h="128" overflowY="auto">
            <TabPanel p="0">{renderRouteStops(forward)}</TabPanel>
            <TabPanel p="0">{renderRouteStops(backward)}</TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        motionPreset="slideInRight"
        colorScheme="primary"
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" bg="primary.400">
            {route.RouteName.Zh_tw}
          </ModalHeader>
          <IconButton
            pos="absolute"
            right="4"
            top="5"
            rounded="full"
            size="xs"
            color="primary.600"
            bgColor="primary.50"
            aria-label="close modal"
            fontSize="xl"
            icon={<MdClose />}
            onClick={onClose}
          />
          <ModalBody textAlign="center" p="0" bg="gradient.bg">
            <Heading p="4" fontSize="lg">
              Start:{route.DepartureStopNameZh}-{route.DestinationStopNameZh}
            </Heading>
            <Tabs isFitted>
              <TabList>
                {route.SubRoutes.map((subRoute) => (
                  <Tab key={subRoute.SubRouteUID}>
                    {subRoute.SubRouteName.Zh_tw.replace(
                      route.RouteName.Zh_tw,
                      '',
                    )}
                    {subRoute.Direction}
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {route.SubRoutes.map((subRoute) => (
                  <TabPanel key={subRoute.SubRouteUID}>
                    <Text>
                      {subRoute.FirstBusTime}-{subRoute.LastBusTime}
                    </Text>
                    <Text>
                      {subRoute.HolidayFirstBusTime}-
                      {subRoute.HolidayLastBusTime}
                    </Text>
                  </TabPanel>
                ))}
              </TabPanels>
              <Text>{route.TicketPriceDescriptionZh}</Text>
              <Text>{route.FareBufferZoneDescriptionZh}</Text>
              {route.Operators.map((operator) => (
                <Text key={operator.OperatorID}>
                  {/* TODO: add operator details */}
                  {operator.OperatorName.Zh_tw}
                </Text>
              ))}
              <ExternalLink href={route.RouteMapImageUrl}>
                More Info
              </ExternalLink>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
      {selectedStop && (
        <Drawer
          isOpen={stopDisclosure.isOpen}
          onClose={stopDisclosure.onClose}
          size="lg"
          closeOnOverlayClick={false}
          placement="bottom"
        >
          <DrawerContent minH="200px" textAlign="center">
            <Box
              pos="fixed"
              w="full"
              h="full"
              overflow="hidden"
              bg="gradient.bg"
              zIndex="1"
            >
              <Image
                alt="background"
                src={background}
                placeholder="blur"
                height={200}
                objectFit="cover"
              />
            </Box>
            <DrawerHeader pb="0" zIndex="docked" noOfLines={1}>
              {selectedStop.StopName.Zh_tw}
            </DrawerHeader>
            <DrawerCloseButton zIndex="docked" />
            <DrawerBody display="flex" flexDir="column" pt="0" zIndex="docked">
              <Text noOfLines={1} color="primary.200">
                往
                {selectedStop.Direction === BusDirection.去程
                  ? route.DestinationStopNameZh
                  : route.DepartureStopNameZh}
              </Text>
              <HStack mx="auto" my="2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<BiChevronLeft />}
                  isDisabled={forward.Stops[0].StopUID === selectedStopId}
                  onClick={onPreviousStopClick}
                >
                  上一站
                </Button>
                <Text minW="40px">
                  {/* TODO: add stop status util to better support different scenario */}
                  {selectedStop?.StopStatus === BusStopStatus.正常
                    ? `${
                        selectedStop?.EstimateTime
                          ? `${Math.floor(selectedStop?.EstimateTime / 60)}分`
                          : '進站中'
                      }`
                    : '今日未營運'}{' '}
                </Text>
                <Button
                  variant="ghost"
                  rightIcon={<BiChevronRight />}
                  size="sm"
                  isDisabled={
                    backward.Stops[backward.Stops.length - 1].StopUID ===
                    selectedStopId
                  }
                  onClick={onNextStopClick}
                >
                  下一站
                </Button>
              </HStack>
              <Box>
                <Image
                  src={bus}
                  placeholder="blur"
                  width={150}
                  objectFit="contain"
                />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
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
  const citySlug = context.params.citySlug as CitySlug;

  if (
    typeof routeName !== 'string' ||
    typeof citySlug !== 'string' ||
    !CITIES.includes(CitySlugMap[citySlug])
  ) {
    return {
      notFound: true,
    };
  }

  const route = await getBusRouteDetailByCityAndRouteName(
    routeName,
    CitySlugMap[citySlug],
  );

  if (!route) {
    return {
      redirect: {
        destination: `/city/${citySlug}`,
        permanent: false,
      },
    };
  }

  const routeShape = await getBusRouteShapeByCityAndRouteName(
    routeName,
    CitySlugMap[citySlug],
  );

  if (!routeShape) {
    return {
      redirect: {
        destination: `/city/${citySlug}`,
        permanent: false,
      },
    };
  }

  const routeStops = await getRouteStopsByCityAndRouteName(
    routeName,
    CitySlugMap[citySlug],
  );

  return {
    props: {
      citySlug,
      routeName,
      route,
      geoJson: parse(routeShape.Geometry) as GeoJSONLineString,
      forward:
        routeStops.find(
          (routeStop) => routeStop.Direction === BusDirection.去程,
        ) || null,
      backward:
        routeStops.find(
          (routeStop) => routeStop.Direction === BusDirection.返程,
        ) || null,
    },
  };
};

BusRoutePage.layoutProps = {
  showMap: true,
};

export default BusRoutePage;
