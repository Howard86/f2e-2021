import React, { Dispatch, SetStateAction } from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerProps,
  HStack,
  IconButton,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  BusDirection,
  BusEstimation,
  BusRoute,
  BusStopOfRoute,
} from '@f2e/tdx';
import { EntityId } from '@reduxjs/toolkit';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import Image from './Image';

import background from '@/background-small.png';
import bus from '@/bus.png';
import { useMap } from '@/components/MapContextProvider';
import { getLastElement } from '@/utils/array';
import { getBusEstimationStatus } from '@/utils/bus';

interface BusStopDrawerProps extends Omit<DrawerProps, 'children'> {
  selectedStopId: EntityId;
  busRoute: BusRoute;
  setSelectedStopId: Dispatch<SetStateAction<EntityId>>;
  busEstimation: BusEstimation;
  selectedBusStop: BusStopOfRoute;
}

export enum ZoomLevel {
  Stop = 16,
  Stops = 15,
  Marker = 13.5,
  City = 12,
}

const BusStopDrawer = ({
  onClose,
  busRoute: route,
  selectedStopId,
  setSelectedStopId,
  busEstimation,
  selectedBusStop,
  ...props
}: BusStopDrawerProps) => {
  const { mapContextRef } = useMap();
  const handleRouteStopClick = async (step: 1 | -1) => {
    const currentStops = selectedBusStop.Stops;

    const previousStop =
      currentStops[
        currentStops.findIndex((stop) => stop.StopUID === selectedStopId) + step
      ];

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

  const onPreviousStopClick = async () => {
    await handleRouteStopClick(-1);
  };

  const onNextStopClick = async () => {
    await handleRouteStopClick(1);
  };

  return (
    <Drawer onClose={onClose} size="lg" placement="bottom" {...props}>
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
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        </Box>
        <DrawerHeader pb="0" zIndex="docked" noOfLines={1}>
          {busEstimation.StopName.Zh_tw}
        </DrawerHeader>
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
          zIndex="docked"
          icon={<MdClose />}
          onClick={onClose}
        />
        <DrawerBody display="flex" flexDir="column" pt="0" zIndex="docked">
          <Text noOfLines={1} color="primary.200">
            往
            {busEstimation.Direction === BusDirection.去程
              ? route.DestinationStopNameZh
              : route.DepartureStopNameZh}
          </Text>
          <HStack mx="auto" my="2">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<BiChevronLeft />}
              isDisabled={selectedBusStop.Stops[0].StopUID === selectedStopId}
              onClick={onPreviousStopClick}
            >
              上一站
            </Button>
            <Tag colorScheme="secondary" ml="2">
              {getBusEstimationStatus(busEstimation)}
            </Tag>
            <Button
              variant="ghost"
              rightIcon={<BiChevronRight />}
              size="sm"
              isDisabled={
                getLastElement(selectedBusStop.Stops).StopUID === selectedStopId
              }
              onClick={onNextStopClick}
            >
              下一站
            </Button>
          </HStack>
          <Box pos="absolute" bottom="1" left="0" right="0">
            <Image
              src={bus}
              placeholder="blur"
              width={200}
              height={60}
              objectFit="contain"
            />
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default BusStopDrawer;
