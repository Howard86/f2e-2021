import { Icon, IconProps } from '@chakra-ui/react';

const DockIcon = (props: IconProps) => (
  <Icon fill="currentColor" viewBox="0 0 32 32" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.6143 23H23C23.5523 23 24 23.4477 24 24C24 24.5523 23.5523 25 23 25H8C7.44772 25 7 24.5523 7 24C7 23.4477 7.44772 23 8 23H10.5972L14.7511 8.89809C15.3251 6.94933 17.7359 6.26657 19.2466 7.62495C19.8586 8.17527 20.1932 8.96989 20.1593 9.79223L19.6143 23ZM17.6126 23L18.161 9.70978C18.1703 9.48301 18.078 9.26388 17.9093 9.11212C17.4927 8.73752 16.8279 8.92581 16.6696 9.46321L12.6822 23H17.6126Z"
    />
  </Icon>
);

export default DockIcon;
