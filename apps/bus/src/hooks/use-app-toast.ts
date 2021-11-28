import { useToast, UseToastOptions } from '@chakra-ui/react';

const DEFAULT_OPTIONS: UseToastOptions = {
  status: 'success',
  isClosable: true,
  variant: 'left-accent',
  position: 'bottom',
};

const useAppToast = (options = DEFAULT_OPTIONS) => useToast(options);

export default useAppToast;
