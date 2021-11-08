import { extendTheme } from '@chakra-ui/react';

import colors from './colors';
import styles from './styles';

const theme = extendTheme({
  colors,
  styles,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
