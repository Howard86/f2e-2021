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

import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import GoogleMap from '@/components/GoogleMap';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import RouteLink from '@/components/RouteLink';
import SceneDetailBox from '@/components/SceneDetailText';
import { CITIES, CityMap, CitySlugMap } from '@/constants/category';
import { getActivityById, getActivityWithRemarksByCity } from '@/services/ptx';

interface ActivityPageProps {
  activity: PTX.Activity;
  remarks: PTX.ActivityRemark[];
}

const getGoogleMapURL = (lat?: number, lng?: number) =>
  lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    : undefined;
const PAGE_PROPS = {
  mainColor: 'activities.main',
  gradientColor: 'activities.light',
};

const ActivityPage = ({
  activity,
  remarks,
}: ActivityPageProps): JSX.Element => {
  const router = useRouter();

  // TODO: add saved info
  const saved = true;

  if (router.isFallback) {
    return <LoadingScreen minH="400px" mainColor={PAGE_PROPS.mainColor} />;
  }

  return (
    <>
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
            <RouteLink href="/" as={BreadcrumbLink}>
              活動新訊
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouteLink
              href={`/cities/${CityMap[activity.City]}`}
              as={BreadcrumbLink}
            >
              {activity.City}
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink
              href={`/cities/${CityMap[activity.City]}/activity/${activity.ID}`}
              as={BreadcrumbLink}
            >
              {activity.Name}
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
              alt={activity.Picture?.PictureDescription1 || activity.Name}
              src={activity.Picture?.PictureUrl1}
              align="center"
              fit="cover"
              loading="lazy"
              fallbackSrc="/static/fallback.jpg"
              width={[600, 900]}
              height={[400, 600]}
            />
          </Box>
          <Box flexGrow={1} flexShrink={3} lineHeight="7" sx={{ p: { my: 2 } }}>
            <Heading textAlign="center" mb="4">
              {activity.Name}
            </Heading>
            {activity.Description && (
              <Text noOfLines={10}>{activity.Description}</Text>
            )}
            {activity.TravelInfo && (
              <Text noOfLines={10}>{activity.TravelInfo}</Text>
            )}
            {activity.ParkingInfo && (
              <Text noOfLines={10}>{activity.ParkingInfo}</Text>
            )}
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
                  activity.UpdateTime &&
                  new Date(activity.UpdateTime).toLocaleDateString()
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
        <Banner
          title="網紅這樣玩"
          mainColor={PAGE_PROPS.mainColor}
          href="/"
          hideButton
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
              href={`/cities/${CityMap[remark.City]}/activity/${remark.ID}`}
            />
          ))}
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
  ) {
    return { notFound: true };
  }

  const citySlug = context.params.city as PTX.CitySlug;
  if (citySlug !== citySlug.toLowerCase()) {
    return {
      redirect: {
        destination: `/cities/${citySlug.toLowerCase()}/activity/${
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
    const activity = await getActivityById(context.params.id);

    if (!activity) {
      return { notFound: true };
    }

    const remarks = await getActivityWithRemarksByCity(city, 6);

    return {
      props: { activity, remarks },
    };
  } catch (error) {
    console.error(error);

    return { notFound: true };
  }
};

export default ActivityPage;
