import { Button, Flex, type FlexProps, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface BannerProps extends FlexProps {
  hideButton?: boolean;
  href: string;
  mainColor: FlexProps['color'];
  title: string;
}

// TODO: refactor usage of hideButton
const Banner = ({
  title,
  href,
  mainColor,
  hideButton,
  ...props
}: BannerProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <Flex
      align="center"
      bg={mainColor}
      justify="space-between"
      my="10"
      px={[6, 8, 12]}
      py="2"
      {...props}
    >
      <Text as="h2" color="white" textStyle="headline-2">
        {title}
      </Text>
      {!hideButton && (
        <Button
          _hover={{ bg: 'white', color: mainColor }}
          borderWidth="3px"
          color="white"
          onClick={onClick}
          rounded="xl"
          variant="outline"
        >
          查看更多
        </Button>
      )}
    </Flex>
  );
};

export default Banner;
