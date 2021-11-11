import { ChakraTheme } from '@chakra-ui/react';

const styles: ChakraTheme['styles'] = {
  global: {
    'html, #__next': {
      h: 'full',
    },
    body: {
      h: 'full',
      fontFamily: 'Noto Sans TC, sans-serif',
    },
  },
};

export default styles;
