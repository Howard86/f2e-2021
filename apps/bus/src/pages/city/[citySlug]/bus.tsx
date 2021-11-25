import React, { ChangeEvent, useMemo, useState } from 'react';

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import {
  BusRoute,
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
import { BiChevronLeft } from 'react-icons/bi';

import bus from '@/bus.png';
import Image from '@/components/Image';
import RouteLink from '@/components/RouteLink';
import station from '@/station.png';

interface BusPageProps {
  citySlug: CitySlug;
  busRoutes: BusRoute[];
}

const DEFAULT_SEARCH_STRING = '';

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
      >
        <Heading fontSize="2xl" mb="4">
          <RouteLink
            as={LinkOverlay}
            href={`/city/${citySlug}/${
              busRoute.RouteName.En.toLowerCase() || busRoute.RouteName.Zh_tw
            }`}
          >
            {busRoute.RouteName.Zh_tw}
          </RouteLink>
        </Heading>
        <Text>
          {busRoute.DepartureStopNameZh}-{busRoute.DestinationStopNameZh}
        </Text>
      </LinkBox>
    ));
  };

  return (
    <Flex pos="relative" flexDir="column" h="full" color="white">
      <Flex p="4" bg="primary.800">
        <IconButton
          aria-label="back to previous page"
          variant="ghost"
          mr="4"
          fontSize="4xl"
          onClick={onArrowClick}
          icon={<BiChevronLeft />}
        />
        <Input
          value={searchString}
          onChange={onSearch}
          placeholder="請輸入公車路線編號"
        />
      </Flex>
      <Box flexGrow={1} overflowY="auto">
        {renderContent()}
      </Box>
      {/* TODO: add keyboard */}
      <Box flexShrink={0} bg="primary.800" h="200px" />
    </Flex>
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

  // TODO: add $select to use less fields
  const busRoutes = await getBusRoutesByCity(CitySlugMap[citySlug], 9999);

  return {
    props: {
      citySlug,
      busRoutes,
    },
  };
};

export default BusPage;
