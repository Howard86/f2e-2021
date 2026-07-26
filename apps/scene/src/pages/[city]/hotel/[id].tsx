import React from 'react';

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
import { City, CityMap, CitySet, Hotel } from '@f2e/tdx';
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

import GoogleMap from '@/components/GoogleMap';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import RouteLink from '@/components/RouteLink';
import SceneDetailBox from '@/components/SceneDetailText';
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
  mainColor: 'hotels.main',
  gradientColor: 'hotels.light',
};

const HotelPage = ({ hotel }: HotelPageProps): React.ReactElement => {
  const router = useRouter();

  // TODO: add saved info
  const saved = true;

  if (router.isFallback) {
    return <LoadingScreen minH="400px" mainColor={PAGE_PROPS.mainColor} />;
  }

  return (
    <>
      <NextHeadSeo
        title={`台灣旅遊導覽網 | ${hotel.HotelName}`}
        description={hotel.Description}
        og={{
          type: 'article',
          title: hotel.HotelName,
          description: hotel.Picture.PictureDescription1,
          image: hotel.Picture.PictureUrl1,
        }}
      />
      <Flex
        flexDir="column"
        pt="16"
        bgGradient="to-b"
        gradientFrom="restaurants.light"
        gradientTo="white"
      >
        <Breadcrumb.Root mx="8" color="blackAlpha.700">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <RouteLink href="/hotels" as={Breadcrumb.Link}>
                住宿
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <RouteLink href={`/${CityMap[hotel.City]}`} as={Breadcrumb.Link}>
                {hotel.City}
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item fontWeight="bold">
              <RouteLink
                href={`/${CityMap[hotel.City]}/hotel/${hotel.HotelID}`}
                as={Breadcrumb.Link}
                aria-current="page"
              >
                {hotel.HotelName}
              </RouteLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
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
              color={saved ? 'red.600' : 'blackAlpha.600'}
            >
              {saved ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
            </IconButton>
            <Image
              alt={hotel.Picture?.PictureDescription1 || hotel.HotelName}
              src={hotel.Picture?.PictureUrl1}
              align="center"
              fit="cover"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.src = '/static/fallback-lg.jpg';
              }}
              width={[600, 900]}
              height={[400, 600]}
            />
          </Box>
          <Box
            flexGrow={1}
            flexShrink={3}
            lineHeight="7"
            css={{ '& p': { my: 2 } }}
          >
            <Heading textAlign="center" mb="4">
              {hotel.HotelName}
            </Heading>
            {hotel.Description && (
              <Text lineClamp={10}>{hotel.Description}</Text>
            )}
            {hotel.Spec && <Text lineClamp={10}>{hotel.Spec}</Text>}
            {hotel.ServiceInfo && (
              <Text lineClamp={10}>{hotel.ServiceInfo}</Text>
            )}
            {hotel.ParkingInfo && (
              <Text lineClamp={10}>{hotel.ParkingInfo}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <SimpleGrid columns={[1, 1, 2]} gap={[4, 8]} mx="8">
          <Box>
            <Heading>住宿資訊</Heading>
            <VStack align="flex-start" textAlign="start" mt="8" gap={4}>
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
                  hotel.SrcUpdateTime &&
                  new Date(hotel.SrcUpdateTime).toLocaleDateString()
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
  )
    return { notFound: true };

  const city = context.params.city as City;

  if (!CitySet.has(city)) return { notFound: true };

  const hotel = await tourismService.getHotelById(context.params.id);

  if (!hotel) return { notFound: true };

  return {
    props: { hotel },
    revalidate: ONE_DAY_IN_SECONDS,
  };
};

export default HotelPage;
