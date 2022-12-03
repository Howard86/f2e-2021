import React, { ReactNode } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

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
    <Footer mainColor={mainColor} gradientColor={gradientColor} />
  </>
);

export default Layout;
