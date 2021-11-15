import React from 'react';

import { Box, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import NextHeadSeo from 'next-head-seo';

import Banner from '@/components/Banner';
import Logo from '@/components/icons/Logo';
import Layout from '@/components/layout/Layout';
import PlaceCard from '@/components/PlaceCard';
import SceneCard from '@/components/SceneCard';
import SiteCardGrid from '@/components/SiteCardGrid';
import WeatherCarousel from '@/components/WeatherCarousel';
import { CityMap } from '@/constants/category';
import { DEFAULT_FETCHED_REMARK_NUMBER } from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import {
  getHotelCards,
  getRestaurantCards,
  getSceneCards,
} from '@/services/ptx';
import getWeathers from '@/services/weather';
import mainBackground from '@/static/background/main.png';

interface HomePageProps {
  weathers: OpenData.CityWeather[];
  scenes: PTX.SceneCard[];
  restaurants: PTX.RestaurantCard[];
  hotels: PTX.HotelCard[];
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const HomePage = ({ weathers, scenes, restaurants, hotels }: HomePageProps) => (
  <>
    <NextHeadSeo
      og={{
        image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/background/main.png`,
      }}
    />
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
      <Container maxW="container.md" textAlign="center" px="0">
        <Text mx="8" variant="subtitle" color="blackAlpha.500">
          台灣許多美景媲美國外，值此五倍券、國旅券及觀光業者加碼優惠盡出之際，旅行台灣就是現在！
          到哪裡旅遊還沒有想法的民眾，歡迎到台灣觀光，體驗「台灣之美」!
        </Text>
        <WeatherCarousel weathers={weathers} />
      </Container>
    </Flex>
    <Flex flexDir="column" bgColor="white">
      <SiteCardGrid maxW="container.lg" mx="auto" />
      <Banner
        title="熱門景點"
        mainColor={PAGE_PROPS.mainColor}
        href="/scenes"
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
        {scenes.map((scene) => (
          <SceneCard
            key={scene.ID}
            id={scene.ID}
            name={scene.Name}
            city={scene.City}
            image={scene.Picture?.PictureUrl1}
          />
        ))}
      </SimpleGrid>
      <Banner
        title="熱門美食"
        mainColor="restaurants.main"
        href="/restaurants"
      />

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
        {restaurants.map((restaurant) => (
          <PlaceCard
            key={restaurant.ID}
            id={restaurant.ID}
            name={restaurant.Name}
            city={restaurant.City}
            image={restaurant.Picture.PictureUrl1}
            address={restaurant.Address}
            contactNumber={restaurant.Phone}
            openingHours={restaurant.OpenTime}
            href={`/cities/${CityMap[restaurant.City]}/restaurant/${
              restaurant.ID
            }`}
          />
        ))}
      </SimpleGrid>
      <Banner title="住宿推薦" mainColor="hotels.main" href="/hotels" />

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
        {hotels.map((hotel) => (
          <PlaceCard
            key={hotel.ID}
            id={hotel.ID}
            name={hotel.Name}
            city={hotel.City}
            image={hotel.Picture.PictureUrl1}
            address={hotel.Address}
            contactNumber={hotel.Phone}
            serviceInfo={hotel.ServiceInfo}
            href={`/cities/${CityMap[hotel.City]}/hotel/${hotel.ID}`}
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
    getSceneCards(DEFAULT_FETCHED_REMARK_NUMBER),
    getRestaurantCards(DEFAULT_FETCHED_REMARK_NUMBER),
    getHotelCards(DEFAULT_FETCHED_REMARK_NUMBER),
  ]);

  return {
    props: {
      weathers,
      scenes,
      restaurants,
      hotels,
    },
    revalidate: SIX_HOURS_IN_SECONDS,
  };
};

HomePage.Layout = Layout;
HomePage.layoutProps = PAGE_PROPS;

export default HomePage;
