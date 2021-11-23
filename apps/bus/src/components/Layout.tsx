import React, { PropsWithChildren } from 'react';

import { Box, keyframes } from '@chakra-ui/react';

import background from '@/background.png';
import Image from '@/components/Image';

const slidingAnimation = keyframes`
  from {
    object-position: 10% 50%;
  }
  to {
    object-position: 90% 50%;
  }
`;

const Layout = ({ children }: Required<PropsWithChildren<unknown>>) => (
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
    {children}
  </Box>
);

export default Layout;
