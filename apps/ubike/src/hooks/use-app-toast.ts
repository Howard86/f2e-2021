import {
  useBreakpointValue,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';

const DEFAULT_OPTIONS: UseToastOptions = {
  status: 'success',
  isClosable: true,
  variant: 'left-accent',
};

const useAppToast = (options = DEFAULT_OPTIONS) => {
  const position = useBreakpointValue<UseToastOptions['position']>({
    base: 'bottom',
    md: 'top-right',
  });

  return useToast({ position, ...options });
};

export default useAppToast;
