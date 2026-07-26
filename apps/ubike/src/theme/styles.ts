import { defineGlobalStyles } from '@chakra-ui/react';

const styles = defineGlobalStyles({
  html: {
    h: 'full',
    scrollBehavior: 'smooth',
  },
  body: {
    fontFamily: 'Roboto, sans-serif',
    bg: 'blackAlpha.800',
    h: 'full',
  },
  '#__next': {
    h: 'full',
  },
});

export default styles;
