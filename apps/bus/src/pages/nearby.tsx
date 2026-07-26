import React from 'react';

import {
  Accordion,
  Box,
  Button,
  Center,
  Circle,
  Flex,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react';
import { CityMap } from '@f2e/tdx';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import { IoHome } from 'react-icons/io5';

import { ZoomLevel } from '@/components/BusStopDrawer';
import { DESKTOP_MAP_LEFT, MOBILE_MAP_BOTTOM } from '@/components/Layout';
import { useMap } from '@/components/MapContextProvider';
import NavBarItems from '@/components/NavBarItems';
import RouteLink from '@/components/RouteLink';
import { DESKTOP_DISPLAY } from '@/constants/style';
import useAppToast from '@/hooks/use-app-toast';
import useGetLocation from '@/hooks/use-get-location';
import { useGetNearByBusMutation } from '@/services/local';

const NearByPage = () => {
  const toast = useAppToast();
  const { currentPositionRef, onLocate } = useGetLocation();
  const router = useRouter();
  const buttonVariant = useBreakpointValue<IconButtonProps['variant']>({
    base: 'ghost',
    md: 'solid',
  });
  const { divRef, mapContextRef, isLoaded, setLoaded } = useMap();
  const [getBusStations, { isSuccess, data }] = useGetNearByBusMutation();

  const onHomeClick = () => {
    router.push('/');
  };

  const onSearch = async () => {
    await onLocate();

    if (currentPositionRef === null) {
      return;
    }

    if (!isLoaded) {
      const { initialize } = await import('@/services/mapbox');
      mapContextRef.current.map = initialize(divRef.current, {
        center: [
          currentPositionRef.current.lng,
          currentPositionRef.current.lat,
        ],
        zoom: ZoomLevel.Stops,
      });

      await mapContextRef.current.map.once('load');

      setLoaded();
    }

    try {
      const response = await getBusStations(
        currentPositionRef.current,
      ).unwrap();

      toast({ description: `共查詢到${response.data.length}站` });
    } catch (error) {
      toast({ description: '搜尋失敗', status: 'error' });
    }
  };

  if (router.isFallback) {
    return null;
  }

  return (
    <>
      <NextHeadSeo title="Iro Bus | 附近站牌" />
      <Flex pos="relative" flexDir="column" h="full" color="white">
        <Flex p={4} bg="primary.800" justify="space-between" align="center">
          <NavBarItems display={DESKTOP_DISPLAY} />
          <IconButton
            pos={['static', 'fixed']}
            right={[0, 4]}
            bottom={[0, 106]}
            aria-label="move back to home"
            variant={buttonVariant}
            fontSize="2xl"
            rounded="full"
            onClick={onHomeClick}
            zIndex="overlay"
          >
            <IoHome />
          </IconButton>
        </Flex>
        <Flex flexDir={['column', 'row-reverse']} flexGrow={1} overflowY="auto">
          <Center flexGrow={1}>
            <Button
              display={isSuccess ? 'none' : 'block'}
              variant="outline"
              onClick={onSearch}
              zIndex="overlay"
            >
              搜尋
            </Button>
          </Center>
          <Accordion.Root
            w={['auto', DESKTOP_MAP_LEFT]}
            overflowY="auto"
            bgGradient="background"
            collapsible
            maxW={DESKTOP_MAP_LEFT}
            h={[MOBILE_MAP_BOTTOM, 'auto']}
          >
            {data?.data.map((busStation) => (
              <Accordion.Item
                key={busStation.StationUID}
                value={busStation.StationUID}
              >
                <Accordion.ItemTrigger
                  onFocus={async () => {
                    const { createJSXMarker } = await import(
                      '@/services/mapbox'
                    );
                    const marker = createJSXMarker(
                      <Circle
                        size="12px"
                        bgColor="var(--chakra-colors-secondary-200)"
                      />,
                      [
                        busStation.StationPosition.PositionLon,
                        busStation.StationPosition.PositionLat,
                      ],
                    );

                    marker.addTo(mapContextRef.current.map);
                    mapContextRef.current.markers.push(marker);
                  }}
                >
                  <Box flex="1" textAlign="left">
                    {busStation.StationName.Zh_tw}
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody pb={4}>
                    <Wrap>
                      {busStation.Stops.map((stop) => (
                        <Button
                          key={`${busStation.StationUID}-${stop.StopUID}-${stop.RouteUID}`}
                          variant="outline"
                          asChild
                        >
                          <RouteLink
                            href={`/city/${
                              CityMap[busStation.LocationCityCode]
                            }/${stop.RouteName.Zh_tw}`}
                          >
                            {stop.RouteName.Zh_tw}
                          </RouteLink>
                        </Button>
                      ))}
                    </Wrap>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Flex>
      </Flex>
    </>
  );
};

NearByPage.layoutProps = {
  showMap: true,
  hideLocate: true,
};

export default NearByPage;
