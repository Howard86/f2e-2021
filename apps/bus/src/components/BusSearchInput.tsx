import React, { ChangeEventHandler, memo } from 'react';

import { Input, InputProps, Select } from '@chakra-ui/react';
import { CITIES, CityMap, CitySlug } from '@f2e/ptx';

interface BusSearchInputProps extends InputProps {
  citySlug: CitySlug;
  onSelectCity: ChangeEventHandler<HTMLSelectElement>;
  searchString: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
}

const BusSearchInput = ({
  searchString,
  onSearch,
  citySlug,
  onSelectCity,
}: BusSearchInputProps) => (
  <>
    <Select
      value={citySlug}
      maxW="110px"
      onChange={onSelectCity}
      roundedRight="none"
    >
      {CITIES.map((city) => (
        <option key={CityMap[city]} value={CityMap[city]}>
          {city}
        </option>
      ))}
    </Select>
    <Input
      value={searchString}
      onChange={onSearch}
      placeholder="請輸入公車路線編號"
      roundedLeft="none"
      borderLeft="none"
    />
  </>
);

export default memo(BusSearchInput);
