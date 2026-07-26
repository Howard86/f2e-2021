import { useCallback } from 'react';

import {
  createToaster,
  Portal,
  Stack,
  Toast,
  Toaster,
  type CreateToasterProps,
} from '@chakra-ui/react';

type AppToastOptions = Parameters<
  ReturnType<typeof createToaster>['create']
>[0] & {
  status?: NonNullable<
    Parameters<ReturnType<typeof createToaster>['create']>[0]['type']
  >;
};

const DEFAULT_OPTIONS: AppToastOptions = {
  status: 'success',
  closable: true,
};

const toaster = createToaster({
  placement: 'top-end',
} satisfies CreateToasterProps);

export const AppToaster = () => (
  <Portal>
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root>
          <Toast.Indicator />
          <Stack gap="1" flex="1" maxW="full">
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
    ({ status, ...nextOptions }: AppToastOptions) =>
      toaster.create({
        ...DEFAULT_OPTIONS,
        ...options,
        ...nextOptions,
        type: status ?? options.status ?? DEFAULT_OPTIONS.status,
      }),
    [options],
  );

export default useAppToast;
