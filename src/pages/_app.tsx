import { Fragment } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';

import type { LayoutProps } from '@/components/layout/Layout';
import store from '@/redux/store';
import theme from '@/theme';

type ExtendedComponent = NextComponentType &
  Partial<{
    Layout: typeof Fragment;
    layoutProps: LayoutProps;
  }>;

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { Layout = Fragment, layoutProps } = Component as ExtendedComponent;

  return (
    <ReduxProvider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
