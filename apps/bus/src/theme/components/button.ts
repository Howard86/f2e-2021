import type { ComponentStyleConfig } from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';

const Button: ComponentStyleConfig = {
  variants: {
    neon: ({ theme }) => ({
      border: '1px solid',
      borderColor: 'primary.200',
      boxShadow: `0 0 6px -1px ${theme.colors.secondary[200]},0 0 4px -1px ${theme.colors.secondary[100]}`,
      color: 'white',
      bg: 'transparent',
      transition: 'ease',
      transitionDuration: '0.3s',
      _hover: {
        bg: transparentize('primary.200', 0.12)(theme),
      },
      _active: {
        bg: transparentize('primary.200', 0.24)(theme),
        top: '1px',
      },
    }),
  },
};

export default Button;
