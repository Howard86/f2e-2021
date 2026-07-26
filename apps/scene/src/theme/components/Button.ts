import { defineRecipe } from '@chakra-ui/react';

const Button = defineRecipe({
  variants: {
    variant: {
      plain: {
        borderRadius: 'full',
        bgColor: 'blackAlpha.200',
        _hover: {
          bgColor: 'blackAlpha.100',
        },
      },
      subtle: {
        flexShrink: 0,
        bgColor: 'gray.100',
        _focusVisible: {
          bgColor: 'scenes.main',
          color: 'white',
        },
        _hover: {
          bgColor: 'scenes.main',
          color: 'white',
        },
      },
    },
  },
});

export default Button;
