import { defineTextStyles } from '@chakra-ui/react';

const Text = defineTextStyles({
  body: {
    value: {
      fontSize: 14,
    },
  },
  'headline-1': {
    value: {
      fontSize: 48,
      fontWeight: 'bold',
    },
  },
  'headline-2': {
    value: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  },
  'headline-3': {
    value: {
      fontSize: 28,
      fontWeight: 'bold',
    },
  },
  subtitle: {
    value: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
});

export default Text;
