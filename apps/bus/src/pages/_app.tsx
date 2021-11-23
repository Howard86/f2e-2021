import { Fragment } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import NextHeadSeo from 'next-head-seo';
import { Provider as ReduxProvider } from 'react-redux';

import Layout from '@/components/Layout';
import store from '@/redux/store';
import theme from '@/theme';

type ExtendedComponent = NextComponentType &
  Partial<{
    PageLayout: typeof Fragment;
  }>;

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { PageLayout = Fragment } = Component as ExtendedComponent;

  return (
    <>
      <NextHeadSeo title="bus" />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </Layout>
        </ChakraProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
