import React, { ChangeEvent, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Heading,
  IconButton,
  keyframes,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
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
import { FiDelete } from 'react-icons/fi';

import bus from '@/bus.png';
import BusSearchInput from '@/components/BusSearchInput';
import Image from '@/components/Image';
import NavBarItems from '@/components/NavBarItems';
import RouteLink from '@/components/RouteLink';
import { DESKTOP_DISPLAY, MOBILE_DISPLAY } from '@/constants/style';
import background from '@/map.jpg';
import station from '@/station.png';

interface BusPageProps {
  citySlug: CitySlug;
  busRoutes: BusRoute[];
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

const BUTTON_TEXTS = [
  '紅',
  '藍',
  '1',
  '2',
  '3',
  '綠',
  '棕',
  '4',
  '5',
  '6',
  '黃',
  '小',
  '7',
  '8',
  '9',
  '幹線',
  '市民',
  '重設',
  '0',
] as const;

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

  const onClickArray = useMemo(
    () =>
      BUTTON_TEXTS.map((text) => {
        switch (text) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
          case '0':
            return () => setSearchString((existedText) => existedText + text);

          case '重設':
            return () => setSearchString(DEFAULT_SEARCH_STRING);

          default:
            return () => setSearchString(text);
        }
      }),
    [],
  );

  const onDeleteText = () => {
    setSearchString((existedText) =>
      existedText.slice(0, existedText.length - 1),
    );
  };

  // TODO: add lodash.debounce
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const onSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
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
        <Text>
          {busRoute.DepartureStopNameZh}-{busRoute.DestinationStopNameZh}
        </Text>
      </LinkBox>
    ));
  };

  return (
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
      <Flex flexGrow={1} overflowY="auto">
        <Flex flexDir="column" flexShrink={0}>
          <Flex
            flexGrow={1}
            flexDir="column"
            m={[0, 4]}
            rounded={['none', '3xl']}
            borderColor="primary.800"
            borderWidth={[0, '16px']}
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
            <SimpleGrid
              flexShrink={0}
              bg="primary.800"
              h={[200, 'auto']}
              columns={5}
              spacing={[2, 3]}
              pt={[2, 3]}
              pb={[2, 1]}
              px={[2, 0]}
            >
              {BUTTON_TEXTS.map((text, index) => (
                <Button variant="neon" key={text} onClick={onClickArray[index]}>
                  {text}
                </Button>
              ))}
              <IconButton
                variant="neon"
                aria-label="delete one character"
                onClick={onDeleteText}
                icon={<FiDelete />}
              />
            </SimpleGrid>
          </Flex>
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
        <Box pos="relative" flexGrow={1} display={DESKTOP_DISPLAY}>
          <Image
            src={background}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
      </Flex>
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
