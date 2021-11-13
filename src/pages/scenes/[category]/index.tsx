import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { BiChevronRight } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import RouteLink from '@/components/RouteLink';
import SceneCard from '@/components/SceneCard';
import { CITIES, THEMES } from '@/constants/category';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetSceneCardsQuery } from '@/services/local';
import {
  getSceneCardsByCity,
  getSceneCardsByThemeClass,
  getScenesWithRemarksByCity,
  getScenesWithRemarksByThemeClass,
} from '@/services/ptx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

interface CategoryPageProps {
  city?: PTX.City;
  theme?: PTX.SceneClass;
  scenes: PTX.SceneCard[];
  remarks: PTX.SceneRemark[];
}

const DEFAULT_CARD_NUMBER = 6;
const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const CategoryPage = ({
  city,
  theme,
  scenes,
  remarks,
}: CategoryPageProps): JSX.Element => {
  const router = useRouter();
  const category = theme || city;

  const [page, setPage] = useState(0);

  const toast = useAppToast();
  const [fetch, { data, isUninitialized, isLoading, isError, originalArgs }] =
    useLazyGetSceneCardsQuery();

  const messageSentStatus = useDisclosure();
  const [keyword, setKeyword] = useState('');

  const onSearch = () => {
    fetch({ keyword: keyword.trim(), city, theme });
    messageSentStatus.onOpen();
  };

  const handleOnType = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (isError && messageSentStatus.isOpen) {
      toast({
        description: `查無"${keyword.trim()}"的結果`,
        status: 'warning',
      });
      messageSentStatus.onClose();
    }
  }, [isError, keyword, messageSentStatus, messageSentStatus.isOpen, toast]);

  if (router.isFallback) {
    return <LoadingScreen mainColor={PAGE_PROPS.mainColor} minH="400px" />;
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
        bgColor={PAGE_PROPS.gradientColor}
      >
        <Flex align="center" mt="8">
          <InputGroup size="lg">
            <Input
              bg="white"
              placeholder="請輸入關鍵字"
              value={keyword}
              onChange={handleOnType}
            />
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
          {/* TODO: add custom utils */}
          {/* <BreadcrumbItem>
            <RouteLink href="#" as={BreadcrumbLink}>
              北部地區
            </RouteLink>
          </BreadcrumbItem> */}
          <BreadcrumbItem fontWeight="bold" isCurrentPage>
            <RouteLink href={`/scenes/${category}`} as={BreadcrumbLink}>
              {category}
            </RouteLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex flexDir={{ base: 'column', lg: 'row' }} mx="8">
          {scenes[0] && (
            <Box flexGrow={3} flexShrink={1}>
              <Image
                alt={category}
                src={scenes[0].Picture.PictureUrl1}
                align="center"
                fit="cover"
                fallbackSrc="/static/mock/scene.png"
                width={[600, 900]}
                height={[400, 600]}
              />
            </Box>
          )}
          <Box m="8" flexGrow={1} flexShrink={5}>
            <Heading textAlign="center" mb="4">
              {category}
            </Heading>
            {/* TODO: add custom utils */}
            {/* <Text>{category.description}</Text> */}
          </Box>
        </Flex>
        {!isUninitialized && !isError && (
          <>
            <Banner
              title={`搜尋『${originalArgs?.keyword}』的結果...`}
              mainColor={PAGE_PROPS.mainColor}
              href="/scenes"
              hideButton
            />
            {isLoading && <LoadingScreen mainColor={PAGE_PROPS.mainColor} />}
            {data?.success && (
              <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
                {data.data.map((scene) => (
                  <SceneCard
                    key={scene.ID}
                    id={scene.ID}
                    name={scene.Name}
                    city={scene.City}
                    image={scene.Picture.PictureUrl1}
                  />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
        <Banner
          title="熱門景點"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {scenes
            .slice(
              page * DEFAULT_CARD_NUMBER,
              page * DEFAULT_CARD_NUMBER + DEFAULT_CARD_NUMBER,
            )
            .map((scene) => (
              <SceneCard
                key={scene.ID}
                id={scene.ID}
                name={scene.Name}
                city={scene.City}
                image={scene.Picture.PictureUrl1}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            colorTheme="scenes"
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

CategoryPage.Layout = Layout;
CategoryPage.layoutProps = PAGE_PROPS;

interface CityPath extends ParsedUrlQuery {
  city: string;
}

export const getStaticPaths = (): GetStaticPathsResult<CityPath> => ({
  fallback: true,
  paths: [],
});

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<CategoryPageProps>> => {
  if (typeof context.params.category !== 'string') {
    return { notFound: true };
  }

  try {
    if (CITIES.includes(context.params.category as PTX.City)) {
      const category = context.params.category as PTX.City;
      const scenes = await getSceneCardsByCity(category, 30);
      const remarks = await getScenesWithRemarksByCity(category, 6);

      return {
        props: { scenes, city: category, remarks },
      };
    }

    if (THEMES.includes(context.params.category as PTX.SceneClass)) {
      const category = context.params.category as PTX.SceneClass;
      const scenes = await getSceneCardsByThemeClass(category, 30);
      const remarks = await getScenesWithRemarksByThemeClass(category, 6);

      return {
        props: { scenes, theme: category, remarks },
      };
    }

    console.error('Incoming unmatched param', context.params.category);
    return {
      notFound: true,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default CategoryPage;
