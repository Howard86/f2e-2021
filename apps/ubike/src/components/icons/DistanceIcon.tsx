import { Icon, IconProps } from '@chakra-ui/react';

const DistanceIcon = (props: IconProps) => (
  <Icon fill="none" viewBox="0 0 32 32" {...props}>
    <path
      d="M16 11V10C16 7.79086 14.2091 6 12 6V6C9.79086 6 8 7.79086 8 10V11"
      stroke="#FF4B1F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 22L16 23C16 25.2091 17.7909 27 20 27V27C22.2091 27 24 25.2091 24 23L24 22"
      stroke="#FF4B1F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="16" y1="10" x2="16" y2="22" stroke="#FF4B1F" strokeWidth="2" />
    <line
      x1="8"
      y1="15"
      x2="8"
      y2="18"
      stroke="#FF4B1F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="15"
      x2="24"
      y2="18"
      stroke="#FF4B1F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);

export default DistanceIcon;
