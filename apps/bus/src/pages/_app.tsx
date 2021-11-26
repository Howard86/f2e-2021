import React, { Fragment } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import NextHeadSeo from 'next-head-seo';
import { Provider as ReduxProvider } from 'react-redux';

import Layout, { LayoutProps } from '@/components/Layout';
import MapContextProvider from '@/components/MapContextProvider';
import store from '@/redux/store';
import theme from '@/theme';

type ExtendedComponent = NextComponentType &
  Partial<{
    PageLayout: typeof Fragment;
    layoutProps: Partial<LayoutProps>;
  }>;

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { PageLayout = Fragment, layoutProps } = Component as ExtendedComponent;

  return (
    <>
      <NextHeadSeo title="bus" />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <MapContextProvider>
            <Layout {...layoutProps}>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </Layout>
          </MapContextProvider>
        </ChakraProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
