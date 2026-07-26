import { defineTextStyles } from '@chakra-ui/react';

const Text = defineTextStyles({
  'headline-1': {
    value: {
      fontWeight: 'bold',
      fontSize: 48,
    },
  },
  'headline-2': {
    value: {
      fontWeight: 'bold',
      fontSize: 32,
    },
  },
  'headline-3': {
    value: {
      fontWeight: 'bold',
      fontSize: 28,
    },
  },
  subtitle: {
    value: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
  body: {
    value: {
      fontSize: 14,
    },
  },
});

export default Text;
