import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import colors from './colors';
import styles from './styles';

const config = defineConfig({
  globalCss: styles,
  theme: {
    tokens: { colors },
  },
});

export default createSystem(defaultConfig, config);
