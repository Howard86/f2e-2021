import React from 'react';

import { Icon, IconProps } from '@chakra-ui/react';

const CloudIcon = (props: IconProps) => (
  <Icon viewBox="0 0 79 56" {...props}>
    <g filter="url(#filter0_d_411_2114)">
      <path
        d="M51.7397 48C56.063 48.0036 60.3016 46.7619 63.979 44.4145C67.6564 42.0671 70.6269 38.7071 72.5565 34.7121C74.4861 30.7171 75.2984 26.2455 74.9021 21.7999C74.5058 17.3544 72.9166 13.1111 70.3131 9.54701C67.7096 5.98294 64.195 3.23938 60.1643 1.62472C56.1337 0.0100696 51.7469 -0.411677 47.4969 0.406892C43.2469 1.22546 39.3023 3.2519 36.1063 6.25842C32.9104 9.26494 30.5899 13.1324 29.4057 17.426C27.3093 15.941 24.9043 14.9854 22.3847 14.6363C19.865 14.2872 17.3012 14.5543 14.8998 15.4161C12.4985 16.2779 10.3268 17.7103 8.55992 19.5977C6.79301 21.4852 5.48028 23.775 4.72757 26.2825C3.97486 28.79 3.80322 31.445 4.22649 34.0336C4.64976 36.6221 5.65609 39.0718 7.16437 41.185C8.67265 43.2983 10.6407 45.016 12.9098 46.1998C15.1789 47.3835 17.6856 48.0002 20.2278 48H51.7397Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_411_2114"
        x="0"
        y="0"
        width="79"
        height="56"
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
          result="effect1_dropShadow_411_2114"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_411_2114"
          result="shape"
        />
      </filter>
    </defs>
  </Icon>
);

export default CloudIcon;
