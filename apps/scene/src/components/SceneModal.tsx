import React, { useState } from 'react';

import {
  BoxProps,
  Button,
  CloseButton,
  Dialog,
  Menu,
  Portal,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { City, CityMap, counties, majorCities } from '@f2e/tdx';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

import useAppToast from '@/hooks/use-app-toast';

const DEFAULT_MENU_VALUE = '選擇縣市' as const;

interface SceneModalProps extends Omit<
  Dialog.RootProps,
  'children' | 'onOpenChange'
> {
  onClose: () => void;
}

const SceneModal = ({ onClose, ...props }: SceneModalProps) => {
  const router = useRouter();
  const toast = useAppToast();
  const menu = useDisclosure();
  const [selectedCity, setSelectedCity] = useState<
    City | typeof DEFAULT_MENU_VALUE
  >(DEFAULT_MENU_VALUE);

  const onAdvanceSearch = () => {
    if (selectedCity !== DEFAULT_MENU_VALUE) {
      onClose();
      router.push(`/${selectedCity}`);
      return;
    }

    toast({ title: '請選擇主題或縣市', status: 'info' });
  };

  const menuGroupStyle: BoxProps = {
    fontSize: 'lg',
    bgColor: 'scenes.main',
    color: 'white',
    m: 0,
    py: 2,
  };

  return (
    <Dialog.Root
      onOpenChange={({ open }) => {
        if (!open) onClose();
      }}
      scrollBehavior="inside"
      {...props}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header roundedTop="md" bgColor="scenes.main" color="white">
              <Dialog.Title>進階搜尋</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton pos="absolute" top="2" right="2" color="white" />
            </Dialog.CloseTrigger>
            <Dialog.Body mt="2">
              <Menu.Root
                open={menu.open}
                onOpenChange={({ open }) => menu.setOpen(open)}
                lazyMount
              >
                <Menu.Trigger asChild>
                  <Button variant="outline" flexShrink={0}>
                    {CityMap[selectedCity] || selectedCity}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      minWidth="240px"
                      textAlign="center"
                      zIndex="popover"
                      pt="0"
                      overflow="hidden"
                    >
                      <Menu.ItemGroup {...menuGroupStyle}>
                        <Menu.ItemGroupLabel>6直轄市</Menu.ItemGroupLabel>
                        <SimpleGrid columns={[4, 5]} gap={2} m="2">
                          {majorCities.map((city) => (
                            <Menu.Item key={city} value={city} asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedCity(city)}
                              >
                                {CityMap[city]}
                              </Button>
                            </Menu.Item>
                          ))}
                        </SimpleGrid>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup {...menuGroupStyle}>
                        <Menu.ItemGroupLabel>16縣市</Menu.ItemGroupLabel>
                        <SimpleGrid columns={[4, 5]} gap={2} m="2">
                          {counties.map((city) => (
                            <Menu.Item key={city} value={city} asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedCity(city)}
                              >
                                {CityMap[city]}
                              </Button>
                            </Menu.Item>
                          ))}
                        </SimpleGrid>
                      </Menu.ItemGroup>
                      <Menu.Separator />
                      <Menu.ItemGroup>
                        <Button variant="subtle" onClick={menu.onClose}>
                          取消
                        </Button>
                      </Menu.ItemGroup>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <Button variant="subtle" onClick={onAdvanceSearch}>
                <FiSearch />
                搜尋
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SceneModal;
