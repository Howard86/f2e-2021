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
import { City, CityMap, CitySet } from '@f2e/tdx';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type { ParsedUrlQuery } from 'querystring';
import { BiChevronRight } from 'react-icons/bi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import PlaceCard, { PlaceCardProps } from '@/components/PlaceCard';
import RouteLink from '@/components/RouteLink';
import SceneCard, { SceneCardProps } from '@/components/SceneCard';
import {
  DEFAULT_CARD_NUMBER,
  DEFAULT_FETCHED_CARD_NUMBER,
} from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import {
  mapActivityToPlaceCard,
  mapHotelToPlaceCard,
  mapRestaurantToPlaceCard,
  mapScenicSpotToSceneCard,
  tourismService,
} from '@/services/tdx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

interface CityPageProps {
  city: City;
  scenes: SceneCardProps[];
  restaurants: PlaceCardProps[];
  hotels: PlaceCardProps[];
  activities: PlaceCardProps[];
}

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
      <NextHeadSeo title={`台灣旅遊導覽網 | ${city}`} />
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
            <RouteLink href={`/cities/${city}`} as={BreadcrumbLink}>
              {CityMap[city]}
            </RouteLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h1" textAlign="center" mb="4">
          {CityMap[city]}
        </Heading>
        {activities.length > 0 && (
          <>
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
                  <PlaceCard key={activity.href} {...activity} />
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
          </>
        )}
        {scenes.length > 0 && (
          <>
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
                  <SceneCard key={scene.href} {...scene} />
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
          </>
        )}
        {restaurants.length > 0 && (
          <>
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
                  <PlaceCard key={restaurant.href} {...restaurant} />
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
          </>
        )}
        {hotels.length > 0 && (
          <>
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
                  <PlaceCard key={hotel.href} {...hotel} />
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
          </>
        )}
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
  const city = context.params.city as City;

  if (typeof city !== 'string' || !CitySet.has(city)) return { notFound: true };

  try {
    const [scenes, restaurants, hotels, activities] = await Promise.all([
      tourismService.getScenicSpotsByCity(city, {
        top: DEFAULT_FETCHED_CARD_NUMBER,
        select: 'ScenicSpotID,ScenicSpotName,City,Picture',
        filter: 'Picture/PictureUrl1 ne null',
        orderBy: 'SrcUpdateTime desc, TicketInfo desc',
      }),
      tourismService.getRestaurantsByCity(city, {
        top: DEFAULT_FETCHED_CARD_NUMBER,
        select:
          'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
        filter: 'Picture/PictureUrl1 ne null and Address ne null',
        orderBy: 'SrcUpdateTime desc, Description desc',
      }),
      tourismService.getHotelsByCity(city, {
        top: DEFAULT_FETCHED_CARD_NUMBER,
        select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
        filter: 'Picture/PictureUrl1 ne null and Address ne null',
        orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
      }),
      tourismService.getActivitiesByCity(city, {
        top: DEFAULT_FETCHED_CARD_NUMBER,
        select:
          'ActivityID,ActivityName,City,Address,StartTime,EndTime,Phone,Picture',
        filter: 'Picture/PictureUrl1 ne null and Address ne null',
        orderBy: 'StartTime desc',
      }),
    ]);

    return {
      props: {
        city,
        scenes: scenes.map(mapScenicSpotToSceneCard),
        restaurants: restaurants.map(mapRestaurantToPlaceCard),
        hotels: hotels.map(mapHotelToPlaceCard),
        activities: activities.map(mapActivityToPlaceCard),
      },
      revalidate: SIX_HOURS_IN_SECONDS,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default CategoryPage;
