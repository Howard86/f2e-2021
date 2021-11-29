import React, { ChangeEvent, useState } from 'react';

import {
  Box,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import type { BusRouteDetailInfo } from '@f2e/ptx';
import { MdClose } from 'react-icons/md';

import ExternalLink from './ExternalLink';

import { getBusRouteDestinations, getSubRouteTime } from '@/utils/bus';

interface BusRouteInfoModalProps extends Omit<ModalProps, 'children'> {
  route: BusRouteDetailInfo;
}

const BusRouteInfoModal = ({
  route,
  onClose,
  ...props
}: BusRouteInfoModalProps) => {
  const size = useBreakpointValue({ base: 'full', md: 'md' });
  const motionPreset = useBreakpointValue<ModalProps['motionPreset']>({
    base: 'slideInRight',
    md: 'slideInBottom',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(Number.parseInt(event.target.value, 10));
  };

  return (
    <Modal
      size={size}
      motionPreset={motionPreset}
      colorScheme="primary"
      scrollBehavior="inside"
      isCentered
      onClose={onClose}
      {...props}
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
        <ModalBody
          display="flex"
          flexDir="column"
          textAlign="center"
          bg="gradient.bg"
          pb="8"
        >
          <Heading p="4" fontSize="lg">
            {getBusRouteDestinations(route)}
          </Heading>
          {route.HasSubRoutes && (
            <Select
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
            </Select>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BusRouteInfoModal;
