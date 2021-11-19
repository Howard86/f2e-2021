import React, { ChangeEvent, useState } from 'react';

import {
  Box,
  Container,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { BIKE_CITIES, CityMap } from '@f2e/ptx';
import { BsCaretDownFill } from 'react-icons/bs';

import CycleCard from '@/components/CycleCard';
import Map from '@/components/Map';
import { useGetCyclingByCityQuery } from '@/services/local';

const HomePage = () => {
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

  const onToggle = () => {
    setTabIndex(0);
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
          <TabPanel>
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
                  data.data.map((path, i) => (
                    <CycleCard
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${path.RouteName}-${path.CyclingLength}-${i}`}
                      name={path.RouteName}
                      length={path.CyclingLength}
                      city={path.City}
                      onToggle={onToggle}
                      geoJson={path.geoJson}
                    />
                  ))}
              </SimpleGrid>
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HomePage;
