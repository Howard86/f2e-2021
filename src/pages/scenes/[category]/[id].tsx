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
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { BiChevronRight } from 'react-icons/bi';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';

import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import RouteLink from '@/components/RouteLink';
import { CITIES } from '@/constants/category';
import { getSceneById, getScenesWithRemarksByCity } from '@/services/ptx';

interface ScenePageProps {
  scene: PTX.Scene;
  remarks: PTX.SceneRemark[];
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const ScenePage = ({ scene, remarks }: ScenePageProps): JSX.Element => {
  const router = useRouter();

  // TODO: add saved info
  const saved = true;

  if (router.isFallback) {
    //  TODO: add Loading screen
    return null;
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
            <RouteLink href="/scenes" as={BreadcrumbLink}>
              景點
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouteLink href="#" as={BreadcrumbLink}>
              北部地區
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouteLink href={`/scenes/${scene.City}`} as={BreadcrumbLink}>
              {scene.City}
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink
              href={`/scenes/${scene.City}/${scene.ID}`}
              as={BreadcrumbLink}
            >
              {scene.Name}
            </RouteLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex flexDir={{ base: 'column', lg: 'row' }} m="8">
          <Box pos="relative" flexGrow={3} flexShrink={1}>
            <IconButton
              aria-label="save to favorite"
              pos="absolute"
              w="24px"
              h="24px"
              icon={saved ? <BsBookmarkPlusFill /> : <BsBookmarkPlus />}
              color={saved ? 'red.600' : 'blackAlpha.600'}
            />
            {/* TODO: add fallback */}
            <Image
              alt={scene.Picture?.PictureDescription1 || scene.Name}
              src={scene.Picture?.PictureUrl1}
              fallbackSrc="/static/mock/scene.png"
              width={900}
              height={600}
            />
          </Box>
          <Box
            m="8"
            flexGrow={1}
            flexShrink={5}
            lineHeight="7"
            sx={{ p: { my: 2 } }}
          >
            <Heading textAlign="center" mb="4">
              {scene.Name}
            </Heading>
            {scene.Description && <Text>{scene.Description}</Text>}
            {scene.DescriptionDetail &&
              scene.Description !== scene.DescriptionDetail && (
                <Text>{scene.DescriptionDetail}</Text>
              )}
            {scene.TravelInfo && <Text>{scene.TravelInfo}</Text>}
            {scene.TicketInfo && <Text>{scene.TicketInfo}</Text>}
            {scene.Remarks && <Text>{scene.Remarks}</Text>}
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <Flex flexDir={{ base: 'column', lg: 'row' }} m="8">
          <Box textAlign="start">
            <Heading>景點資訊</Heading>
            <Text my="4">
              <Tag>地址</Tag> {scene.Address}
            </Text>
            <Text my="4">
              <Tag>電話</Tag> {scene.Phone}
            </Text>
            <Text my="4">
              <Tag>開放時間</Tag> {scene.OpenTime}
            </Text>
          </Box>
        </Flex>
        <Banner
          title="網紅這樣玩"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
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
    typeof context.params.category !== 'string'
  ) {
    return { notFound: true };
  }

  if (!CITIES.includes(context.params.category as PTX.SceneCity)) {
    return { notFound: true };
  }

  try {
    const scene = await getSceneById(context.params.id);

    if (!scene) {
      return { notFound: true };
    }

    const city = context.params.category as PTX.SceneCity;

    const remarks = await getScenesWithRemarksByCity(city, 6);

    return {
      props: { scene, remarks },
    };
  } catch (error) {
    console.error(error);

    return { notFound: true };
  }
};

export default ScenePage;
