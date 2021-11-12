import React from 'react';

import {
  Avatar,
  Box,
  BoxProps,
  Center,
  Flex,
  IconButton,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BsChevronUp } from 'react-icons/bs';

import Logo from '../icons/Logo';

import CREDITS from '@/constants/credits';

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
        <SimpleGrid
          mx="auto"
          display={['none', 'none', 'grid']}
          justify="center"
          align="start"
          maxW="container.md"
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
      <Flex
        flexDir={['column', 'column', 'row']}
        py="4"
        px={[12, 12, 4]}
        bg={mainColor}
        color="white"
        fontWeight="medium"
        align="center"
      >
        <Logo boxSize={['192px', '252px', '64px']} ml="8" mr="4" />
        <Box>
          <Flex flexDir={['column', 'column', 'row']} my="2">
            <Text>24小時免付費旅遊諮詢熱線：</Text>
            <Text>0800-011765</Text>
          </Flex>
          <Flex flexDir={['column', 'column', 'row']} my="2">
            <Text>免付費國旅券專線：</Text>
            <Text>0800-211734</Text>
            <Text my={[2, 2, 0]}>（服務時間：週一至週日8:30~18:30）</Text>
          </Flex>
        </Box>
      </Flex>
      <Flex flexDir={['column', 'row']} bg={mainColor} px="12" align="center">
        <Text as="h3" fontSize="2xl" color="white">
          Credits
        </Text>
        <Stack direction={['column', 'row']} p="4">
          {CREDITS.map((person) => (
            <Tooltip key={person.name} label={person.type} hasArrow>
              <Tag size="lg" rounded="full" mx="2">
                <Avatar
                  size="sm"
                  src={person.imageUrl}
                  name={person.name}
                  mr="2"
                  my="2"
                />
                <Link href={person.url} isExternal>
                  <TagLabel>{person.name}</TagLabel>
                </Link>
              </Tag>
            </Tooltip>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
