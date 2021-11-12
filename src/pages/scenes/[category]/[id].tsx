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
  SimpleGrid,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { BiChevronRight } from 'react-icons/bi';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';

import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import RouteLink from '@/components/RouteLink';
import { getSceneById } from '@/services/ptx';
import mockScene from '@/static/mock/scene.png';

interface ScenePageProps {
  scene: PTX.Scene;
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const ScenePage = ({ scene }: ScenePageProps): JSX.Element => {
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
            <RouteLink href={`/scenes/${scene.city}`} as={BreadcrumbLink}>
              {scene.city}
            </RouteLink>
          </BreadcrumbItem>
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink
              href={`/scenes/${scene.city}/${scene.id}`}
              as={BreadcrumbLink}
            >
              {scene.name}
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
            <Image
              alt={scene.name}
              src={scene.image}
              width={900}
              height={600}
            />
          </Box>
          <Box m="8" flexGrow={1} flexShrink={5}>
            <Heading textAlign="center" mb="4">
              {scene.name}
            </Heading>
            <Text>{scene.description}</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex bg="white" flexDir="column">
        <Flex flexDir={{ base: 'column', lg: 'row' }} m="8">
          <Box textAlign="start">
            <Heading>景點資訊</Heading>
            <Text my="4">
              <Tag>地址</Tag> {scene.address}
            </Text>
            <Text my="4">
              <Tag>電話</Tag> {scene.contactNumber}
            </Text>
            <Text my="4">
              <Tag>開放時間</Tag> {scene.openingHours}
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
          <FanCard
            name="台北101攻略"
            description="除了台北101台北到底還有那些夜景？讓KKday告訴你台北還有哪些易達又美麗的夜景景點吧!"
            image={mockScene}
          />
          <FanCard
            name="台北101攻略"
            description="除了台北101台北到底還有那些夜景？讓KKday告訴你台北還有哪些易達又美麗的夜景景點吧!"
            image={mockScene}
            liked
          />
          <FanCard
            name="台北101攻略"
            description="除了台北101台北到底還有那些夜景？讓KKday告訴你台北還有哪些易達又美麗的夜景景點吧!"
            image={mockScene}
            saved
          />
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
  if (typeof context.params.id !== 'string') {
    return { notFound: true };
  }

  const scene = await getSceneById(context.params.id);

  if (!(scene?.city === context.params.city)) {
    return { notFound: true };
  }

  return {
    props: {
      scene,
    },
  };
};

export default ScenePage;
