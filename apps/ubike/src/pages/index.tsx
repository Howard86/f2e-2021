import React from 'react';

import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false });

const HomePage = () => (
  <Box>
    <DynamicMap />
  </Box>
);

export default HomePage;
