import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

import Button from './components/button';
import colors from './colors';
import styles from './styles';

const theme = extendTheme(
  {
    colors,
    styles,
    components: {
      Button,
    },
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);

export default theme;
