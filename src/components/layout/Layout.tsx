import React, { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <Box as="main">{children}</Box>
    <Footer />
  </>
);

export default Layout;
