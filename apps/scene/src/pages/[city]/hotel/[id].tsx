import type { ParsedUrlQuery } from 'node:querystring';
import {
  Box,
  Breadcrumb,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { type City, CityMap, CitySet, type Hotel } from '@f2e/tdx';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiChevronRight, BiLinkExternal, BiSync } from 'react-icons/bi';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import { FaFax } from 'react-icons/fa';
import { FiMapPin, FiPhoneIncoming } from 'react-icons/fi';
import { MdPhotoAlbum } from 'react-icons/md';

import GoogleMap from '@/components/google-map';
import Layout from '@/components/layout/layout';
import LoadingScreen from '@/components/loading-screen';
import RouteLink from '@/components/route-link';
import SceneDetailBox from '@/components/scene-detail-text';
import { ONE_DAY_IN_SECONDS } from '@/constants/time';
import { tourismService } from '@/services/tdx';

interface HotelPageProps {
  hotel: Hotel;
}

const getGoogleMapURL = (lat?: number, lng?: number) =>
  lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    : undefined;
const PAGE_PROPS = {
  gradientColor: 'hotels.light',
  mainColor: 'hotels.main',
};

const HotelPage = ({ hotel }: HotelPageProps): React.ReactElement => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScreen mainColor={PAGE_PROPS.mainColor} minH="400px" />;
  }

  return (
    <>
      <NextHeadSeo
        description={hotel.Description}
        og={{
          description: hotel.Picture?.PictureDescription1,
          image: hotel.Picture?.PictureUrl1,
          title: hotel.HotelName,
          type: 'article',
        }}
        title={`台灣旅遊導覽網 | ${hotel.HotelName}`}
      />
      <Flex
        bgGradient="to-b"
        flexDir="column"
        gradientFrom="restaurants.light"
        gradientTo="white"
        pt="16"
      >
        <Breadcrumb.Root color="blackAlpha.700" mx="8">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <RouteLink as={Breadcrumb.Link} href="/hotels">
                住宿
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <RouteLink as={Breadcrumb.Link} href={`/${CityMap[hotel.City]}`}>
                {hotel.City}
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item fontWeight="bold">
              <RouteLink
                aria-current="page"
                as={Breadcrumb.Link}
                href={`/${CityMap[hotel.City]}/hotel/${hotel.HotelID}`}
              >
                {hotel.HotelName}
              </RouteLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <Flex flexDir={{ base: 'column', lg: 'row' }} m={[4, 8]}>
          <Box flexGrow={1} flexShrink={1} m="2" pos="relative">
            <IconButton
              aria-label="save to favorite"
              color="red.600"
              m="4"
              pos="absolute"
              right="0"
              rounded="full"
              size="lg"
              top="0"
            >
              <BsBookmarkPlusFill />
            </IconButton>
            <Image
              align="center"
              alt={hotel.Picture?.PictureDescription1 || hotel.HotelName}
              fit="cover"
              height={[400, 600]}
              loading="lazy"
              // biome-ignore lint/performance/noJsxPropsBind: callback needs local render state or the current event target.
              onError={(event) => {
                event.currentTarget.src = '/static/fallback-lg.jpg';
              }}
              src={hotel.Picture?.PictureUrl1}
              width={[600, 900]}
            />
          </Box>
          <Box
            css={{ '& p': { my: 2 } }}
            flexGrow={1}
            flexShrink={3}
            lineHeight="7"
          >
            <Heading mb="4" textAlign="center">
              {hotel.HotelName}
            </Heading>
            {Boolean(hotel.Description) && (
              <Text lineClamp={10}>{hotel.Description}</Text>
            )}
            {Boolean(hotel.Spec) && <Text lineClamp={10}>{hotel.Spec}</Text>}
            {Boolean(hotel.ServiceInfo) && (
              <Text lineClamp={10}>{hotel.ServiceInfo}</Text>
            )}
            {Boolean(hotel.ParkingInfo) && (
              <Text lineClamp={10}>{hotel.ParkingInfo}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <SimpleGrid columns={[1, 1, 2]} gap={[4, 8]} mx="8">
          <Box>
            <Heading>住宿資訊</Heading>
            <VStack align="flex-start" gap={4} mt="8" textAlign="start">
              <SceneDetailBox
                href={getGoogleMapURL(
                  hotel.Position?.PositionLat,
                  hotel.Position?.PositionLon,
                )}
                icon={FiMapPin}
                info={
                  hotel.Address ||
                  (hotel.Position?.PositionLat &&
                    hotel.Position?.PositionLon &&
                    '查看地圖')
                }
                label="地址"
              />
              <SceneDetailBox
                href={`tel:${hotel.Phone}`}
                icon={FiPhoneIncoming}
                info={hotel.Phone}
                label="電話"
              />
              <SceneDetailBox icon={FaFax} info={hotel.Fax} label="傳真" />
              <SceneDetailBox
                icon={AiFillStar}
                info={hotel.Grade}
                label="星級"
              />
              <SceneDetailBox
                href={hotel.WebsiteUrl}
                icon={BiLinkExternal}
                info={hotel.WebsiteUrl && '官網'}
                label="相關鏈結"
              />
              <SceneDetailBox
                icon={MdPhotoAlbum}
                info={hotel.Class}
                label="分類"
              />
              <SceneDetailBox
                icon={BiSync}
                info={
                  hotel.SrcUpdateTime &&
                  new Date(hotel.SrcUpdateTime).toLocaleDateString()
                }
                label="更新時間"
              />
            </VStack>
          </Box>
          {Boolean(
            hotel.Position?.PositionLat && hotel.Position?.PositionLon,
          ) && (
            <GoogleMap
              lat={hotel.Position.PositionLat}
              lng={hotel.Position.PositionLon}
              query={hotel.Address}
            />
          )}
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

  const city = context.params.city as City;

  if (!CitySet.has(city)) {
    return { notFound: true };
  }

  const hotel = await tourismService.getHotelById(context.params.id);

  if (!hotel) {
    return { notFound: true };
  }

  return {
    props: { hotel },
    revalidate: ONE_DAY_IN_SECONDS,
  };
};

export default HotelPage;
