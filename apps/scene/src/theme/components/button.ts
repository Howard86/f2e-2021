import { defineRecipe } from '@chakra-ui/react';

const Button = defineRecipe({
  variants: {
    variant: {
      plain: {
        _hover: {
          bgColor: 'blackAlpha.100',
        },
        bgColor: 'blackAlpha.200',
        borderRadius: 'full',
      },
      subtle: {
        _focusVisible: {
          bgColor: 'scenes.main',
          color: 'white',
        },
        _hover: {
          bgColor: 'scenes.main',
          color: 'white',
        },
        bgColor: 'gray.100',
        flexShrink: 0,
      },
    },
  },
});

export default Button;
