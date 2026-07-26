import { defineRecipe } from '@chakra-ui/react';

const Button = defineRecipe({
  variants: {
    variant: {
      outline: {
        border: '1px solid',
        borderColor: 'primary.200',
        boxShadow:
          '0 0 6px -1px var(--chakra-colors-secondary-200),0 0 4px -1px var(--chakra-colors-secondary-100)',
        color: 'white',
        bg: 'transparent',
        transition: 'ease',
        transitionDuration: '0.3s',
        _hover: {
          bg: 'color-mix(in srgb, var(--chakra-colors-primary-200) 12%, transparent)',
        },
        _active: {
          bg: 'color-mix(in srgb, var(--chakra-colors-primary-200) 24%, transparent)',
          top: '1px',
        },
      },
    },
  },
});

export default Button;
