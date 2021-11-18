import { Icon, IconProps } from '@chakra-ui/react';

const BikeIcon = (props: IconProps) => (
  <Icon fill="currentColor" viewBox="0 0 32 32" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.3109 14.0673H10.1694L12.2174 9.08673H14.8289C15.402 9.08673 15.8666 8.62217 15.8666 8.0491C15.8666 7.47604 15.402 7.01148 14.8289 7.01148H11.7161C11.7053 7.01148 11.6945 7.01164 11.6838 7.01197C11.2212 6.94083 10.753 7.19134 10.5671 7.64328L7.88539 14.165C5.10631 14.6736 3.00002 17.1077 3.00002 20.0337C3.00002 23.3288 5.67124 26 8.96636 26C12.2615 26 14.9327 23.3288 14.9327 20.0337C14.9327 18.5469 14.3889 17.1872 13.4894 16.1426H19.2814C18.3818 17.1872 17.838 18.5469 17.838 20.0337C17.838 23.3288 20.5093 26 23.8044 26C27.0995 26 29.7707 23.3288 29.7707 20.0337C29.7707 16.7385 27.0995 14.0673 23.8044 14.0673C23.72 14.0673 23.6361 14.0691 23.5526 14.0725L24.2933 12.2711C24.3526 12.1269 24.3771 11.977 24.3705 11.8309H25.3089C25.882 11.8309 26.3466 11.3663 26.3466 10.7933C26.3466 10.2202 25.882 9.75563 25.3089 9.75563H21.1584C20.5854 9.75563 20.1208 10.2202 20.1208 10.7933C20.1208 11.3663 20.5854 11.8309 21.1584 11.8309H22.2305L21.3109 14.0673ZM8.96636 23.9248C11.1153 23.9248 12.8574 22.1827 12.8574 20.0337C12.8574 17.8847 11.1153 16.1426 8.96636 16.1426C6.81736 16.1426 5.07526 17.8847 5.07526 20.0337C5.07526 22.1827 6.81736 23.9248 8.96636 23.9248ZM23.8044 23.9248C25.9534 23.9248 27.6955 22.1827 27.6955 20.0337C27.6955 17.8847 25.9534 16.1426 23.8044 16.1426C21.6554 16.1426 19.9133 17.8847 19.9133 20.0337C19.9133 22.1827 21.6554 23.9248 23.8044 23.9248Z"
    />
  </Icon>
);

export default BikeIcon;