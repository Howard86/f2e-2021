import { ChakraTheme } from '@chakra-ui/react';

const styles: ChakraTheme['styles'] = {
  global: {
    html: {
      h: 'full',
      scrollBehavior: 'smooth',
    },
    body: {
      fontFamily: 'Noto Sans TC, sans-serif',
      h: 'full',
    },
    '#__next': {
      h: 'full',
    },
  },
};

export default styles;
