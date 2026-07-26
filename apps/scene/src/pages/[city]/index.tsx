import type { ParsedUrlQuery } from 'node:querystring';
import {
  Breadcrumb,
  Center,
  Flex,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { type City, CityMap, CitySet } from '@f2e/tdx';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type React from 'react';
import { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';

import Background from '@/components/background';
import Banner from '@/components/banner';
import Layout from '@/components/layout/layout';
import LoadingScreen from '@/components/loading-screen';
import Pagination from '@/components/pagination';
import PlaceCard, { type PlaceCardProps } from '@/components/place-card';
import RouteLink from '@/components/route-link';
import SceneCard, { type SceneCardProps } from '@/components/scene-card';
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
  activities: PlaceCardProps[];
  city: City;
  hotels: PlaceCardProps[];
  restaurants: PlaceCardProps[];
  scenes: SceneCardProps[];
}

const PAGE_PROPS = { gradientColor: 'scenes.light', mainColor: 'scenes.main' };

const CategoryPage = ({
  city,
  scenes,
  restaurants,
  hotels,
  activities,
}: CityPageProps): React.ReactElement => {
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
        bgColor={PAGE_PROPS.gradientColor}
        image={background}
        name="景點"
        wordOne={wordOne}
        wordOneAlt="景"
        wordTwo={wordTwo}
        wordTwoAlt="點"
      >
        {/* TODO: add BackgroundCard */}
        <Flex align="center" mt="8" />
      </Background>

      <Flex bg="white" flexDir="column">
        <Breadcrumb.Root color="blackAlpha.700" m="4">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <RouteLink as={Breadcrumb.Link} href="/">
                景點
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item fontWeight="bold">
              <RouteLink
                aria-current="page"
                as={Breadcrumb.Link}
                href={`/${city}`}
              >
                {CityMap[city]}
              </RouteLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <Heading as="h1" mb="4" textAlign="center">
          {CityMap[city]}
        </Heading>
        {activities.length > 0 && (
          <>
            <Banner
              hideButton
              href="/scenes"
              mainColor="activities.main"
              title="最新活動"
            />
            <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
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
                onPageChange={setActivityPage}
                page={activityPage}
                total={Math.ceil(activities.length / DEFAULT_CARD_NUMBER)}
              />
            </Center>
          </>
        )}
        {scenes.length > 0 && (
          <>
            <Banner
              hideButton
              href="/scenes"
              mainColor="scenes.main"
              title="熱門景點"
            />
            <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
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
                onPageChange={setScenePage}
                page={scenePage}
                total={Math.ceil(scenes.length / DEFAULT_CARD_NUMBER)}
              />
            </Center>
          </>
        )}
        {restaurants.length > 0 && (
          <>
            <Banner
              hideButton
              href="/scenes"
              mainColor="restaurants.main"
              title="熱門美食"
            />
            <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
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
                onPageChange={setRestaurantPage}
                page={restaurantPage}
                total={Math.ceil(restaurants.length / DEFAULT_CARD_NUMBER)}
              />
            </Center>
          </>
        )}
        {hotels.length > 0 && (
          <>
            <Banner
              hideButton
              href="/scenes"
              mainColor="hotels.main"
              title="住宿推薦"
            />
            <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
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
                onPageChange={setHotelPage}
                page={hotelPage}
                total={Math.ceil(hotels.length / DEFAULT_CARD_NUMBER)}
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

  if (typeof city !== 'string' || !CitySet.has(city)) {
    return { notFound: true };
  }

  try {
    const [scenes, restaurants, hotels, activities] = await Promise.all([
      tourismService.getScenicSpotsByCity(city, {
        filter: 'Picture/PictureUrl1 ne null',
        orderBy: 'SrcUpdateTime desc, TicketInfo desc',
        select: 'ScenicSpotID,ScenicSpotName,City,Picture',
        top: DEFAULT_FETCHED_CARD_NUMBER,
      }),
      tourismService.getRestaurantsByCity(city, {
        filter: 'Picture/PictureUrl1 ne null and Address ne null',
        orderBy: 'SrcUpdateTime desc, Description desc',
        select:
          'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
        top: DEFAULT_FETCHED_CARD_NUMBER,
      }),
      tourismService.getHotelsByCity(city, {
        filter: 'Picture/PictureUrl1 ne null and Address ne null',
        orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
        select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
        top: DEFAULT_FETCHED_CARD_NUMBER,
      }),
      tourismService.getActivitiesByCity(city, {
        filter: 'Picture/PictureUrl1 ne null and Address ne null',
        orderBy: 'StartTime desc',
        select:
          'ActivityID,ActivityName,City,Address,StartTime,EndTime,Phone,Picture',
        top: DEFAULT_FETCHED_CARD_NUMBER,
      }),
    ]);

    return {
      props: {
        activities: activities.map(mapActivityToPlaceCard),
        city,
        hotels: hotels.map(mapHotelToPlaceCard),
        restaurants: restaurants.map(mapRestaurantToPlaceCard),
        scenes: scenes.map(mapScenicSpotToSceneCard),
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
