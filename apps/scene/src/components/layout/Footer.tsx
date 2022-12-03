import React from 'react';

import {
  Box,
  BoxProps,
  Center,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { BsChevronUp } from 'react-icons/bs';

import Logo from '../icons/Logo';

interface FooterProps extends BoxProps {
  mainColor: BoxProps['color'];
  gradientColor: BoxProps['color'];
}

const Footer = ({ mainColor, gradientColor, ...props }: FooterProps) => {
  const onClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Box as="footer" {...props}>
      <Box
        px="8"
        pt={[12, 20]}
        pb={[20, 36]}
        bgGradient={`linear(to-t, ${gradientColor}, white)`}
      >
        <Center display={['flex', 'flex', 'none']} textAlign="center">
          <IconButton
            color="white"
            aria-label="scroll to top"
            size="lg"
            bgColor={mainColor}
            _hover={{
              bgColor: gradientColor,
            }}
            fontSize="2xl"
            p="3"
            rounded="full"
            icon={<BsChevronUp />}
            onClick={onClick}
          />
        </Center>
      </Box>
      <Flex
        flexDir={['column', 'column', 'row']}
        py="4"
        px={[12, 12, 4]}
        bg={mainColor}
        color="white"
        fontWeight="medium"
        align="center"
      >
        <Logo boxSize={['192px', '252px', '128px']} ml="8" mr="4" />
        <Box>
          <Flex flexDir={['column', 'column', 'row']} my="2">
            <Text>24小時免付費旅遊諮詢熱線：</Text>
            <Text>0800-011765</Text>
          </Flex>
          <Flex flexDir={['column', 'column', 'row']} my="2">
            <Text>免付費國旅券專線：</Text>
            <Text>0800-211734</Text>
          </Flex>
          <Flex flexDir={['column', 'column', 'row']} my="2">
            <Text>服務時間：</Text>
            <Text>週一至週日8:30~18:30</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
