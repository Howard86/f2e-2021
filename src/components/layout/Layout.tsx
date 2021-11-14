import React, { ReactNode } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import Header from './Header';

const DynamicFooter = dynamic(() => import('./Footer'));
export interface LayoutProps extends BoxProps {
  mainColor: BoxProps['color'];
  gradientColor: BoxProps['color'];
  children: ReactNode;
}

const Layout = ({
  children,
  mainColor,
  gradientColor,
  ...props
}: LayoutProps) => (
  <>
    <Header mainColor={mainColor} />
    <Box as="main" minH="100%" {...props}>
      {children}
    </Box>
    <DynamicFooter mainColor={mainColor} gradientColor={gradientColor} />
  </>
);

export default Layout;
