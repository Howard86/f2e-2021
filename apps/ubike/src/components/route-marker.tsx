import { Box, type BoxProps } from '@chakra-ui/react';

// This renders outside ChakraProvider, so only CSS variables are available.
const RouteMarker = ({ children, ...props }: BoxProps) => (
  <Box
    bgColor="var(--chakra-colors-primary-main)"
    color="white"
    px="var(--chakra-space-2)"
    py="var(--chakra-space-1)"
    rounded="var(--chakra-radii-xl)"
    {...props}
  >
    {children}
  </Box>
);

export default RouteMarker;
