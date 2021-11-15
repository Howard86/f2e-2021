import React from 'react';

import { Icon, IconProps } from '@chakra-ui/react';

const RainWithCloudIcon = (props: IconProps) => (
  <Icon viewBox="0 0 82 60" {...props}>
    <g filter="url(#filter0_d_411_2107)">
      <path
        d="M53.76 49.6957C58.2656 49.699 62.6829 48.413 66.5152 45.9825C70.3475 43.552 73.4431 40.0732 75.4539 35.9372C77.4647 31.8012 78.3111 27.1718 77.8979 22.5694C77.4848 17.967 75.8285 13.5741 73.1151 9.88428C70.4018 6.19448 66.739 3.3541 62.5384 1.68237C58.3378 0.0106341 53.7659 -0.42618 49.3366 0.421021C44.9073 1.26822 40.7962 3.36586 37.4652 6.47816C34.1342 9.59047 31.7155 13.5941 30.4808 18.039C28.2957 16.5014 25.789 15.512 23.1627 15.1506C20.5364 14.7891 17.8641 15.0657 15.3611 15.958C12.8581 16.8503 10.5946 18.3334 8.75289 20.2877C6.9112 22.242 5.54293 24.6129 4.75836 27.2092C3.9738 29.8055 3.79489 32.5545 4.23607 35.2347C4.67726 37.9149 5.72618 40.4513 7.29828 42.6394C8.87039 44.8275 10.9217 46.6061 13.2868 47.8318C15.652 49.0574 18.2647 49.6959 20.9146 49.6957H53.76Z"
        fill="white"
      />
    </g>
    <path
      d="M46.1666 48.6687C44.7982 46.5341 43.2702 44.5117 41.5963 42.62C39.9234 44.5116 38.3967 46.534 37.0299 48.6687C36.0322 50.0621 35.3911 51.69 35.1655 53.4034C35.1655 55.1529 35.8431 56.8308 37.049 58.0679C38.255 59.305 39.8907 60 41.5963 60C43.3018 60 44.9375 59.305 46.1435 58.0679C47.3495 56.8308 48.027 55.1529 48.027 53.4034C47.8036 51.6901 47.1638 50.062 46.1666 48.6687Z"
      fill="#83B3CB"
    />
    <defs>
      <filter
        id="filter0_d_411_2107"
        x="0"
        y="0"
        width="82"
        height="57.6957"
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
          result="effect1_dropShadow_411_2107"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_411_2107"
          result="shape"
        />
      </filter>
    </defs>
  </Icon>
);

export default RainWithCloudIcon;
