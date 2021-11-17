import React from 'react';

import {
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoLocate } from 'react-icons/io5';

const HomePage = () => (
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
        <TabPanel>
          <Box h="100vh">
            <VStack
              sx={{
                pos: 'absolute',
                bottom: 0,
                left: 0,
                m: 8,
                button: {
                  fontSize: '32px',
                  display: 'inline-flex',
                  rounded: 'full',
                  bg: 'blackAlpha.700',
                  boxSize: '64px',
                  _hover: {
                    bg: 'blackAlpha.600',
                  },
                },
                zIndex: 11,
              }}
              spacing={4}
            >
              <IconButton aria-label="放大" icon={<BiPlus />} />
              <IconButton aria-label="縮小" icon={<BiMinus />} />
            </VStack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pos: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                button: {
                  display: 'inline-flex',
                  fontSize: '60px',
                  bg: 'primary.main',
                  boxShadow: '0 0 20px var(--chakra-colors-secondary-main)',
                  rounded: 'full',
                  boxSize: '100px',
                  _hover: {
                    bg: 'primary.dark',
                  },
                },
                m: 8,
                zIndex: 'docked',
              }}
            >
              <IconButton aria-label="定位" icon={<IoLocate />} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel />
      </TabPanels>
    </Tabs>
  </Box>
);

export default HomePage;
