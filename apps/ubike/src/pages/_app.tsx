import { ChakraProvider } from '@chakra-ui/react';
import { Fragment, type ReactElement } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import NextHeadSeo from 'next-head-seo';
import { Provider as ReduxProvider } from 'react-redux';

import MapContextProvider from '@/components/map-context-provider';
import { AppToaster } from '@/hooks/use-app-toast';
import store from '@/redux/store';
import system from '@/theme';

type ExtendedComponent = NextComponentType &
  Partial<{
    Layout: typeof Fragment;
  }>;

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  const { Layout = Fragment } = Component as ExtendedComponent;

  return (
    <>
      <NextHeadSeo
        description="深色版本的uBike Travel，使用者能租借腳踏車及根據地區尋找喜歡的騎乘路線"
        og={{
          description:
            '深色版本的uBike Travel，使用者能租借腳踏車及根據地區尋找喜歡的騎乘路線',
          image: `${process.env.NEXT_PUBLIC_VERCEL_URL}/logo.png`,
          title: 'uBike Travel',
        }}
        title="uBike Travel"
      />
      <ReduxProvider store={store}>
        <ChakraProvider value={system}>
          <MapContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MapContextProvider>
          <AppToaster />
        </ChakraProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
