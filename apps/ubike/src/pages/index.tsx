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
  useTheme,
} from '@chakra-ui/react';
import { BIKE_CITIES, CityMap } from '@f2e/ptx';
import { BsCaretDownFill } from 'react-icons/bs';

import DistanceIcon from '@/components/icons/DistanceIcon';
import PlaceIcon from '@/components/icons/PlaceIcon';
import StarIcon from '@/components/icons/StarIcon';
import Map from '@/components/Map';
import { useMap } from '@/components/MapContextProvider';
import { useGetCyclingByCityQuery } from '@/services/local';
import { attachJSX, Coordinate } from '@/services/mapbox';
import { getDifficulty } from '@/services/utils';

const HomePage = () => {
  const theme = useTheme();
  const { mapRef, layerIdRef, markersRef } = useMap();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState<CityMap>();
  const { data } = useGetCyclingByCityQuery(selectedCity, {
    skip: tabIndex !== 1 || !selectedCity,
  });

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value as CityMap);
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box h="full" color="white">
      <Tabs variant="unstyled" index={tabIndex} onChange={handleTabsChange}>
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
                {BIKE_CITIES.map((city) => (
                  <option key={city} value={CityMap[city]}>
                    {city}
                  </option>
                ))}
              </Select>
              <SimpleGrid columns={[1, 2, 4]} spacing={[4, 8]} my={[4, 8]}>
                {data &&
                  data.success &&
                  data.data.map((path, i) => {
                    const onClick = async () => {
                      if (!mapRef.current) {
                        return;
                      }

                      const { addLayerAndSource: addLayer } = await import(
                        '@/services/mapbox'
                      );

                      if (mapRef.current.getLayer(layerIdRef.current)) {
                        mapRef.current.removeLayer(layerIdRef.current);
                      }

                      if (mapRef.current.getSource(layerIdRef.current)) {
                        mapRef.current.removeSource(layerIdRef.current);
                      }
                      // eslint-disable-next-line no-restricted-syntax
                      for (const marker of markersRef.current) {
                        marker.remove();
                      }
                      markersRef.current = [];

                      layerIdRef.current = addLayer(
                        mapRef.current,
                        path.RouteName,
                        path.geoJson,
                        theme.colors.primary.main,
                      );
                      const coordinates = path.geoJson
                        .coordinates[0] as Coordinate[];

                      markersRef.current.push(
                        attachJSX(
                          mapRef.current,
                          <Box
                            px="var(--chakra-space-2)"
                            py="var(--chakra-space-1)"
                            bgColor="var(--chakra-colors-primary-main)"
                            color="white"
                            rounded="var(--chakra-radii-xl)"
                          >
                            起點
                          </Box>,
                          coordinates[0],
                        ),
                      );
                      markersRef.current.push(
                        attachJSX(
                          mapRef.current,
                          <Box
                            px="var(--chakra-space-2)"
                            py="var(--chakra-space-1)"
                            bgColor="var(--chakra-colors-primary-main)"
                            color="white"
                            rounded="var(--chakra-radii-xl)"
                          >
                            終點
                          </Box>,
                          coordinates[coordinates.length - 1],
                        ),
                      );

                      setTabIndex(0);
                    };

                    return (
                      <Box
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${path.RouteName}-${path.CyclingLength}-${i}`}
                        p={[4, 6]}
                        bg="white"
                        color="blackAlpha.800"
                        rounded="xl"
                        cursor="pointer"
                        _hover={{
                          bg: 'whiteAlpha.900',
                        }}
                        onClick={onClick}
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
                    );
                  })}
              </SimpleGrid>
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HomePage;
