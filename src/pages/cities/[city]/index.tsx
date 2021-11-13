import React, { useState } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { BiChevronRight } from 'react-icons/bi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import PlaceCard from '@/components/PlaceCard';
import RouteLink from '@/components/RouteLink';
import SceneCard from '@/components/SceneCard';
import { CITIES, CityMap, CitySlugMap } from '@/constants/category';
import {
  getActivityCardsByCity,
  getHotelCardsByCity,
  getRestaurantCardsByCity,
  getSceneCardsByCity,
} from '@/services/ptx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

interface CityPageProps {
  city: PTX.City;
  scenes: PTX.SceneCard[];
  restaurants: PTX.RestaurantCard[];
  hotels: PTX.HotelCard[];
  activities: PTX.ActivityCard[];
}

const DEFAULT_CARD_NUMBER = 6;
const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const CategoryPage = ({
  city,
  scenes,
  restaurants,
  hotels,
  activities,
}: CityPageProps): JSX.Element => {
  const router = useRouter();

  const [scenePage, setScenePage] = useState(0);
  const [restaurantPage, setRestaurantPage] = useState(0);
  const [hotelPage, setHotelPage] = useState(0);
  const [activityPage, setActivityPage] = useState(0);

  if (router.isFallback) {
    return <LoadingScreen mainColor={PAGE_PROPS.mainColor} minH="400px" />;
  }

  return (
    <>
      <Background
        name="景點"
        image={background}
        wordOneAlt="景"
        wordOne={wordOne}
        wordTwoAlt="點"
        wordTwo={wordTwo}
        bgColor={PAGE_PROPS.gradientColor}
      >
        {/* TODO: add BackgroundCard */}
        <Flex align="center" mt="8" />
      </Background>

      <Flex flexDir="column" bg="white">
        <Breadcrumb
          m="4"
          color="blackAlpha.700"
          separator={<Icon as={BiChevronRight} />}
        >
          <BreadcrumbItem>
            <RouteLink href="/" as={BreadcrumbLink}>
              景點
            </RouteLink>
          </BreadcrumbItem>
          {/* TODO: add custom utils */}
          {/* <BreadcrumbItem>
            <RouteLink href="#" as={BreadcrumbLink}>
              北部地區
            </RouteLink>
          </BreadcrumbItem> */}
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink href={`/cities/${CityMap[city]}`} as={BreadcrumbLink}>
              {city}
            </RouteLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h1" textAlign="center" mb="4">
          {city}
        </Heading>
        <Banner
          title="熱門景點"
          mainColor="scenes.main"
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {scenes
            .slice(
              scenePage * DEFAULT_CARD_NUMBER,
              scenePage * DEFAULT_CARD_NUMBER + DEFAULT_CARD_NUMBER,
            )
            .map((scene) => (
              <SceneCard
                key={scene.ID}
                id={scene.ID}
                name={scene.Name}
                city={scene.City}
                image={scene.Picture.PictureUrl1}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            colorTheme="scenes"
            page={scenePage}
            total={Math.ceil(scenes.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setScenePage}
          />
        </Center>
        <Banner
          title="最新活動"
          mainColor="activities.main"
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {activities
            .slice(
              DEFAULT_CARD_NUMBER * activityPage,
              DEFAULT_CARD_NUMBER * activityPage + DEFAULT_CARD_NUMBER,
            )
            .map((activity) => (
              <PlaceCard
                key={activity.ID}
                id={activity.ID}
                name={activity.Name}
                city={activity.City}
                image={activity.Picture.PictureUrl1}
                address={activity.Address}
                contactNumber={activity.Phone}
                href={`/cities/${CityMap[activity.City]}/activity/${
                  activity.ID
                }`}
                openingHours={
                  activity.StartTime &&
                  activity.EndTime &&
                  `${new Date(
                    activity.StartTime,
                  ).toLocaleDateString()}~${new Date(
                    activity.EndTime,
                  ).toLocaleDateString()}`
                }
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            colorTheme="activities"
            page={activityPage}
            total={Math.ceil(activities.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setActivityPage}
          />
        </Center>
        <Banner
          title="熱門美食"
          mainColor="restaurants.main"
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {restaurants
            .slice(
              DEFAULT_CARD_NUMBER * restaurantPage,
              DEFAULT_CARD_NUMBER * restaurantPage + DEFAULT_CARD_NUMBER,
            )
            .map((restaurant) => (
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
        <Center mt="8">
          <Pagination
            colorTheme="restaurants"
            page={restaurantPage}
            total={Math.ceil(restaurants.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setRestaurantPage}
          />
        </Center>
        <Banner
          title="住宿推薦"
          mainColor="hotels.main"
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {hotels
            .slice(
              DEFAULT_CARD_NUMBER * hotelPage,
              DEFAULT_CARD_NUMBER * hotelPage + DEFAULT_CARD_NUMBER,
            )
            .map((hotel) => (
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
        <Center mt="8">
          <Pagination
            colorTheme="hotels"
            page={hotelPage}
            total={Math.ceil(hotels.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setHotelPage}
          />
        </Center>
      </Flex>
    </>
  );
};

CategoryPage.Layout = Layout;
CategoryPage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<CityPageProps>> => {
  if (typeof context.params.city !== 'string') {
    return { notFound: true };
  }

  const citySlug = context.params.city as PTX.CitySlug;
  if (citySlug !== citySlug.toLowerCase()) {
    return {
      redirect: {
        destination: `/cities/${citySlug.toLowerCase()}`,
        permanent: true,
      },
    };
  }

  const city = CitySlugMap[citySlug];

  if (!CITIES.includes(city)) {
    return {
      notFound: true,
    };
  }

  try {
    const [scenes, restaurants, hotels, activities] = await Promise.all([
      getSceneCardsByCity(city, 30),
      getRestaurantCardsByCity(city, 30),
      getHotelCardsByCity(city, 30),
      getActivityCardsByCity(city, 30),
    ]);

    return {
      props: { city, scenes, restaurants, hotels, activities },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default CategoryPage;
