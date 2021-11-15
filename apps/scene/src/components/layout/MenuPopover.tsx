import React, { useRef } from 'react';

import {
  IconButton,
  IconButtonProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  StackDivider,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import RouteLink from '../RouteLink';

import ROUTES from '@/constants/routes';

interface MenuPopoverProps extends PopoverProps {
  buttonBgColor: IconButtonProps['bgColor'];
}

const MenuPopover = ({ buttonBgColor, ...props }: MenuPopoverProps) => {
  const ref = useRef<HTMLDivElement>();
  const { isOpen, onClose, onToggle } = useDisclosure();
  useOutsideClick({ ref, handler: onClose });

  return (
    <Popover placement="right-start" isOpen={isOpen} isLazy {...props}>
      <PopoverTrigger>
        <IconButton
          display={['inline-flex', 'none']}
          p="1"
          fontSize="2xl"
          variant="ghost"
          aria-label="open menu"
          bgColor={buttonBgColor}
          icon={<FiMenu />}
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent ref={ref} w="120px" borderRightRadius="2xl">
        <VStack
          as={PopoverBody}
          spacing={2}
          divider={<StackDivider />}
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
      </PopoverContent>
    </Popover>
  );
};

export default MenuPopover;
