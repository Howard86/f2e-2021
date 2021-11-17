import { ChakraTheme } from '@chakra-ui/react';

const styles: ChakraTheme['styles'] = {
  global: {
    html: {
      h: 'full',
      scrollBehavior: 'smooth',
    },
    body: {
      fontFamily: 'Roboto, sans-serif',
      color: 'white',
      bg: 'blackAlpha.800',
      h: 'full',
    },
    '#__next': {
      h: 'full',
    },
  },
};

export default styles;
