import { Fragment, type ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import NextHeadSeo from 'next-head-seo';
import { Provider as ReduxProvider } from 'react-redux';

import type { LayoutProps } from '@/components/layout/Layout';
import { AppToaster } from '@/hooks/use-app-toast';
import store from '@/redux/store';
import system from '@/theme';

type ExtendedComponent = NextComponentType &
  Partial<{
    Layout: typeof Fragment;
    layoutProps: LayoutProps;
  }>;

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  const { Layout = Fragment, layoutProps } = Component as ExtendedComponent;

  return (
    <>
      <NextHeadSeo
        title="台灣旅遊導覽網"
        description="以插畫呈現台灣風景，搭配客家花布常出現的牡丹花，牡丹花意味著富貴和幸福，散發台灣各地的美。 現在就跟著台灣旅遊導覽網一起一探究竟吧！"
        og={{
          type: 'website',
          siteName: '台灣旅遊導覽網',
          image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/fallback.jpg`,
        }}
        twitter={{
          card: 'summary',
        }}
      />
      <ReduxProvider store={store}>
        <ChakraProvider value={system}>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>
          <AppToaster />
        </ChakraProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
