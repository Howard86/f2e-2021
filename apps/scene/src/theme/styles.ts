import { ChakraTheme } from '@chakra-ui/react';

const styles: ChakraTheme['styles'] = {
  global: {
    html: {
      h: 'full',
      scrollBehavior: 'smooth',
    },
    body: {
      h: 'full',
      fontFamily: 'Noto Sans TC, sans-serif',
      color: 'text.body',
    },
    '#__next': {
      h: 'full',
    },
    'h1, h2, h3, h4, h5': {
      color: 'text.head',
    },
  },
};

export default styles;
