import type { ComponentStyleConfig } from '@chakra-ui/react';

const Text: ComponentStyleConfig = {
  variants: {
    'headline-1': {
      fontWeight: 'bold',
      fontSize: 48,
    },
    'headline-2': {
      fontWeight: 'bold',
      fontSize: 32,
    },
    'headline-3': {
      fontWeight: 'bold',
      fontSize: 28,
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    body: {
      fontSize: 14,
    },
  },
};

export default Text;
