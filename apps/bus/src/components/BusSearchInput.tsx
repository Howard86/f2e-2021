import React, { ChangeEventHandler, memo } from 'react';

import { Input, InputProps, Select } from '@chakra-ui/react';
import { Cities, City, CityMap } from '@f2e/tdx';

interface BusSearchInputProps {
  display?: InputProps['display'];
  city: City;
  onSelectCity: ChangeEventHandler<HTMLSelectElement>;
  searchString: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
}

const BusSearchInput = ({
  display,
  searchString,
  onSearch,
  city: defaultCity,
  onSelectCity,
}: BusSearchInputProps) => (
  <>
    <Select
      display={display}
      value={defaultCity}
      maxW="110px"
      onChange={onSelectCity}
      roundedRight="none"
    >
      {Cities.map((city) => (
        <option key={city} value={city}>
          {CityMap[city]}
        </option>
      ))}
    </Select>
    <Input
      display={display}
      value={searchString}
      onChange={onSearch}
      placeholder="請輸入公車路線編號"
      roundedLeft="none"
      borderLeft="none"
    />
  </>
);

export default memo(BusSearchInput);
