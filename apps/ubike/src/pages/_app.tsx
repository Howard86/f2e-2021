import { Fragment } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import NextHeadSeo from 'next-head-seo';
import { Provider as ReduxProvider } from 'react-redux';

import MapContextProvider from '@/components/MapContextProvider';
import store from '@/redux/store';
import theme from '@/theme';

type ExtendedComponent = NextComponentType &
  Partial<{
    Layout: typeof Fragment;
  }>;

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { Layout = Fragment } = Component as ExtendedComponent;

  return (
    <>
      <NextHeadSeo title="ubike" />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <MapContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MapContextProvider>
        </ChakraProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
