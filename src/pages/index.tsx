import React from 'react';

import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Logo from '@/components/icons/Logo';
import PlaceCard from '@/components/PlaceCard';
import SceneCard from '@/components/SceneCard';
import SiteCardGrid from '@/components/SiteCardGrid';
import WeatherCarousel from '@/components/WeatherCarousel';
import { getHotels, getRestaurants, getScenes } from '@/services/tdx';
import { getWeathers } from '@/services/weather';
import mainBackground from '@/static/background/main.png';
import mockCard from '@/static/mock/card.png';
import mockFood from '@/static/mock/food.png';

interface HomePageProps {
  weathers: Weather.City[];
  scenes: TDX.Scene[];
  restaurants: TDX.Restaurant[];
  hotels: TDX.Hotel[];
}

const HomePage = ({ weathers, scenes, restaurants, hotels }: HomePageProps) => (
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
      <SiteCardGrid />
      <Banner title="熱門景點" mainColor="brand.0" href="/scenes" />
      <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            id={scene.id}
            name={scene.name}
            city={scene.city}
            image={scene.image || mockCard}
          />
        ))}
      </SimpleGrid>
      <Banner title="熱門美食" mainColor="brand.2" href="/restaurants" />

      <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
        {restaurants.map((restaurant) => (
          <PlaceCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            city={restaurant.city}
            image={restaurant.image || mockFood}
            address={restaurant.address}
            contactNumber={restaurant.contactNumber}
            openingHours={restaurant.openingHours}
          />
        ))}
      </SimpleGrid>
      <Banner title="住宿推薦" mainColor="brand.4" href="/hotels" />

      <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
        {hotels.map((hotel) => (
          <PlaceCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            city={hotel.city}
            image={hotel.image || mockFood}
            address={hotel.address}
            contactNumber={hotel.contactNumber}
            openingHours={hotel.openingHours}
          />
        ))}
      </SimpleGrid>
    </Flex>
    <Footer />
  </>
);

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<HomePageProps>> => {
  const [weathers, scenes, restaurants, hotels] = await Promise.all([
    getWeathers(),
    getScenes(),
    getRestaurants(),
    getHotels(),
  ]);

  return {
    props: {
      weathers,
      scenes: scenes.slice(0, 6),
      restaurants: restaurants.slice(0, 6),
      hotels: hotels.slice(0, 6),
    },
  };
};

export default HomePage;
