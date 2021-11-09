import React from 'react';

import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface BannerProps extends FlexProps {
  title: string;
  href: string;
  mainColor: FlexProps['color'];
}

const Banner = ({ title, href, mainColor, ...props }: BannerProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <Flex
      bg={mainColor}
      px="12"
      py="2"
      my="10"
      justify="space-between"
      align="center"
      {...props}
    >
      <Text variant="headline-2" color="white">
        {title}
      </Text>
      <Button
        variant="outline"
        color="white"
        onClick={onClick}
        _hover={{ bg: 'white', color: mainColor }}
      >
        查看更多
      </Button>
    </Flex>
  );
};

export default Banner;
