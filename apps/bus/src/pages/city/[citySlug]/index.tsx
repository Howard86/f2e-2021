import React, { ChangeEvent, useMemo, useState } from 'react';

import {
  Box,
  Center,
  Circle,
  Flex,
  Heading,
  IconButton,
  keyframes,
  LinkBox,
  LinkOverlay,
  Square,
  Text,
} from '@chakra-ui/react';
import {
  BusRouteInfo,
  CITIES,
  CitySlug,
  CitySlugMap,
  getBusRoutesByCity,
} from '@f2e/ptx';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
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
import { ONE_DAY } from '@/constants/time';
import station from '@/station.png';
import { getBusRouteDestinations } from '@/utils/bus';
import { addToLocalStorage } from '@/utils/local-storage';

interface BusPageProps {
  citySlug: CitySlug;
  busRoutes: BusRouteInfo[];
}

const DEFAULT_SEARCH_STRING = '';

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

const BusPage = ({ citySlug, busRoutes }: BusPageProps) => {
  const [searchString, setSearchString] = useState(DEFAULT_SEARCH_STRING);
  const router = useRouter();

  const hasNotSearched = searchString === DEFAULT_SEARCH_STRING;

  const searchResults = useMemo(() => {
    if (hasNotSearched) {
      return [];
    }

    // when router fallback
    return busRoutes?.filter((busRoute) =>
      busRoute.RouteName.Zh_tw.includes(searchString),
    );
  }, [busRoutes, hasNotSearched, searchString]);

  // TODO: add lodash.debounce
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const onSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    addToLocalStorage(CITY_STORAGE_KEY, event.target.value);
    router.push(`/city/${event.target.value}/bus`);
  };

  const onArrowClick = () => {
    router.back();
  };

  // TODO: add animation
  const renderContent = () => {
    if (hasNotSearched) {
      return (
        <Center h="full" flexDir="column" bg="primary.500">
          <Image alt="請輸入公車路線編號" src={station} placeholder="blur" />
          <Heading mt="4" fontSize="lg">
            請輸入公車路線編號
          </Heading>
        </Center>
      );
    }

    if (searchResults.length === 0) {
      return (
        <Center h="full" flexDir="column" bg="primary.500">
          <Image alt="查無公車" src={bus} placeholder="blur" />
          <Heading mt="4" fontSize="lg">
            Ooops, 查無公車
          </Heading>
        </Center>
      );
    }

    return searchResults.map((busRoute) => (
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
            href={`/city/${citySlug}/${busRoute.RouteName.Zh_tw}`}
          >
            {busRoute.RouteName.Zh_tw}
          </RouteLink>
        </Heading>
        <Text>{getBusRouteDestinations(busRoute)}</Text>
      </LinkBox>
    ));
  };

  return (
    <>
      <NextHeadSeo title={`Iro Bus | ${CitySlugMap[citySlug]}`} />
      <Flex pos="relative" flexDir="column" h="full" color="white">
        <Flex p="4" bg="primary.800" align="center" justify="space-between">
          <NavBarItems display={DESKTOP_DISPLAY} citySlug={citySlug} />
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
            citySlug={citySlug}
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
                citySlug={citySlug}
                onSelectCity={onSelectCity}
                searchString={searchString}
                onSearch={onSearch}
              />
            </Flex>
            <Box flexGrow={1} overflowY="auto">
              {renderContent()}
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
                <Square
                  w="120px"
                  bg="secondary.800"
                  p="4"
                  mx="auto"
                  fontWeight="bold"
                  roundedTop="2xl"
                  zIndex="docked"
                  border="2px"
                  borderColor="secondary.400"
                >
                  快速搜尋
                </Square>
              </Box>
              <RouteKeyBoard setSearchString={setSearchString} />
            </Box>
            <Box flexGrow={1} />
            <Box pos="relative" ml="16" p="8" display={DESKTOP_DISPLAY}>
              <Image src={bus} animation={`${busAnimation} 3s ease infinite`} />
              <Circle
                pos="absolute"
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

export const getStaticPaths = (): GetStaticPathsResult => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<BusPageProps>> => {
  const citySlug = context.params.citySlug as CitySlug;

  if (typeof citySlug !== 'string' || !CITIES.includes(CitySlugMap[citySlug])) {
    return {
      notFound: true,
    };
  }

  const busRoutes = await getBusRoutesByCity(CitySlugMap[citySlug], 1000);

  return {
    props: {
      citySlug,
      busRoutes,
    },
    revalidate: ONE_DAY,
  };
};

export default BusPage;
