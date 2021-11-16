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
import {
  CITIES,
  CityMap,
  CitySlug,
  CitySlugMap,
  getHotelById,
  getHotelWithRemarksByCity,
  Hotel,
  RestaurantRemark,
} from '@f2e/ptx';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type { ParsedUrlQuery } from 'querystring';
import { AiFillStar } from 'react-icons/ai';
import { BiChevronRight, BiLinkExternal, BiSync } from 'react-icons/bi';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { FaFax } from 'react-icons/fa';
import { FiMapPin, FiPhoneIncoming } from 'react-icons/fi';
import { MdPhotoAlbum } from 'react-icons/md';

import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import GoogleMap from '@/components/GoogleMap';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import RouteLink from '@/components/RouteLink';
import SceneDetailBox from '@/components/SceneDetailText';
import { DEFAULT_FETCHED_REMARK_NUMBER } from '@/constants/pagination';
import { ONE_DAY_IN_SECONDS } from '@/constants/time';

interface HotelPageProps {
  hotel: Hotel;
  remarks: RestaurantRemark[];
}

const getGoogleMapURL = (lat?: number, lng?: number) =>
  lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    : undefined;
const PAGE_PROPS = {
  mainColor: 'hotels.main',
  gradientColor: 'hotels.light',
};

const HotelPage = ({ hotel, remarks }: HotelPageProps): JSX.Element => {
  const router = useRouter();

  // TODO: add saved info
  const saved = true;

  if (router.isFallback) {
    return <LoadingScreen minH="400px" mainColor={PAGE_PROPS.mainColor} />;
  }

  return (
    <>
      <NextHeadSeo
        title={`台灣旅遊導覽網 | ${hotel.Name}`}
        description={hotel.Description}
        og={{
          type: 'article',
          title: hotel.Name,
          description: hotel.Picture.PictureDescription1,
          image: hotel.Picture.PictureUrl1,
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
            <RouteLink href="/hotels" as={BreadcrumbLink}>
              住宿
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouteLink
              href={`/cities/${CityMap[hotel.City]}`}
              as={BreadcrumbLink}
            >
              {hotel.City}
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink
              href={`/cities/${CityMap[hotel.City]}/hotel/${hotel.ID}`}
              as={BreadcrumbLink}
            >
              {hotel.Name}
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
              alt={hotel.Picture?.PictureDescription1 || hotel.Name}
              src={hotel.Picture?.PictureUrl1}
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
              {hotel.Name}
            </Heading>
            {hotel.Description && (
              <Text noOfLines={10}>{hotel.Description}</Text>
            )}
            {hotel.Spec && <Text noOfLines={10}>{hotel.Spec}</Text>}
            {hotel.ServiceInfo && (
              <Text noOfLines={10}>{hotel.ServiceInfo}</Text>
            )}
            {hotel.ParkingInfo && (
              <Text noOfLines={10}>{hotel.ParkingInfo}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <SimpleGrid columns={[1, 1, 2]} gap={[4, 8]} mx="8">
          <Box>
            <Heading>住宿資訊</Heading>
            <VStack align="flex-start" textAlign="start" mt="8" spacing={4}>
              <SceneDetailBox
                label="地址"
                info={
                  hotel.Address ||
                  (hotel.Position?.PositionLat &&
                    hotel.Position?.PositionLon &&
                    '查看地圖')
                }
                href={getGoogleMapURL(
                  hotel.Position?.PositionLat,
                  hotel.Position?.PositionLon,
                )}
                icon={FiMapPin}
              />
              <SceneDetailBox
                label="電話"
                info={hotel.Phone}
                icon={FiPhoneIncoming}
                href={`tel:${hotel.Phone}`}
              />
              <SceneDetailBox label="傳真" info={hotel.Fax} icon={FaFax} />
              <SceneDetailBox
                label="星級"
                info={hotel.Grade}
                icon={AiFillStar}
              />
              <SceneDetailBox
                label="相關鏈結"
                info={hotel.WebsiteUrl && '官網'}
                href={hotel.WebsiteUrl}
                icon={BiLinkExternal}
              />
              <SceneDetailBox
                label="分類"
                info={hotel.Class}
                icon={MdPhotoAlbum}
              />
              <SceneDetailBox
                label="更新時間"
                info={
                  hotel.UpdateTime &&
                  new Date(hotel.UpdateTime).toLocaleDateString()
                }
                icon={BiSync}
              />
            </VStack>
          </Box>
          {hotel.Position?.PositionLat && hotel.Position?.PositionLon && (
            <GoogleMap
              query={hotel.Address}
              lat={hotel.Position.PositionLat}
              lng={hotel.Position.PositionLon}
            />
          )}
        </SimpleGrid>
        <Banner
          title="網紅這樣玩"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
        />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {remarks.map((remark) => (
            <FanCard
              id={remark.ID}
              key={remark.ID}
              name={remark.Name}
              city={remark.City}
              description={remark.Description}
              image={remark.Picture.PictureUrl1}
              href={`/cities/${CityMap[remark.City]}/hotel/${remark.ID}`}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

HotelPage.Layout = Layout;
HotelPage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<HotelPageProps>> => {
  if (
    typeof context.params.id !== 'string' ||
    typeof context.params.city !== 'string'
  ) {
    return { notFound: true };
  }

  const citySlug = context.params.city as CitySlug;
  if (citySlug !== citySlug.toLowerCase()) {
    return {
      redirect: {
        destination: `/cities/${citySlug.toLowerCase()}/hotel/${
          context.params.id
        }`,
        permanent: true,
      },
    };
  }

  const city = CitySlugMap[citySlug];

  if (!CITIES.includes(city)) {
    return { notFound: true };
  }

  try {
    const hotel = await getHotelById(context.params.id);

    if (!hotel) {
      return { notFound: true };
    }

    const remarks = await getHotelWithRemarksByCity(
      city,
      DEFAULT_FETCHED_REMARK_NUMBER,
    );

    return {
      props: { hotel, remarks },
      revalidate: ONE_DAY_IN_SECONDS,
    };
  } catch (error) {
    console.error(error);

    return { notFound: true };
  }
};

export default HotelPage;
