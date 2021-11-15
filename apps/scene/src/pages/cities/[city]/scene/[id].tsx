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
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type { ParsedUrlQuery } from 'querystring';
import {
  BiChevronRight,
  BiLinkExternal,
  BiMoney,
  BiSync,
} from 'react-icons/bi';
import {
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsLightbulb,
} from 'react-icons/bs';
import {
  FiClock,
  FiMapPin,
  FiPhoneIncoming,
  FiSearch,
  FiStopCircle,
} from 'react-icons/fi';
import { MdPhotoAlbum } from 'react-icons/md';

import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import GoogleMap from '@/components/GoogleMap';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import RouteLink from '@/components/RouteLink';
import SceneDetailBox from '@/components/SceneDetailText';
import { CITIES, CityMap, CitySlugMap } from '@/constants/category';
import { DEFAULT_FETCHED_REMARK_NUMBER } from '@/constants/pagination';
import { getSceneById, getScenesWithRemarksByCity } from '@/services/ptx';

interface ScenePageProps {
  scene: PTX.Scene;
  remarks: PTX.SceneRemark[];
}

const getGoogleMapURL = (lat?: number, lng?: number) =>
  lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    : undefined;
const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const ScenePage = ({ scene, remarks }: ScenePageProps): JSX.Element => {
  const router = useRouter();

  // TODO: add saved info
  const saved = true;

  if (router.isFallback) {
    return <LoadingScreen minH="400px" mainColor={PAGE_PROPS.mainColor} />;
  }

  return (
    <>
      <NextHeadSeo
        title={`台灣旅遊導覽網 | ${scene.Name}`}
        description={scene.Description}
        og={{
          type: 'article',
          title: scene.Name,
          description: scene.Picture.PictureDescription1,
          image: scene.Picture.PictureUrl1,
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
            <RouteLink href="/scenes" as={BreadcrumbLink}>
              景點
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouteLink
              href={`/cities/${CityMap[scene.City]}`}
              as={BreadcrumbLink}
            >
              {scene.City}
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink
              href={`/cities/${CityMap[scene.City]}/scene/${scene.ID}`}
              as={BreadcrumbLink}
            >
              {scene.Name}
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
              alt={scene.Picture?.PictureDescription1 || scene.Name}
              src={scene.Picture?.PictureUrl1}
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
              {scene.Name}
            </Heading>
            {scene.Description && (
              <Text noOfLines={10}>{scene.Description}</Text>
            )}
            {scene.DescriptionDetail &&
              scene.Description !== scene.DescriptionDetail && (
                <Text noOfLines={10}>{scene.DescriptionDetail}</Text>
              )}
            {scene.TravelInfo && <Text noOfLines={10}>{scene.TravelInfo}</Text>}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <SimpleGrid columns={[1, 1, 2]} gap={[4, 8]} mx="8">
          <Box>
            <Heading>景點資訊</Heading>
            <VStack align="flex-start" textAlign="start" mt="8" spacing={4}>
              <SceneDetailBox
                label="地址"
                info={
                  scene.Address ||
                  (scene.Position?.PositionLat &&
                    scene.Position?.PositionLon &&
                    '查看地圖')
                }
                href={
                  scene.MapUrl ||
                  getGoogleMapURL(
                    scene.Position?.PositionLat,
                    scene.Position?.PositionLon,
                  )
                }
                icon={FiMapPin}
              />
              <SceneDetailBox
                label="電話"
                info={scene.Phone}
                icon={FiPhoneIncoming}
                href={`tel:${scene.Phone}`}
              />
              <SceneDetailBox
                label="開放時間"
                info={scene.OpenTime}
                icon={FiClock}
              />
              <SceneDetailBox
                label="相關鏈結"
                info={scene.WebsiteUrl && '官網'}
                href={scene.WebsiteUrl}
                icon={BiLinkExternal}
              />
              <SceneDetailBox
                label="票價資訊"
                info={scene.TicketInfo}
                icon={BiMoney}
              />
              <SceneDetailBox
                label="主題"
                info={[scene.Class1, scene.Class2, scene.Class3]
                  .filter(Boolean)
                  .join(', ')}
                href={`/scenes/${scene.Class1 || scene.Class2 || scene.Class3}`}
                icon={MdPhotoAlbum}
              />
              <SceneDetailBox
                label="關鍵字"
                info={scene.Keyword}
                icon={FiSearch}
              />
              <SceneDetailBox
                label="古蹟分級"
                info={scene.Level}
                icon={FiStopCircle}
              />
              <SceneDetailBox
                label="相關備註"
                info={scene.Remarks}
                icon={BsLightbulb}
              />
              <SceneDetailBox
                label="更新時間"
                info={
                  scene.UpdateTime &&
                  new Date(scene.UpdateTime).toLocaleDateString()
                }
                icon={BiSync}
              />
            </VStack>
          </Box>
          {scene.Position?.PositionLat && scene.Position?.PositionLon && (
            <GoogleMap
              query={scene.Address}
              lat={scene.Position.PositionLat}
              lng={scene.Position.PositionLon}
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
              description={remark.Remarks}
              image={remark.Picture.PictureUrl1}
              href={`/cities/${CityMap[remark.City]}/scene/${remark.ID}`}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

ScenePage.Layout = Layout;
ScenePage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ScenePageProps>> => {
  if (
    typeof context.params.id !== 'string' ||
    typeof context.params.city !== 'string'
  ) {
    return { notFound: true };
  }

  const citySlug = context.params.city as PTX.CitySlug;
  if (citySlug !== citySlug.toLowerCase()) {
    return {
      redirect: {
        destination: `/cities/${citySlug.toLowerCase()}/scene/${
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
    const scene = await getSceneById(context.params.id);

    if (!scene) {
      return { notFound: true };
    }

    const remarks = await getScenesWithRemarksByCity(
      city,
      DEFAULT_FETCHED_REMARK_NUMBER,
    );

    return {
      props: { scene, remarks },
    };
  } catch (error) {
    console.error(error);

    return { notFound: true };
  }
};

export default ScenePage;
