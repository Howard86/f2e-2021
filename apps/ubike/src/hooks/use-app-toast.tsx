import { useCallback } from 'react';

import {
  createToaster,
  Portal,
  Stack,
  Toast,
  Toaster,
  ToastOptions,
} from '@chakra-ui/react';

interface AppToastOptions extends Omit<ToastOptions, 'type'> {
  status?: ToastOptions['type'];
  isClosable?: boolean;
}

const DEFAULT_OPTIONS: AppToastOptions = {
  status: 'success',
  isClosable: true,
};

const toaster = createToaster({ placement: 'bottom' });

export const AppToaster = () => (
  <Portal>
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root borderLeftWidth="4px">
          <Toast.Indicator />
          <Stack gap="1" flex="1">
            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
            {toast.description && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
          </Stack>
          {toast.closable && <Toast.CloseTrigger />}
        </Toast.Root>
      )}
    </Toaster>
  </Portal>
);

const useAppToast = (options: AppToastOptions = DEFAULT_OPTIONS) =>
  useCallback(
    (nextOptions: AppToastOptions = {}) => {
      const { status, isClosable, ...toastOptions } = {
        ...options,
        ...nextOptions,
      };

      return toaster.create({
        ...toastOptions,
        type: status,
        closable: isClosable,
      });
    },
    [options],
  );

export default useAppToast;
