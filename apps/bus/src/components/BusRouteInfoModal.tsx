import React from 'react';

import {
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { BusRouteDetail } from '@f2e/ptx';
import { MdClose } from 'react-icons/md';

import ExternalLink from './ExternalLink';

import { getBusRouteDestinations } from '@/utils/bus';

interface BusRouteInfoModalProps extends Omit<ModalProps, 'children'> {
  route: BusRouteDetail;
}

const BusRouteInfoModal = ({
  route,
  onClose,
  ...props
}: BusRouteInfoModalProps) => (
  <Modal
    size="full"
    motionPreset="slideInRight"
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
      <ModalBody textAlign="center" p="0" bg="gradient.bg">
        <Heading p="4" fontSize="lg">
          {getBusRouteDestinations(route)}
        </Heading>
        <Tabs isFitted>
          <TabList>
            {route.SubRoutes.map((subRoute) => (
              <Tab key={subRoute.SubRouteUID}>
                {subRoute.SubRouteName.Zh_tw.replace(route.RouteName.Zh_tw, '')}
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
                  {subRoute.HolidayFirstBusTime}-{subRoute.HolidayLastBusTime}
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
          <ExternalLink href={route.RouteMapImageUrl}>More Info</ExternalLink>
        </Tabs>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default BusRouteInfoModal;
