import React, { useState } from 'react';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
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
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import Pagination from '@/components/Pagination';
import RouteLink from '@/components/RouteLink';
import SceneCard from '@/components/SceneCard';
import { getCity, getScenes } from '@/services/tdx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';
import mockCard from '@/static/mock/card.png';
import mockScene from '@/static/mock/scene.png';

interface CitiesPageProps {
  city: TDX.City;
  scenes: TDX.Scene[];
}

const DEFAULT_CARD_NUMBER = 6;
const PAGE_PROPS = { mainColor: 'brand.0', gradientColor: 'brand.5' };

const CitiesPage = ({ city, scenes }: CitiesPageProps): JSX.Element => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const onSearch = () => {};

  if (router.isFallback) {
    //  TODO: add Loading screen
    return null;
  }

  return (
    <>
      <Background
        name="景點"
        image={background}
        wordOneAlt="景"
        wordOne={wordOne}
        wordTwoAlt="點"
        wordTwo={wordTwo}
      >
        <Flex align="center" mt="8">
          <InputGroup size="lg">
            <Input bg="white" placeholder="請輸入關鍵字" />
            <InputRightElement>
              <IconButton
                variant="ghost"
                rounded="full"
                aria-label="search"
                onClick={onSearch}
                icon={<FiSearch />}
              />
            </InputRightElement>
          </InputGroup>
          <Button leftIcon={<BsGrid3X3GapFill />} size="lg" ml="4">
            進階搜尋
          </Button>
        </Flex>
      </Background>

      <Flex flexDir="column" bg="white">
        <Breadcrumb
          m="4"
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
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink href={`/scenes/${city.id}`} as={BreadcrumbLink}>
              {city.name}
            </RouteLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex flexDir={{ base: 'column', lg: 'row' }} mx="8">
          <Box flexGrow={3} flexShrink={1}>
            <Image alt={city.name} src={city.image} width={900} height={600} />
          </Box>
          <Box m="8" flexGrow={1} flexShrink={5}>
            <Heading textAlign="center" mb="4">
              {city.name}
            </Heading>
            <Text>{city.description}</Text>
          </Box>
        </Flex>
        <Banner
          title="熱門景點"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {scenes
            .slice(
              page * DEFAULT_CARD_NUMBER,
              page * DEFAULT_CARD_NUMBER + DEFAULT_CARD_NUMBER,
            )
            .map((scene) => (
              <SceneCard
                key={scene.id}
                id={scene.id}
                name={scene.name}
                city={scene.city}
                image={scene.image || mockCard}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            page={page}
            total={Math.ceil(scenes.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setPage}
          />
        </Center>
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

CitiesPage.Layout = Layout;
CitiesPage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  // TODO: add list of cities
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<CitiesPageProps>> => {
  if (typeof context.params.city !== 'string') {
    return { notFound: true };
  }

  const city = await getCity(context.params.city);

  if (!city) {
    return { notFound: true };
  }

  const scenes = await getScenes();

  return {
    props: {
      city,
      scenes,
    },
  };
};

export default CitiesPage;
