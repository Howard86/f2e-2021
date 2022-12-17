import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  keyframes,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { City, CityMap, CitySet } from '@f2e/tdx';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import { BiChevronLeft } from 'react-icons/bi';

import bus from '@/bus.png';
import BusSearchInput from '@/components/BusSearchInput';
import Image from '@/components/Image';
import NavBarItems from '@/components/NavBarItems';
import RouteKeyBoard from '@/components/RouteKeyBoard';
import RouteLink from '@/components/RouteLink';
import { DESKTOP_DISPLAY, MOBILE_DISPLAY } from '@/constants/style';
import { useLazyGetBusRoutesQuery } from '@/services/local';
import station from '@/station.png';
import { getBusRouteDestinations } from '@/utils/bus';
import { addToLocalStorage, getFromLocalStorage } from '@/utils/local-storage';

const busAnimation = keyframes`
  0% {
    top: 8px;
  }
  10% {
    top: 0;
  }
`;

const roadAnimation = keyframes`
  0% {
    left: 100%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    left: 0;
    opacity: 0;
  }
`;

export const CITY_STORAGE_KEY = 'selected-city';
const DEFAULT_SEARCH_STRING = '';
const DEFAULT_CITY = 'Taipei';
const DEBOUNCED_MS = 300;

const CityPage = () => {
  const [city, setCity] = useState<City>(() => {
    const cachedCity = getFromLocalStorage(CITY_STORAGE_KEY) as City;

    return CitySet.has(cachedCity) ? cachedCity : DEFAULT_CITY;
  });
  const [searchString, setSearchString] = useState(DEFAULT_SEARCH_STRING);
  const [fetchBusRoute, { data, isSuccess }] = useLazyGetBusRoutesQuery();
  const router = useRouter();

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const onSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    addToLocalStorage(CITY_STORAGE_KEY, event.target.value);
    setCity(event.target.value as City);
  };

  const onArrowClick = () => {
    router.back();
  };

  useEffect(() => {
    const debouncedFetch = debounce((route?: string) => {
      if (route) {
        fetchBusRoute({ city, route });
      }
    }, DEBOUNCED_MS);

    debouncedFetch(searchString);
  }, [city, fetchBusRoute, searchString]);

  return (
    <>
      <NextHeadSeo title={`Iro Bus | ${CityMap[city]}`} />
      <Flex pos="relative" flexDir="column" h="full" color="white">
        <Flex p="4" bg="primary.800" align="center" justify="space-between">
          <NavBarItems display={DESKTOP_DISPLAY} />
          <IconButton
            display={MOBILE_DISPLAY}
            aria-label="back to previous page"
            variant="ghost"
            fontSize="4xl"
            onClick={onArrowClick}
            icon={<BiChevronLeft />}
          />
          <BusSearchInput
            display={MOBILE_DISPLAY}
            city={city}
            onSelectCity={onSelectCity}
            searchString={searchString}
            onSearch={onSearch}
          />
        </Flex>
        <Flex
          flexDir={['column', 'row-reverse']}
          flexGrow={1}
          overflowY="auto"
          maxW="100vw"
        >
          <Flex
            flexGrow={1}
            flexDir="column"
            mx={[0, 12]}
            mt={[0, 16]}
            mb={[0, 4]}
            rounded={['none', '3xl']}
            borderColor="secondary.900"
            borderWidth={[0, '12px']}
            overflowY="auto"
          >
            <Flex display={['none', 'flex']} p="4" bg="primary.700">
              <BusSearchInput
                city={city}
                onSelectCity={onSelectCity}
                searchString={searchString}
                onSearch={onSearch}
              />
            </Flex>
            <Box flexGrow={1} overflowY="auto">
              {/* eslint-disable-next-line no-nested-ternary */}
              {isSuccess ? (
                data && data.data.length > 0 ? (
                  data.data.map((busRoute) => (
                    <LinkBox
                      key={busRoute.RouteUID}
                      p="4"
                      m="4"
                      border="2px"
                      borderColor="primary.200"
                      rounded="2xl"
                      bgColor="whiteAlpha.100"
                      backdropFilter="blur(8px)"
                      _hover={{ borderColor: 'secondary.200' }}
                      _active={{ borderColor: 'secondary.200' }}
                    >
                      <Heading fontSize="2xl" mb="4">
                        <RouteLink
                          as={LinkOverlay}
                          href={`/city/${city}/${busRoute.RouteName.Zh_tw}`}
                        >
                          {busRoute.RouteName.Zh_tw}
                        </RouteLink>
                      </Heading>
                      <Text>{getBusRouteDestinations(busRoute)}</Text>
                    </LinkBox>
                  ))
                ) : (
                  // TODO: add animation
                  <Center h="full" flexDir="column" bg="primary.500">
                    <Image alt="查無公車" src={bus} placeholder="blur" />
                    <Heading mt="4" fontSize="lg">
                      Ooops, 查無公車
                    </Heading>
                  </Center>
                )
              ) : (
                <Center h="full" flexDir="column" bg="primary.500">
                  <Image
                    alt="請輸入公車路線編號"
                    src={station}
                    placeholder="blur"
                  />
                  <Heading mt="4" fontSize="lg">
                    請輸入公車路線編號
                  </Heading>
                </Center>
              )}
            </Box>
          </Flex>
          <Flex flexDir="column" flexShrink={0}>
            <Box flexGrow={4} />
            <Box
              pos="relative"
              mx={[0, 12]}
              p={[0, 4]}
              bg="primary.800"
              borderTopRadius="3xl"
              shadow="xl"
            >
              <Box
                display={DESKTOP_DISPLAY}
                pos="absolute"
                left="0"
                right="0"
                top="-12"
              >
                <Box
                  w="120px"
                  bg="secondary.800"
                  p="4"
                  mx="auto"
                  textAlign="center"
                  fontWeight="bold"
                  roundedTop="2xl"
                  zIndex="docked"
                  border="2px"
                  borderColor="secondary.400"
                >
                  快速搜尋
                </Box>
              </Box>
              <RouteKeyBoard setSearchString={setSearchString} />
            </Box>
            <Box flexGrow={1} />
            <Box pos="relative" ml="16" p="8" display={DESKTOP_DISPLAY}>
              <Image src={bus} animation={`${busAnimation} 3s ease infinite`} />
              <Box
                pos="absolute"
                rounded="2xl"
                h="1"
                w="20"
                bgGradient="linear(to-r, #172E5E 0, whiteAlpha.600 50%, #172E5E)"
                zIndex=""
                bottom="6"
                animation={`${roadAnimation} 6s ease-out infinite`}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CityPage;
