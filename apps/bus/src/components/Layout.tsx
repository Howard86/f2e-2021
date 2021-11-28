import React, { ReactNode } from 'react';

import { Box, keyframes } from '@chakra-ui/react';

import Map from './Map';

import background from '@/background.png';
import Image from '@/components/Image';

export interface LayoutProps {
  children: ReactNode;
  showMap?: boolean;
  hideLocate?: boolean;
}

const slidingAnimation = keyframes`
  from {
    object-position: 0 50%;
  }
  to {
    object-position: 100% 50%;
  }
`;

export const MOBILE_MAP_BOTTOM = '200px';
export const DESKTOP_MAP_LEFT = '400px';

const Layout = ({ children, showMap, hideLocate }: LayoutProps) => (
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
    <Box
      pos="absolute"
      top={['72px', 66]}
      bottom={[MOBILE_MAP_BOTTOM, 0]}
      left={[0, DESKTOP_MAP_LEFT]}
      right="0"
      opacity={showMap ? 1 : 0}
    >
      <Map hideLocate={hideLocate} />
    </Box>
    {children}
  </Box>
);

export default Layout;
