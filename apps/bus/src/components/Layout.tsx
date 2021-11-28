import React, { ReactNode } from 'react';

import { Box, keyframes } from '@chakra-ui/react';

import Map from './Map';

import background from '@/background.png';
import Image from '@/components/Image';

export interface LayoutProps {
  children: ReactNode;
  showMap?: boolean;
}

const slidingAnimation = keyframes`
  from {
    object-position: 0 50%;
  }
  to {
    object-position: 100% 50%;
  }
`;

const Layout = ({ children, showMap }: LayoutProps) => (
  <Box h="full" bgGradient="var(--chakra-colors-gradient-bg)">
    <Box pos="fixed" w="full" h="full" overflow="hidden">
      <Image
        alt="background"
        src={background}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        animation={`${slidingAnimation} 60s linear infinite alternate`}
      />
    </Box>
    {/* TODO: fix these constants */}
    <Box
      pos="absolute"
      top="72px"
      bottom="200px"
      w="full"
      opacity={showMap ? 1 : 0}
    >
      <Map />
    </Box>
    {children}
  </Box>
);

export default Layout;
