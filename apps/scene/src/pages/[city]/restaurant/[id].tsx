import React from 'react';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { City, CityMap, CitySet, Restaurant } from '@f2e/tdx';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type { ParsedUrlQuery } from 'querystring';
import { BiChevronRight, BiLinkExternal, BiSync } from 'react-icons/bi';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { FiClock, FiMapPin, FiPhoneIncoming } from 'react-icons/fi';
import { MdPhotoAlbum } from 'react-icons/md';

import GoogleMap from '@/components/GoogleMap';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import RouteLink from '@/components/RouteLink';
import SceneDetailBox from '@/components/SceneDetailText';
import { ONE_DAY_IN_SECONDS } from '@/constants/time';
import { tourismService } from '@/services/tdx';

interface RestaurantPageProps {
  restaurant: Restaurant;
}

const getGoogleMapURL = (lat?: number, lng?: number) =>
  lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    : undefined;
const PAGE_PROPS = {
  mainColor: 'restaurants.main',
  gradientColor: 'restaurants.light',
};

const RestaurantPage = ({ restaurant }: RestaurantPageProps): JSX.Element => {
  const router = useRouter();

  // TODO: add saved info
  const saved = false;

  if (router.isFallback) {
    return <LoadingScreen minH="400px" mainColor={PAGE_PROPS.mainColor} />;
  }

  return (
    <>
      <NextHeadSeo
        title={`台灣旅遊導覽網 | ${restaurant.RestaurantName}`}
        description={restaurant.Description}
        og={{
          title: restaurant.RestaurantName,
          description: restaurant.Picture.PictureDescription1,
          image: restaurant.Picture.PictureUrl1,
        }}
      />
      <Flex
        flexDir="column"
        pt="16"
        bgGradient="linear(to-b, restaurants.light, white)"
      >
        <Breadcrumb
          mx="8"
          color="blackAlpha.700"
          separator={<Icon as={BiChevronRight} />}
        >
          <BreadcrumbItem>
            <RouteLink href="/restaurants" as={BreadcrumbLink}>
              美食
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouteLink
              href={`/${CityMap[restaurant.City]}`}
              as={BreadcrumbLink}
            >
              {restaurant.City}
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink
              href={`/${CityMap[restaurant.City]}/restaurant/${
                restaurant.RestaurantID
              }`}
              as={BreadcrumbLink}
            >
              {restaurant.RestaurantName}
            </RouteLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex flexDir={{ base: 'column', lg: 'row' }} m={[4, 8]}>
          <Box pos="relative" flexGrow={1} flexShrink={1} m="2">
            <IconButton
              top="0"
              right="0"
              m="4"
              aria-label="save to favorite"
              pos="absolute"
              size="lg"
              rounded="full"
              icon={saved ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
              color={saved ? 'red.600' : 'blackAlpha.600'}
            />
            <Image
              alt={
                restaurant.Picture?.PictureDescription1 ||
                restaurant.RestaurantName
              }
              src={restaurant.Picture?.PictureUrl1}
              align="center"
              fit="cover"
              loading="lazy"
              fallbackSrc="/static/fallback-lg.jpg"
              width={[600, 900]}
              height={[400, 600]}
            />
          </Box>
          <Box flexGrow={1} flexShrink={3} lineHeight="7" sx={{ p: { my: 2 } }}>
            <Heading textAlign="center" mb="4">
              {restaurant.RestaurantName}
            </Heading>
            {restaurant.Description && (
              <Text noOfLines={10}>{restaurant.Description}</Text>
            )}
            {restaurant.ParkingInfo && (
              <Text noOfLines={10}>{restaurant.ParkingInfo}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <SimpleGrid columns={[1, 1, 2]} gap={[4, 8]} mx="8">
          <Box>
            <Heading>餐廳資訊</Heading>
            <VStack align="flex-start" textAlign="start" mt="8" spacing={4}>
              <SceneDetailBox
                label="地址"
                info={
                  restaurant.Address ||
                  (restaurant.Position?.PositionLat &&
                    restaurant.Position?.PositionLon &&
                    '查看地圖')
                }
                href={
                  restaurant.MapUrl ||
                  getGoogleMapURL(
                    restaurant.Position?.PositionLat,
                    restaurant.Position?.PositionLon,
                  )
                }
                icon={FiMapPin}
              />
              <SceneDetailBox
                label="電話"
                info={restaurant.Phone}
                icon={FiPhoneIncoming}
                href={`tel:${restaurant.Phone}`}
              />
              <SceneDetailBox
                label="開放時間"
                info={restaurant.OpenTime}
                icon={FiClock}
              />
              <SceneDetailBox
                label="相關鏈結"
                info={restaurant.WebsiteUrl && '官網'}
                href={restaurant.WebsiteUrl}
                icon={BiLinkExternal}
              />
              <SceneDetailBox
                label="分類"
                info={restaurant.Class}
                icon={MdPhotoAlbum}
              />
              <SceneDetailBox
                label="更新時間"
                info={
                  restaurant.SrcUpdateTime &&
                  new Date(restaurant.SrcUpdateTime).toLocaleDateString()
                }
                icon={BiSync}
              />
            </VStack>
          </Box>
          {restaurant.Position?.PositionLat &&
            restaurant.Position?.PositionLon && (
              <GoogleMap
                query={restaurant.Address}
                lat={restaurant.Position.PositionLat}
                lng={restaurant.Position.PositionLon}
              />
            )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

RestaurantPage.Layout = Layout;
RestaurantPage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<RestaurantPageProps>> => {
  if (
    typeof context.params.id !== 'string' ||
    typeof context.params.city !== 'string'
  )
    return { notFound: true };

  const city = context.params.city as City;

  if (!CitySet.has(city)) return { notFound: true };

  const restaurant = await tourismService.getRestaurantById(context.params.id);

  if (!restaurant) return { notFound: true };

  return {
    props: { restaurant },
    revalidate: ONE_DAY_IN_SECONDS,
  };
};

export default RestaurantPage;
