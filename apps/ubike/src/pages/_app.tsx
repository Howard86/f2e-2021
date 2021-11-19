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
      <NextHeadSeo
        title="uBike Travel"
        description="深色版本的uBike Travel，使用者能租借腳踏車及根據地區尋找喜歡的騎乘路線"
        og={{
          title: 'uBike Travel',
          description:
            '深色版本的uBike Travel，使用者能租借腳踏車及根據地區尋找喜歡的騎乘路線',
          image: `${process.env.NEXT_PUBLIC_VERCEL_URL}/logo.png`,
        }}
      />
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
