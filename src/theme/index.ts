import { extendTheme } from '@chakra-ui/react';

import Text from './components/Text';
import colors from './colors';
import styles from './styles';

const theme = extendTheme({
  colors,
  styles,
  components: {
    Text,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
