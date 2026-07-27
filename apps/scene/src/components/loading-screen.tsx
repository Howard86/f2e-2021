import {
  Center,
  type CenterProps,
  Spinner,
  type SpinnerProps,
} from '@chakra-ui/react';

interface LoadingScreenProps extends CenterProps {
  mainColor: SpinnerProps['color'];
}

const LoadingScreen = ({ mainColor, ...props }: LoadingScreenProps) => (
  <Center h="full" w="full" {...props}>
    <Spinner
      animationDuration="0.66s"
      borderBottomColor="gray.200"
      borderInlineStartColor="gray.200"
      borderWidth="4px"
      color={mainColor}
      size="xl"
    />
  </Center>
);

export default LoadingScreen;
