import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { AiFillStar, AiOutlineEye } from 'react-icons/ai';
import { FiBookmark, FiMapPin, FiSearch } from 'react-icons/fi';

import Logo from '@/components/icons/Logo';
import WeatherCarousel from '@/components/WeatherCarousel';
import { getWeathers } from '@/services/weather';
import mainBackground from '@/static/background/main.png';
import cardBackground from '@/static/card/spot.png';
import mockCard from '@/static/mock/card.png';
import mockFood from '@/static/mock/food.png';

interface HomePageProps {
  weathers: Weather.City[];
}

const HomePage = ({ weathers }: HomePageProps) => (
  <>
    <Flex
      pos="fixed"
      w="full"
      bg="transparent"
      borderColor="transparent"
      my="4"
      px="8"
      justify="flex-end"
    >
      <HStack
        color="text.body"
        divider={
          <Divider orientation="vertical" borderColor="blackAlpha.500" />
        }
        spacing={4}
      >
        <Text variant="subtitle">活動新訓</Text>
        <Text variant="subtitle">景點</Text>
        <Text variant="subtitle">美食</Text>
        <Text variant="subtitle">住宿</Text>
        <Text variant="subtitle">交通</Text>
        <IconButton
          variant="ghost"
          aria-label="search scene"
          fontSize="2xl"
          icon={<FiSearch />}
        />
        <Avatar size="sm" />
      </HStack>
    </Flex>
    <Container h="100vh" centerContent>
      <Box
        pos="absolute"
        top="0"
        left="0"
        right="0"
        h="100vh"
        w="100vw"
        overflow="hidden"
        zIndex="hide"
      >
        <Image
          alt="background"
          src={mainBackground}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Box>
      <Logo my="12" w="284" h="218" />
    </Container>
    <Flex
      flexDir="column"
      justify="center"
      py="14"
      minH="360"
      bgGradient="linear(to-b, brand.5, white)"
    >
      <Container maxW="container.md" textAlign="center">
        <Text variant="subtitle" color="blackAlpha.500">
          台灣許多美景媲美國外，值此五倍券、國旅券及觀光業者加碼優惠盡出之際，旅行台灣就是現在！
          到哪裡旅遊還沒有想法的民眾，歡迎到台灣觀光，體驗「台灣之美」!
        </Text>
      </Container>
      <WeatherCarousel weathers={weathers} />
    </Flex>
    <Flex flexDir="column" bgColor="white">
      <HStack spacing={6} mx="6">
        <Box pos="relative">
          <Box
            right="2"
            top="-2"
            textAlign="center"
            fontWeight="bold"
            fontSize="3xl"
            pos="absolute"
            zIndex="docked"
            bg="white"
            shadow="xl"
            borderColor="blackAlpha.300"
            rounded="md"
            borderWidth="1px"
            py="4"
            sx={{ writingMode: 'vertical-rl' }}
          >
            景點
          </Box>
          <Image src={cardBackground} width={285} height={380} />
        </Box>
      </HStack>
      <Flex
        bg="brand.0"
        px="12"
        py="2"
        my="10"
        justify="space-between"
        align="center"
      >
        <Text variant="headline-2" color="white">
          熱門景點
        </Text>
        <Button
          variant="outline"
          color="white"
          _hover={{ bg: 'white', color: 'brand.0' }}
        >
          查看更多
        </Button>
      </Flex>
      <HStack mx="8">
        <Flex
          pos="relative"
          flexDir="column"
          w="368px"
          h="420px"
          overflow="hidden"
          rounded="2xl"
        >
          <Flex m="4" justify="space-between">
            <HStack
              zIndex="docked"
              fontWeight="bold"
              bg="white"
              px="4"
              py="2"
              rounded="full"
              shadow="lg"
            >
              <Icon as={AiFillStar} color="yellow.300" boxSize="24px" />
              <Text as="span" color="blackAlpha.400">
                4.5
              </Text>
              <Icon as={AiOutlineEye} color="blackAlpha.500" boxSize="24px" />
              <Text as="span" color="blackAlpha.400">
                6 萬
              </Text>
            </HStack>
            <IconButton
              aria-label="save to favorite"
              icon={<FiBookmark />}
              fontSize="xl"
              rounded="full"
              colorScheme="gray"
              zIndex="docked"
              bgColor="white"
            />
          </Flex>
          <Box flexGrow={1} />
          <Flex
            display="flex"
            bgColor="blackAlpha.700"
            p="4"
            color="white"
            justify="space-between"
            roundedBottom="3xl"
            zIndex="docked"
          >
            <Text variant="headline-3">台北101</Text>
            <HStack>
              <Icon as={FiMapPin} boxSize="24px" />
              <Text as="span">台北</Text>
            </HStack>
          </Flex>
          <Box pos="absolute" top="0">
            <Image src={mockCard} width={368} height={420} />
          </Box>
        </Flex>
      </HStack>
      <Flex
        bg="brand.4"
        px="12"
        py="2"
        my="10"
        justify="space-between"
        align="center"
      >
        <Text variant="headline-2" color="white">
          熱門美食
        </Text>
        <Button
          variant="outline"
          color="white"
          _hover={{ bg: 'white', color: 'brand.4' }}
        >
          查看更多
        </Button>
      </Flex>
      <HStack mx="8">
        <Flex
          pos="relative"
          flexDir="column"
          rounded="2xl"
          border="1px"
          borderColor="blackAlpha.600"
        >
          <Flex
            pos="absolute"
            top="0"
            left="0"
            right="0"
            m="4"
            justify="space-between"
            zIndex="docked"
          >
            <HStack
              fontWeight="bold"
              bg="white"
              px="4"
              py="2"
              rounded="full"
              shadow="lg"
            >
              <Icon as={AiFillStar} color="yellow.300" boxSize="24px" />
              <Text as="span" color="blackAlpha.400">
                4.5
              </Text>
              <Icon as={AiOutlineEye} color="blackAlpha.500" boxSize="24px" />
              <Text as="span" color="blackAlpha.400">
                6 萬
              </Text>
            </HStack>
            <IconButton
              aria-label="save to favorite"
              icon={<FiBookmark />}
              fontSize="xl"
              rounded="full"
              colorScheme="gray"
              bgColor="white"
            />
          </Flex>
          <Image src={mockFood} width={400} height={300} />
          <Flex flexDir="column" m="2">
            <Flex justify="space-between">
              <Text variant="headline-2" noOfLines={1}>
                胡切仔麵
              </Text>
              <HStack>
                <Icon as={FiMapPin} boxSize="24px" />
                <Text as="span">南投縣</Text>
              </HStack>
            </Flex>
            <Text fontWeight="bold" color="text.body">
              南投縣545埔里鎮新生路10號
            </Text>
            <Text variant="body" color="text.body">
              營業時間：16:00-22:00
            </Text>
            <Text variant="body" color="text.body">
              電話：04-92994225
            </Text>
          </Flex>
        </Flex>
      </HStack>
    </Flex>
    <Box as="footer">
      <HStack
        px="8"
        pt="20"
        pb="36"
        justify="center"
        bgGradient="linear(to-t, brand.1, white)"
      >
        <VStack>
          <Text variant="headline-3">活動新訊</Text>
          <Text>最新消息</Text>
          <Text>活動異動</Text>
          <Text>熱門話題</Text>
        </VStack>
      </HStack>
      <Flex py="4" bg="brand.2">
        <Logo w="48px" h="48px" ml="8" mr="4" />
        <Box>
          <Text>24小時免付費旅遊諮詢熱線：0800-011765</Text>
          <Text>
            免付費國旅券專線：0800-211734（服務時間：週一至週日8:30~18:30）
          </Text>
        </Box>
      </Flex>
    </Box>
  </>
);

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<HomePageProps>> => {
  const weathers = await getWeathers();

  return {
    props: {
      weathers,
    },
  };
};

export default HomePage;
