import React from 'react';

import {
  Box,
  Circle,
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
  VStack,
} from '@chakra-ui/react';
import {
  BusDirection,
  BusRouteDetail,
  CITIES,
  CitySlug,
  CitySlugMap,
  getBusRouteDetailByCityAndRouteName,
  getRouteStopsByCityAndRouteName,
  RouteStop,
} from '@f2e/ptx';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import { BiChevronLeft } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { IoHome } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

import ExternalLink from '@/components/ExternalLink';

type Nullable<T> = T | null;

interface BusRoutePageProps {
  route: BusRouteDetail;
  forward: Nullable<RouteStop>;
  backward: Nullable<RouteStop>;
}

const BusRoutePage = ({ route, forward, backward }: BusRoutePageProps) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // debugger;
  const onArrowClick = () => {
    router.back();
  };

  const onHomeClick = () => {
    router.push('/');
  };

  const renderRouteStops = (routeStop: RouteStop | undefined) =>
    routeStop?.Stops.map((stop, index) => (
      <Flex key={stop.StopUID} align="center" justify="space-between" px="4">
        <Text>{stop.StopName.Zh_tw}</Text>
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
            {index + 1}
          </Circle>
          <Box h="20px" borderLeft="2px" borderColor="primary.200" />
        </VStack>
      </Flex>
    ));

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
        <Tabs variant="solid-rounded" zIndex="sticky">
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

  const routeStops = await getRouteStopsByCityAndRouteName(
    routeName,
    CitySlugMap[citySlug],
  );

  return {
    props: {
      route,
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
