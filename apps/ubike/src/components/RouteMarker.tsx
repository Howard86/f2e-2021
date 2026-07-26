import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

// This renders outside ChakraProvider, so only CSS variables are available.
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
