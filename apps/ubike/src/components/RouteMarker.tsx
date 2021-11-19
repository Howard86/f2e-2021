import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

// here as we use ReactDOM.render, can only access css variables
const RouteMarker = ({ children, ...props }: BoxProps) => (
  <Box
    px="var(--chakra-space-2)"
    py="var(--chakra-space-1)"
    bgColor="var(--chakra-colors-primary-main)"
    color="white"
    rounded="var(--chakra-radii-xl)"
    {...props}
  >
    {children}
  </Box>
);

export default RouteMarker;
