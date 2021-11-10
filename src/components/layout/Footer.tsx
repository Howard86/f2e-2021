import React from 'react';

import {
  Box,
  BoxProps,
  Flex,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import Logo from '../icons/Logo';

type FooterConfig = {
  headline: string;
  links: Array<{
    name: string;
    // TODO: add href when available
    // href: string
  }>;
};

const footerConfig: FooterConfig[] = [
  {
    headline: '活動新訊',
    links: [{ name: '最新消息' }, { name: '活動異動' }, { name: '熱門話題' }],
  },
  {
    headline: '景點',
    links: [{ name: '熱門景點' }, { name: '網紅攻略' }, { name: '主題景點' }],
  },
  {
    headline: '美食',
    links: [
      { name: '台灣文化' },
      { name: '台灣小吃' },
      { name: '台灣在地特色' },
      { name: '熱門美食' },
      { name: '網紅必推美食' },
    ],
  },
  {
    headline: '住宿',
    links: [
      { name: '觀光旅館' },
      { name: '旅館' },
      { name: '民宿' },
      { name: '住宿推薦' },
    ],
  },
  {
    headline: '交通',
    links: [{ name: '陸運資訊 ' }, { name: '高速公路' }, { name: '交通租賃' }],
  },
];

const Footer = (props: BoxProps) => (
  <Box as="footer" {...props}>
    <Box px="8" pt="20" pb="36" bgGradient="linear(to-t, brand.1, white)">
      <SimpleGrid
        mx="auto"
        justify="center"
        align="start"
        maxW="container.lg"
        columns={footerConfig.length}
      >
        {footerConfig.map((config) => (
          <Box key={config.headline}>
            <Text variant="headline-3" fontSize="lg">
              {config.headline}
            </Text>
            <List spacing={1}>
              {config.links.map((link) => (
                <ListItem key={link.name}>
                  <Link href="#">{link.name}</Link>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
    <Flex py="4" bg="brand.2" align="center">
      <Logo color="white" w="48px" h="48px" ml="8" mr="4" />
      <Box>
        <Text>24小時免付費旅遊諮詢熱線：0800-011765</Text>
        <Text>
          免付費國旅券專線：0800-211734（服務時間：週一至週日8:30~18:30）
        </Text>
      </Box>
    </Flex>
  </Box>
);

export default Footer;
