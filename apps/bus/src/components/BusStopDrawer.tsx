import React, { Dispatch, SetStateAction } from 'react';

import {
  Box,
  Button,
  Drawer,
  HStack,
  IconButton,
  Portal,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  BusDirection,
  BusEstimation,
  BusRoute,
  BusStopOfRoute,
} from '@f2e/tdx';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import Image from './Image';

import background from '@/background-small.png';
import bus from '@/bus.png';
import { useMap } from '@/components/MapContextProvider';
import { getLastElement } from '@/utils/array';
import { getBusEstimationStatus } from '@/utils/bus';

interface BusStopDrawerProps
  extends Omit<Drawer.RootProps, 'children' | 'onOpenChange' | 'open'> {
  selectedStopId: string;
  busRoute: BusRoute;
  setSelectedStopId: Dispatch<SetStateAction<string>>;
  busEstimation: BusEstimation;
  selectedBusStop: BusStopOfRoute;
  isOpen: boolean;
  onClose: VoidFunction;
}

export enum ZoomLevel {
  Stop = 16,
  Stops = 15,
  Marker = 13.5,
  City = 12,
}

const BusStopDrawer = ({
  isOpen,
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
    <Drawer.Root
      open={isOpen}
      size="lg"
      placement="bottom"
      onOpenChange={({ open }) => {
        if (!open) {
          onClose();
        }
      }}
      {...props}
    >
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content minH="200px" textAlign="center">
            <Box
              pos="fixed"
              w="full"
              h="full"
              overflow="hidden"
              bgGradient="background"
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
            <Drawer.Header pb="0" zIndex="docked">
              <Drawer.Title lineClamp={1}>
                {busEstimation.StopName.Zh_tw}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.CloseTrigger asChild>
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
              >
                <MdClose />
              </IconButton>
            </Drawer.CloseTrigger>
            <Drawer.Body display="flex" flexDir="column" pt="0" zIndex="docked">
              <Text lineClamp={1} color="primary.200">
                往
                {busEstimation.Direction === BusDirection.去程
                  ? route.DestinationStopNameZh
                  : route.DepartureStopNameZh}
              </Text>
              <HStack mx="auto" my="2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={
                    selectedBusStop.Stops[0].StopUID === selectedStopId
                  }
                  onClick={onPreviousStopClick}
                >
                  <BiChevronLeft />
                  上一站
                </Button>
                <Tag.Root colorPalette="secondary" ml="2">
                  <Tag.Label>
                    {getBusEstimationStatus(busEstimation)}
                  </Tag.Label>
                </Tag.Root>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={
                    getLastElement(selectedBusStop.Stops).StopUID ===
                    selectedStopId
                  }
                  onClick={onNextStopClick}
                >
                  下一站
                  <BiChevronRight />
                </Button>
              </HStack>
              <Box pos="absolute" bottom="1" left="0" right="0">
                <Image
                  src={bus}
                  alt="bus"
                  placeholder="blur"
                  width={200}
                  height={60}
                  objectFit="contain"
                />
              </Box>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default BusStopDrawer;
