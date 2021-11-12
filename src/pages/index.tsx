import React from 'react';

import { Box, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';

import Banner from '@/components/Banner';
import Logo from '@/components/icons/Logo';
import Layout from '@/components/layout/Layout';
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

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const HomePage = ({ weathers, scenes, restaurants, hotels }: HomePageProps) => (
  <>
    <Container h="100vh" maxH={[400, 700]} centerContent>
      <Box
        pos="absolute"
        top="0"
        left="0"
        right="0"
        bg="scenes.light"
        h="inherit"
        maxH="inherit"
        overflow="hidden"
        zIndex="hide"
      >
        <Image
          alt="首頁背景"
          src={mainBackground}
          layout="fill"
          objectFit="cover"
          objectPosition="50% bottom"
          quality={100}
        />
      </Box>
      <Logo
        color="whiteAlpha.700"
        my={[8, 12]}
        w="30%"
        h="auto"
        maxW="152"
        maxH="117"
      />
    </Container>
    <Flex
      flexDir="column"
      justify="center"
      py="14"
      minH="360"
      bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
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
      <Banner
        title="熱門景點"
        mainColor={PAGE_PROPS.mainColor}
        href="/scenes"
      />
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
      <Banner
        title="熱門美食"
        mainColor="restaurants.main"
        href="/restaurants"
      />

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
      <Banner title="住宿推薦" mainColor="hotels.main" href="/hotels" />

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

HomePage.Layout = Layout;
HomePage.layoutProps = PAGE_PROPS;

export default HomePage;
