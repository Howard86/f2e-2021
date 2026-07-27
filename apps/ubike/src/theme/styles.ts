import { defineGlobalStyles } from '@chakra-ui/react';

const styles = defineGlobalStyles({
  '#__next': {
    h: 'full',
  },
  body: {
    bg: 'blackAlpha.800',
    fontFamily: 'Roboto, sans-serif',
    h: 'full',
  },
  html: {
    h: 'full',
    scrollBehavior: 'smooth',
  },
});

export default styles;
