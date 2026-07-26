import React from 'react';

import {
  IconButton,
  IconButtonProps,
  Popover,
  Portal,
  Separator,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import RouteLink from '../RouteLink';

import ROUTES from '@/constants/routes';

interface MenuPopoverProps extends Omit<
  Popover.RootProps,
  'children' | 'open' | 'onOpenChange'
> {
  buttonBgColor: IconButtonProps['bgColor'];
}

const MenuPopover = ({ buttonBgColor, ...props }: MenuPopoverProps) => {
  const { open, onClose, setOpen } = useDisclosure();

  return (
    <Popover.Root
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
      positioning={{ placement: 'right-start' }}
      lazyMount
      {...props}
    >
      <Popover.Trigger asChild>
        <IconButton
          display={['inline-flex', 'none']}
          p="1"
          fontSize="2xl"
          variant="ghost"
          aria-label="open menu"
          bgColor={buttonBgColor}
        >
          <FiMenu />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="120px" borderRightRadius="2xl">
            <Popover.Body>
              <VStack
                gap={2}
                separator={<Separator />}
                fontSize="lg"
                color="blackAlpha.800"
                borderRadius="inherit"
              >
                {ROUTES.map((route) => (
                  <RouteLink
                    key={route.label}
                    href={route.href}
                    onClick={onClose}
                    _hover={{ color: 'scenes.main' }}
                  >
                    {route.label}
                  </RouteLink>
                ))}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default MenuPopover;
