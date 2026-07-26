import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import Button from './components/Button';
import Text from './components/Text';
import colors from './colors';
import styles from './styles';

const config = defineConfig({
  globalCss: styles,
  theme: {
    tokens: { colors },
    textStyles: Text,
    recipes: {
      button: Button,
    },
  },
});

export default createSystem(defaultConfig, config);
