import React, { Dispatch, memo, SetStateAction, useMemo } from 'react';

import {
  Button,
  IconButton,
  SimpleGrid,
  SimpleGridProps,
} from '@chakra-ui/react';
import { FiDelete } from 'react-icons/fi';

const BUTTON_TEXTS = [
  '紅',
  '藍',
  '1',
  '2',
  '3',
  '綠',
  '棕',
  '4',
  '5',
  '6',
  '黃',
  '小',
  '7',
  '8',
  '9',
  '幹線',
  '市民',
  '重設',
  '0',
] as const;

const DEFAULT_SEARCH_STRING = '';

interface RouteKeyBoardProps extends SimpleGridProps {
  setSearchString: Dispatch<SetStateAction<string>>;
}

const RouteKeyBoard = ({ setSearchString, ...props }: RouteKeyBoardProps) => {
  const onClickArray = useMemo(
    () =>
      BUTTON_TEXTS.map((text) => {
        switch (text) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
          case '0':
            return () => setSearchString((existedText) => existedText + text);

          case '重設':
            return () => setSearchString(DEFAULT_SEARCH_STRING);

          default:
            return () => setSearchString(text);
        }
      }),
    [setSearchString],
  );

  const onDeleteText = () => {
    setSearchString((existedText) =>
      existedText.slice(0, existedText.length - 1),
    );
  };

  return (
    <SimpleGrid
      flex={0}
      h={[200, 'auto']}
      columns={5}
      spacing={[2, 4]}
      pt={[2, 3]}
      pb={[2, 1]}
      px={[2, 0]}
      {...props}
    >
      {BUTTON_TEXTS.map((text, index) => (
        <Button variant="neon" key={text} onClick={onClickArray[index]}>
          {text}
        </Button>
      ))}
      <IconButton
        variant="neon"
        aria-label="delete one character"
        onClick={onDeleteText}
        icon={<FiDelete />}
      />
    </SimpleGrid>
  );
};

export default memo(RouteKeyBoard);
