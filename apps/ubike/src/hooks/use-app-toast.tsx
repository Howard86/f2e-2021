import {
  createToaster,
  Portal,
  Stack,
  Toast,
  Toaster,
  type ToastOptions,
} from '@chakra-ui/react';
import { useCallback } from 'react';

interface AppToastOptions extends Omit<ToastOptions, 'type'> {
  isClosable?: boolean;
  status?: ToastOptions['type'];
}

const DEFAULT_OPTIONS: AppToastOptions = {
  isClosable: true,
  status: 'success',
};

const toaster = createToaster({ placement: 'bottom' });

export const AppToaster = () => (
  <Portal>
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root borderLeftWidth="4px">
          <Toast.Indicator />
          <Stack flex="1" gap="1">
            {Boolean(toast.title) && <Toast.Title>{toast.title}</Toast.Title>}
            {Boolean(toast.description) && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
          </Stack>
          {Boolean(toast.closable) && <Toast.CloseTrigger />}
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
        closable: isClosable,
        type: status,
      });
    },
    [options],
  );

export default useAppToast;
