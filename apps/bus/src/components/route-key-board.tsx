import {
  Button,
  IconButton,
  SimpleGrid,
  type SimpleGridProps,
} from '@chakra-ui/react';
import { type Dispatch, memo, type SetStateAction, useMemo } from 'react';
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
      columns={5}
      flex={0}
      gap={[2, 4]}
      h={[200, 'auto']}
      pb={[2, 1]}
      pt={[2, 3]}
      px={[2, 0]}
      {...props}
    >
      {BUTTON_TEXTS.map((text, index) => (
        <Button key={text} onClick={onClickArray[index]} variant="outline">
          {text}
        </Button>
      ))}
      <IconButton
        aria-label="delete one character"
        onClick={onDeleteText}
        variant="outline"
      >
        <FiDelete />
      </IconButton>
    </SimpleGrid>
  );
};

export default memo(RouteKeyBoard);
