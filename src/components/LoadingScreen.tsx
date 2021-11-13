import React from 'react';

import { Center, CenterProps, Spinner, SpinnerProps } from '@chakra-ui/react';

interface LoadingScreenProps extends CenterProps {
  mainColor: SpinnerProps['color'];
}

const LoadingScreen = ({ mainColor, ...props }: LoadingScreenProps) => (
  <Center h="full" w="full" {...props}>
    <Spinner
      speed="0.66s"
      emptyColor="gray.200"
      color={mainColor}
      size="xl"
      thickness="4px"
    />
  </Center>
);

export default LoadingScreen;
