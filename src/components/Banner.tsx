import React from 'react';

import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface BannerProps extends FlexProps {
  title: string;
  href: string;
  mainColor: FlexProps['color'];
  hideButton?: boolean;
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
      bg={mainColor}
      px={[6, 8, 12]}
      py="2"
      my="10"
      justify="space-between"
      align="center"
      {...props}
    >
      <Text as="h2" variant="headline-2" color="white">
        {title}
      </Text>
      {!hideButton && (
        <Button
          variant="outline"
          color="white"
          borderWidth="3px"
          rounded="xl"
          onClick={onClick}
          _hover={{ bg: 'white', color: mainColor }}
        >
          查看更多
        </Button>
      )}
    </Flex>
  );
};

export default Banner;
