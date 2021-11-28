import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

import colors from './colors';
import styles from './styles';

const theme = extendTheme(
  {
    colors,
    styles,
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);

export default theme;
