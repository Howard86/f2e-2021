import type { ComponentStyleConfig } from '@chakra-ui/react';

const Text: ComponentStyleConfig = {
  variants: {
    'headline-1': {
      fontWeight: 'bold',
      fontSize: 12,
    },
    'headline-2': {
      fontWeight: 'bold',
      fontSize: 8,
    },
    'headline-3': {
      fontWeight: 'bold',
      fontSize: 7,
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 4,
    },
    body: {
      fontSize: 3.5,
    },
  },
};

export default Text;
