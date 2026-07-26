import React, { ChangeEvent, useState } from 'react';

import {
  Box,
  Dialog,
  Heading,
  IconButton,
  NativeSelect,
  Portal,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { BusRoute } from '@f2e/tdx';
import { MdClose } from 'react-icons/md';

import ExternalLink from './ExternalLink';

import { getBusRouteDestinations, getSubRouteTime } from '@/utils/bus';

interface BusRouteInfoModalProps
  extends Omit<Dialog.RootProps, 'children' | 'onOpenChange' | 'open'> {
  route: BusRoute;
  isOpen: boolean;
  onClose: VoidFunction;
}

const BusRouteInfoModal = ({
  route,
  isOpen,
  onClose,
  ...props
}: BusRouteInfoModalProps) => {
  const size = useBreakpointValue<Dialog.RootProps['size']>({
    base: 'full',
    md: 'md',
  });
  const motionPreset = useBreakpointValue<Dialog.RootProps['motionPreset']>({
    base: 'slide-in-right',
    md: 'slide-in-bottom',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(Number.parseInt(event.target.value, 10));
  };

  return (
    <Dialog.Root
      open={isOpen}
      size={size}
      motionPreset={motionPreset}
      placement="center"
      scrollBehavior="inside"
      onOpenChange={({ open }) => {
        if (!open) {
          onClose();
        }
      }}
      {...props}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header textAlign="center" bg="primary.400">
              <Dialog.Title>{route.RouteName.Zh_tw}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
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
              >
                <MdClose />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Body
              display="flex"
              flexDir="column"
              textAlign="center"
              bgGradient="background"
              pb="8"
            >
              <Heading p="4" fontSize="lg">
                {getBusRouteDestinations(route)}
              </Heading>
              {route.HasSubRoutes && (
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={selectedIndex}
                    onChange={onSelect}
                    textAlign="center"
                  >
                    {route.SubRoutes.map((subRoute, index) => (
                      <option key={subRoute.SubRouteUID} value={index}>
                        {subRoute.Headsign ||
                          subRoute.SubRouteName.Zh_tw.replace(
                            route.RouteName.Zh_tw,
                            '',
                          )}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              )}
              {route.HasSubRoutes && (
                <>
                  <Text fontSize="2xl" my="4">
                    運行時間
                  </Text>
                  <Text>
                    平日：
                    {getSubRouteTime(
                      route.SubRoutes[selectedIndex].FirstBusTime,
                      route.SubRoutes[selectedIndex].LastBusTime,
                    )}
                  </Text>
                  <Text>
                    假日：
                    {getSubRouteTime(
                      route.SubRoutes[selectedIndex].HolidayFirstBusTime,
                      route.SubRoutes[selectedIndex].HolidayLastBusTime,
                    )}
                  </Text>
                </>
              )}

              <Box flexGrow={1} />
              <Text>{route.TicketPriceDescriptionZh}</Text>
              <Text>{route.FareBufferZoneDescriptionZh}</Text>
              <VStack my="2">
                {route.Operators.map((operator) => (
                  <Text key={operator.OperatorID}>
                    {/* TODO: add operator details */}
                    {operator.OperatorName.Zh_tw}
                  </Text>
                ))}
              </VStack>
              <ExternalLink
                color="secondary.200"
                fontWeight="bold"
                href={route.RouteMapImageUrl}
              >
                詳細站牌資訊
              </ExternalLink>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BusRouteInfoModal;
