import React from 'react';

import { Icon, IconProps } from '@chakra-ui/react';

const SunWithCloudIcon = (props: IconProps) => (
  <Icon viewBox="0 0 76 68" {...props}>
    <path
      d="M30.7425 51.2357C44.9294 51.2357 56.4301 39.7662 56.4301 25.6179C56.4301 11.4695 44.9294 0 30.7425 0C16.5557 0 5.05493 11.4695 5.05493 25.6179C5.05493 39.7662 16.5557 51.2357 30.7425 51.2357Z"
      fill="#F5CE42"
    />
    <g filter="url(#filter0_d_411:2110)">
      <path
        d="M49.7226 60C53.8632 60.0033 57.9226 58.8548 61.4447 56.6835C64.9667 54.5123 67.8116 51.4044 69.6597 47.7092C71.5079 44.0139 72.2858 39.8779 71.9063 35.7659C71.5267 31.6539 70.0046 27.729 67.5111 24.4324C65.0176 21.1357 61.6515 18.598 57.7912 17.1045C53.9309 15.611 49.7294 15.2209 45.659 15.9781C41.5886 16.7352 37.8106 18.6096 34.7497 21.3905C31.6889 24.1715 29.4664 27.7487 28.3322 31.7201C26.3244 30.3466 24.0211 29.4627 21.6079 29.1398C19.1947 28.8169 16.7392 29.0639 14.4393 29.8611C12.1394 30.6582 10.0595 31.9831 8.36725 33.7289C6.67499 35.4748 5.41774 37.5928 4.69683 39.9121C3.97592 42.2314 3.81153 44.6872 4.21692 47.0816C4.6223 49.4759 5.58612 51.7417 7.03067 53.6964C8.47521 55.6511 10.3601 57.2399 12.5333 58.3348C14.7065 59.4298 17.1073 60.0001 19.5421 60H49.7226Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_411:2110"
        x="0"
        y="15.6017"
        width="76"
        height="52.3983"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_411:2110"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_411:2110"
          result="shape"
        />
      </filter>
    </defs>
  </Icon>
);

export default SunWithCloudIcon;
