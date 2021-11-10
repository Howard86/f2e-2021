import { Fragment } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@/redux/store';
import theme from '@/theme';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const Layout =
    (Component as unknown as { Layout: typeof Fragment }).Layout || Fragment;

  return (
    <ReduxProvider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
