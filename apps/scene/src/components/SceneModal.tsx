import React, { useState } from 'react';

import {
  BoxProps,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
} from '@chakra-ui/react';
import { City, CityMap, counties, majorCities } from '@f2e/tdx';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

import useAppToast from '@/hooks/use-app-toast';

const DEFAULT_MENU_VALUE = '選擇縣市' as const;

const SceneModal = ({ onClose, ...props }: Omit<ModalProps, 'children'>) => {
  const router = useRouter();
  const toast = useAppToast();
  const [selectedCity, setSelectedCity] = useState<
    City | typeof DEFAULT_MENU_VALUE
  >(DEFAULT_MENU_VALUE);

  const onAdvanceSearch = () => {
    if (selectedCity !== DEFAULT_MENU_VALUE) {
      onClose();
      router.push(`/cities/${selectedCity}`);
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
    <Modal onClose={onClose} scrollBehavior="inside" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader roundedTop="md" bgColor="scenes.main" color="white">
          進階搜尋
        </ModalHeader>
        <ModalCloseButton my="2" color="white" />
        <ModalBody mt="2">
          <Menu isLazy>
            {({ onClose: onMenuClose }) => (
              <>
                <MenuButton as={Button} variant="outline" flexShrink={0}>
                  {CityMap[selectedCity] || selectedCity}
                </MenuButton>
                <MenuList
                  minWidth="240px"
                  textAlign="center"
                  zIndex="popover"
                  pt="0"
                  overflow="hidden"
                >
                  <MenuGroup title="6直轄市" {...menuGroupStyle}>
                    <SimpleGrid columns={[4, 5]} gap={2} m="2">
                      {majorCities.map((city) => (
                        <MenuItem
                          as={Button}
                          key={city}
                          size="sm"
                          variant="outline"
                          value={city}
                          onClick={() => setSelectedCity(city)}
                        >
                          {CityMap[city]}
                        </MenuItem>
                      ))}
                    </SimpleGrid>
                  </MenuGroup>
                  <MenuGroup title="16縣市" {...menuGroupStyle}>
                    <SimpleGrid columns={[4, 5]} gap={2} m="2">
                      {counties.map((city) => (
                        <MenuItem
                          as={Button}
                          key={city}
                          size="sm"
                          variant="outline"
                          value={city}
                          onClick={() => setSelectedCity(city)}
                        >
                          {CityMap[city]}
                        </MenuItem>
                      ))}
                    </SimpleGrid>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <Button variant="scenes" onClick={onMenuClose}>
                      取消
                    </Button>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant="scenes"
            onClick={onAdvanceSearch}
            leftIcon={<FiSearch />}
          >
            搜尋
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SceneModal;
