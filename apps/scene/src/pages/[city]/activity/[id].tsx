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
import { Activity, City, CityMap, CitySet } from '@f2e/tdx';
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
  BsPeopleFill,
} from 'react-icons/bs';
import { FiClock, FiMapPin, FiPhoneIncoming } from 'react-icons/fi';
import { MdManageAccounts, MdPhotoAlbum } from 'react-icons/md';

import GoogleMap from '@/components/GoogleMap';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import RouteLink from '@/components/RouteLink';
import SceneDetailBox from '@/components/SceneDetailText';
import { ONE_DAY_IN_SECONDS } from '@/constants/time';
import { tourismService } from '@/services/tdx';

interface ActivityPageProps {
  activity: Activity;
}

const getGoogleMapURL = (lat?: number, lng?: number) =>
  lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    : undefined;
const PAGE_PROPS = {
  mainColor: 'activities.main',
  gradientColor: 'activities.light',
};

const ActivityPage = ({ activity }: ActivityPageProps): React.ReactElement => {
  const router = useRouter();

  // TODO: add saved info
  const saved = true;

  if (router.isFallback) {
    return <LoadingScreen minH="400px" mainColor={PAGE_PROPS.mainColor} />;
  }

  return (
    <>
      <NextHeadSeo
        title={`台灣旅遊導覽網 | ${activity.ActivityName}`}
        description={activity.Description}
        og={{
          type: 'article',
          title: activity.ActivityName,
          description: activity.Picture.PictureDescription1,
          image: activity.Picture.PictureUrl1,
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
              <RouteLink href="/" as={Breadcrumb.Link}>
                活動新訊
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>
              <RouteLink
                href={`/${CityMap[activity.City]}`}
                as={Breadcrumb.Link}
              >
                {activity.City}
              </RouteLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <BiChevronRight />
            </Breadcrumb.Separator>
            <Breadcrumb.Item fontWeight="bold">
              <RouteLink
                href={`/${CityMap[activity.City]}/activity/${
                  activity.ActivityID
                }`}
                as={Breadcrumb.Link}
                aria-current="page"
              >
                {activity.ActivityName}
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
              alt={
                activity.Picture?.PictureDescription1 || activity.ActivityName
              }
              src={activity.Picture?.PictureUrl1}
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
              {activity.ActivityName}
            </Heading>
            {activity.Description && (
              <Text lineClamp={10}>{activity.Description}</Text>
            )}
            {activity.TravelInfo && (
              <Text lineClamp={10}>{activity.TravelInfo}</Text>
            )}
            {activity.ParkingInfo && (
              <Text lineClamp={10}>{activity.ParkingInfo}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <SimpleGrid columns={[1, 1, 2]} gap={[4, 8]} mx="8">
          <Box>
            <Heading>景點資訊</Heading>
            <VStack align="flex-start" textAlign="start" mt="8" gap={4}>
              <SceneDetailBox
                label="地址"
                info={
                  activity.Address ||
                  (activity.Position?.PositionLat &&
                    activity.Position?.PositionLon &&
                    '查看地圖')
                }
                href={
                  activity.MapUrl ||
                  getGoogleMapURL(
                    activity.Position?.PositionLat,
                    activity.Position?.PositionLon,
                  )
                }
                icon={FiMapPin}
              />
              <SceneDetailBox
                label="電話"
                info={activity.Phone}
                icon={FiPhoneIncoming}
                href={`tel:${activity.Phone}`}
              />
              <SceneDetailBox
                label="費用"
                info={activity.Charge}
                icon={BiMoney}
              />
              <SceneDetailBox
                label="活動時間"
                info={
                  activity.StartTime &&
                  activity.EndTime &&
                  `${new Date(
                    activity.StartTime,
                  ).toLocaleDateString()}~${new Date(
                    activity.EndTime,
                  ).toLocaleDateString()}`
                }
                icon={FiClock}
              />
              <SceneDetailBox
                label="相關鏈結"
                info={activity.WebsiteUrl && '官網'}
                href={activity.WebsiteUrl}
                icon={BiLinkExternal}
              />
              <SceneDetailBox
                label="主辦方"
                info={activity.Organizer}
                icon={MdManageAccounts}
              />
              <SceneDetailBox
                label="主題"
                info={[activity.Class1, activity.Class2]
                  .filter(Boolean)
                  .join(', ')}
                icon={MdPhotoAlbum}
              />
              <SceneDetailBox
                label="參與對象"
                info={activity.Particpation}
                icon={BsPeopleFill}
              />
              <SceneDetailBox
                label="更新時間"
                info={
                  activity.SrcUpdateTime &&
                  new Date(activity.SrcUpdateTime).toLocaleDateString()
                }
                icon={BiSync}
              />
            </VStack>
          </Box>
          {activity.Position?.PositionLat && activity.Position?.PositionLon && (
            <GoogleMap
              query={activity.Address}
              lat={activity.Position.PositionLat}
              lng={activity.Position.PositionLon}
            />
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

ActivityPage.Layout = Layout;
ActivityPage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ActivityPageProps>> => {
  if (
    typeof context.params.id !== 'string' ||
    typeof context.params.city !== 'string'
  )
    return { notFound: true };

  const city = context.params.city as City;

  if (!CitySet.has(city)) return { notFound: true };

  const activity = await tourismService.getActivityById(context.params.id);

  if (!activity) return { notFound: true };

  return { props: { activity }, revalidate: ONE_DAY_IN_SECONDS };
};

export default ActivityPage;
