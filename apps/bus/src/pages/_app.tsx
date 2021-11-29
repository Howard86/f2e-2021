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
      <NextHeadSeo
        title="Iro Bus"
        description="設計理念的取名來自於公車與捷運都會以顏色做為路線的區分，能有助於乘客辨別搭乘路線，節省時間，因而取名為Iro Bus，Iro為日文顏色的意思。Iro Bus整體色系偏暗色，營造科技感，帶給乘客能自由的創新自己的公車路線，穿梭全台各地，輕鬆掌握全台的公車訊息。"
        og={{
          title: 'Iro Bus',
          description:
            '設計理念的取名來自於公車與捷運都會以顏色做為路線的區分，能有助於乘客辨別搭乘路線，節省時間',
          image: '/preview.jpg',
        }}
      />
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
