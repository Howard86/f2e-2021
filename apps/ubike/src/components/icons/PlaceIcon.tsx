import { Icon, IconProps } from '@chakra-ui/react';

const PlaceIcon = (props: IconProps) => (
  <Icon fill="currentColor" viewBox="0 0 32 32" {...props}>
    <path
      d="M22.75 13.61C22.75 9.7985 19.7688 7.1 16 7.1C12.2312 7.1 9.25 9.7985 9.25 13.61C9.25 16.067 11.4437 19.322 16 23.207C20.5562 19.322 22.75 16.067 22.75 13.61ZM16 5C20.725 5 25 8.381 25 13.61C25 17.096 21.9963 21.2225 16 26C10.0037 21.2225 7 17.096 7 13.61C7 8.381 11.275 5 16 5Z"
      fill="#FF4B1F"
    />
    <circle cx="16" cy="13" r="2" fill="#FF4B1F" />
  </Icon>
);

export default PlaceIcon;
