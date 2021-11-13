import React, { ChangeEvent, useMemo, useState } from 'react';

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
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

import { COUNTIES, MAJOR_CITIES, THEMES } from '@/constants/category';
import useAppToast from '@/hooks/use-app-toast';

const DEFAULT_MENU_VALUE = '選擇縣市' as const;

const SceneModal = ({ onClose, ...props }: Omit<ModalProps, 'children'>) => {
  const router = useRouter();
  const toast = useAppToast();
  const [themeName, setThemeName] = useState<PTX.SceneClass>(undefined);
  const [cityName, setCityName] = useState<
    PTX.SceneCity | typeof DEFAULT_MENU_VALUE
  >(DEFAULT_MENU_VALUE);

  const MajorCityButtons = useMemo(
    () => (
      <>
        {MAJOR_CITIES.map((city) => (
          <MenuItem
            as={Button}
            key={city}
            size="sm"
            variant="outline"
            value={city}
            onClick={() => setCityName(city)}
          >
            {city}
          </MenuItem>
        ))}
      </>
    ),
    [],
  );

  const CountyButtons = useMemo(
    () => (
      <>
        {COUNTIES.map((city) => (
          <MenuItem
            as={Button}
            key={city}
            size="sm"
            variant="outline"
            value={city}
            onClick={() => setCityName(city)}
          >
            {city}
          </MenuItem>
        ))}
      </>
    ),
    [],
  );

  const onAdvanceSearch = () => {
    if (cityName !== DEFAULT_MENU_VALUE) {
      onClose();
      router.push(`/scenes/${cityName}`);
    }

    if (themeName) {
      onClose();
      router.push(`/scenes/${themeName}`);
    }

    toast({ title: '請選擇主題或縣市', status: 'info' });
  };

  const onSelectTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    setThemeName(event.target.value as PTX.SceneClass);
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
          <Stack direction={['column', 'row']} spacing={4}>
            <Select
              placeholder="選擇主題"
              value={themeName}
              onChange={onSelectTheme}
            >
              {THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </Select>
            <Menu isLazy>
              {({ onClose: onMenuClose }) => (
                <>
                  <MenuButton as={Button} variant="outline" flexShrink={0}>
                    {cityName}
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
                        {MajorCityButtons}
                      </SimpleGrid>
                    </MenuGroup>
                    <MenuGroup title="16縣市" {...menuGroupStyle}>
                      <SimpleGrid columns={[4, 5]} gap={2} m="2">
                        {CountyButtons}
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
          </Stack>
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
