import { Icon, type IconProps } from '@chakra-ui/react';

const DistanceIcon = (props: IconProps) => (
  <Icon fill="none" viewBox="0 0 32 32" {...props}>
    <path
      d="M16 11V10C16 7.79086 14.2091 6 12 6V6C9.79086 6 8 7.79086 8 10V11"
      stroke="#FF4B1F"
      strokeLinecap="round"
      strokeWidth="2"
    />
    <path
      d="M16 22L16 23C16 25.2091 17.7909 27 20 27V27C22.2091 27 24 25.2091 24 23L24 22"
      stroke="#FF4B1F"
      strokeLinecap="round"
      strokeWidth="2"
    />
    <line stroke="#FF4B1F" strokeWidth="2" x1="16" x2="16" y1="10" y2="22" />
    <line
      stroke="#FF4B1F"
      strokeLinecap="round"
      strokeWidth="2"
      x1="8"
      x2="8"
      y1="15"
      y2="18"
    />
    <line
      stroke="#FF4B1F"
      strokeLinecap="round"
      strokeWidth="2"
      x1="24"
      x2="24"
      y1="15"
      y2="18"
    />
  </Icon>
);

export default DistanceIcon;
