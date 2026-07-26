import React, { ChangeEventHandler, memo } from 'react';

import { Input, InputProps, NativeSelect } from '@chakra-ui/react';
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
    <NativeSelect.Root display={display} maxW="110px">
      <NativeSelect.Field
        value={defaultCity}
        onChange={onSelectCity}
        roundedRight="none"
      >
        {Cities.map((city) => (
          <option key={city} value={city}>
            {CityMap[city]}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
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
