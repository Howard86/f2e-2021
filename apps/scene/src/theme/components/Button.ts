import type { ComponentStyleConfig } from '@chakra-ui/react';

const Button: ComponentStyleConfig = {
  variants: {
    rounded: {
      rounded: 'full',
      bgColor: 'blackAlpha.200',
      _hover: {
        bgColor: 'blackAlpha.100',
      },
    },
    scenes: {
      flexShrink: 0,
      bgColor: 'gray.100',
      _focus: {
        bgColor: 'scenes.main',
        color: 'white',
      },
      _hover: {
        bgColor: 'scenes.main',
        color: 'white',
      },
    },
  },
};

export default Button;
