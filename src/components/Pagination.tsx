import React, { Dispatch, SetStateAction } from 'react';

import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
} from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface PaginationProps extends ButtonGroupProps {
  page: number; // page starts with 0
  total: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  page,
  total,
  onPageChange,
  ...props
}: PaginationProps) => {
  const isFirst = page === 0;
  const isLast = page === total - 1;

  const increment = () => onPageChange((current) => current + 1);
  const decrement = () => onPageChange((current) => current - 1);

  return (
    <ButtonGroup spacing={6} {...props}>
      <IconButton
        aria-label="show previous page"
        icon={<BiChevronLeft />}
        onClick={decrement}
        disabled={isFirst}
      />
      <Button disabled={isFirst} onClick={decrement}>
        {isFirst ? '' : page}
      </Button>
      <Button color="white" bg="brand.2" _hover={{ bg: 'brand.1' }}>
        {page + 1}
      </Button>
      <Button disabled={isLast} onClick={increment}>
        {isLast ? '' : page + 2}
      </Button>
      <IconButton
        aria-label="show next page"
        icon={<BiChevronRight />}
        onClick={increment}
        disabled={isLast}
      />
    </ButtonGroup>
  );
};

export default Pagination;
