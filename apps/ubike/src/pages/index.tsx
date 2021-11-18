import React from 'react';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import Map from '@/components/Map';

const HomePage = () => (
  <>
    <Box h="full">
      <Tabs variant="unstyled">
        <TabList
          sx={{
            display: 'inline-flex',
            pos: 'relative',
            rounded: 'full',
            bg: 'whiteAlpha.200',
            zIndex: 'docked',
            m: 8,
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
        <TabPanels
          sx={{
            pos: 'absolute',
            top: 0,
            div: {
              p: 0,
            },
          }}
        >
          <TabPanel h="100vh">
            <Map />
          </TabPanel>
          <TabPanel />
        </TabPanels>
      </Tabs>
    </Box>
  </>
);
export default HomePage;
