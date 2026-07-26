import React, { ChangeEvent, useState } from 'react';

import {
  Box,
  Container,
  Flex,
  NativeSelect,
  SimpleGrid,
  Spinner,
  Tabs,
} from '@chakra-ui/react';
import { Cities, City, CityMap } from '@f2e/tdx';
import { motion, Variants } from 'framer-motion';

import CycleCard from '@/components/CycleCard';
import Map from '@/components/Map';
import { useGetCyclingByCityQuery } from '@/services/local';

const MotionGrid = motion.create(SimpleGrid);

const variants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      staggerChildren: 0.125,
    },
  },
};

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState<City>();
  const { data, isFetching } = useGetCyclingByCityQuery(selectedCity, {
    skip: tabIndex !== 1 || !selectedCity,
  });

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value as City);
  };

  const handleTabsChange = (value: string) => {
    setTabIndex(Number(value));
  };

  const onToggle = () => {
    setTabIndex(0);
  };

  return (
    <Box h="full" color="white">
      <Tabs.Root
        id="tab"
        variant="plain"
        value={String(tabIndex)}
        onValueChange={({ value }) => handleTabsChange(value)}
      >
        <Tabs.List
          css={{
            display: 'inline-flex',
            pos: 'relative',
            rounded: 'full',
            bg: 'whiteAlpha.200',
            zIndex: 'docked',
            mx: 8,
            mt: 8,
            '& button': {
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
                _focus: {
                  bg: 'primary.dark',
                },
              },
              _hover: {
                bg: 'whiteAlpha.200',
              },
              _first: {
                mr: -2.5,
              },
              transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
            },
            transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
          }}
        >
          <Tabs.Trigger value="0">租車/還車</Tabs.Trigger>
          <Tabs.Trigger value="1">騎乘路線</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="0">
          <Map />
        </Tabs.Content>
        <Tabs.Content value="1">
          <Container maxW="container.lg">
            <Flex justify="space-between" align="center">
              <NativeSelect.Root w="120px">
                <NativeSelect.Field
                  rounded="full"
                  fontWeight="bold"
                  bg="whiteAlpha.200"
                  border="none"
                  value={selectedCity ?? ''}
                  onChange={onSelect}
                >
                  <option value="" disabled>
                    選擇地區
                  </option>
                  {Cities.map((city) => (
                    <option key={city} value={city}>
                      {CityMap[city]}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Spinner
                display={isFetching ? 'block' : 'none'}
                borderWidth="3px"
                animationDuration="0.65s"
                borderColor="gray.200"
                borderTopColor="secondary.main"
                size="lg"
              />
            </Flex>
            {data && data.success && !isFetching && (
              <MotionGrid
                columns={[1, 2, 4]}
                gap={[4, 8]}
                my={[4, 8]}
                variants={variants}
                initial="hidden"
                animate="show"
              >
                {data.data.map((path, i) => (
                  <CycleCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${path.RouteName}-${path.CyclingLength}-${i}`}
                    name={path.RouteName}
                    length={path.CyclingLength}
                    city={CityMap[path.City] as City}
                    onToggle={onToggle}
                    geoJson={path.geoJson}
                  />
                ))}
              </MotionGrid>
            )}
          </Container>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default HomePage;
