import React, { ChangeEvent, useState } from 'react';

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from '@chakra-ui/react';
import {
  BikeCycling,
  CITIES,
  City,
  CityMap,
  getCyclingShapeByCity,
} from '@f2e/ptx';
import type { GetStaticPropsResult } from 'next';
import { BsCaretDownFill } from 'react-icons/bs';

import DistanceIcon from '@/components/icons/DistanceIcon';
import PlaceIcon from '@/components/icons/PlaceIcon';
import StarIcon from '@/components/icons/StarIcon';
import Map from '@/components/Map';
import { getDifficulty } from '@/services/utils';

type CyclingPath = Record<CityMap, BikeCycling[]>;

interface HomePageProps {
  cyclingPath: CyclingPath;
}

const ONE_DAY = 24 * 60 * 60;

const HomePage = ({ cyclingPath }: HomePageProps) => {
  const [selectedCity, setSelectedCity] = useState<CityMap>();

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value as CityMap);
  };

  return (
    <Box h="full" color="white">
      <Tabs variant="unstyled">
        <TabList
          sx={{
            display: 'inline-flex',
            pos: 'relative',
            rounded: 'full',
            bg: 'whiteAlpha.200',
            zIndex: 'docked',
            mx: 8,
            mt: 8,
            button: {
              px: 5,
              py: 3,
              rounded: 'full',
              fontWeight: 'bold',
              _selected: {
                _before: {
                  content: '""',
                  bg: 'whiteAlpha.100',
                  h: 'full',
                  w: '50%',
                  pos: 'absolute',
                  rounded: 'full',
                },
                bg: 'primary.main',
                _hover: {
                  bg: 'primary.dark',
                },
              },
              _hover: {
                bg: 'whiteAlpha.200',
              },
              _first: {
                mr: -2.5,
              },
            },
          }}
        >
          <Tab>租車/還車</Tab>
          <Tab>騎乘路線</Tab>
        </TabList>
        <TabPanels p="0">
          <TabPanel h="100vh">
            <Map />
          </TabPanel>
          <TabPanel>
            <Container maxW="container.lg">
              <Select
                icon={<BsCaretDownFill />}
                w="120px"
                rounded="full"
                placeholder="選擇地區"
                fontWeight="bold"
                bg="whiteAlpha.200"
                border="none"
                value={selectedCity}
                onChange={onSelect}
                sx={{ div: { color: 'red.100' } }}
              >
                {CITIES.map((city) => (
                  <option value={CityMap[city]}>{city}</option>
                ))}
              </Select>
              <SimpleGrid columns={[1, 2, 4]} spacing={[4, 8]} my="4">
                {selectedCity &&
                  cyclingPath[selectedCity]?.map((path) => (
                    <Box
                      key={`${path.RouteName}-${path.CyclingLength}`}
                      p="4"
                      bg="white"
                      color="blackAlpha.800"
                      rounded="xl"
                      cursor="pointer"
                      _hover={{
                        bg: 'whiteAlpha.900',
                      }}
                    >
                      <Tooltip label={path.RouteName}>
                        <Heading fontSize="lg" mb="2" noOfLines={1}>
                          {path.RouteName}
                        </Heading>
                      </Tooltip>
                      <Flex
                        fontSize="sm"
                        sx={{
                          mb: 4,
                          div: { w: '50%', alignItems: 'center' },
                        }}
                      >
                        <Flex>
                          <DistanceIcon fontSize="2xl" mr="1" />
                          {path.CyclingLength
                            ? (path.CyclingLength / 1000).toFixed(1)
                            : '-'}
                          KM
                        </Flex>
                        <Flex>
                          <PlaceIcon
                            color="secondary.main"
                            fontSize="2xl"
                            mr="1"
                          />
                          {path.City}
                        </Flex>
                      </Flex>
                      <HStack>
                        {new Array(getDifficulty(path.CyclingLength))
                          .fill(0)
                          .map((_, index) => (
                            <StarIcon
                              // eslint-disable-next-line react/no-array-index-key
                              key={`${path.RouteName}-${index}`}
                              color="primary.main"
                            />
                          ))}
                      </HStack>
                    </Box>
                  ))}
              </SimpleGrid>
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomePageProps>
> => {
  const cities =
    process.env.NODE_ENV === 'production'
      ? CITIES
      : (['臺北市', '花蓮縣'] as City[]);

  const allCityPaths = await Promise.all(
    cities.map((city) => getCyclingShapeByCity(city)),
  );

  const cyclingPath = {} as CyclingPath;

  cities.forEach((city, index) => {
    cyclingPath[CityMap[city]] = allCityPaths[index];
  });

  try {
    return {
      props: {
        cyclingPath,
      },
      revalidate: ONE_DAY,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default HomePage;
