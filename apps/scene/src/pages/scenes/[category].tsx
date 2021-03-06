import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CityMap,
  getSceneCardsByThemeClass,
  getScenesWithRemarksByThemeClass,
  SceneCard as TSceneCard,
  SceneClass,
  SceneRemark,
  THEMES,
} from '@f2e/ptx';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import NextHeadSeo from 'next-head-seo';
import type { ParsedUrlQuery } from 'querystring';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import SceneCard from '@/components/SceneCard';
import {
  DEFAULT_CARD_NUMBER,
  DEFAULT_FETCHED_CARD_NUMBER,
  DEFAULT_FETCHED_REMARK_NUMBER,
} from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetSceneCardsQuery } from '@/services/local';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

interface CategoryPageProps {
  theme: SceneClass;
  scenes: TSceneCard[];
  remarks: SceneRemark[];
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const CategoryPage = ({
  theme,
  scenes,
  remarks,
}: CategoryPageProps): JSX.Element => {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const toast = useAppToast();
  const [fetch, { data, isUninitialized, isLoading, isError, originalArgs }] =
    useLazyGetSceneCardsQuery();

  const messageSentStatus = useDisclosure();
  const [keyword, setKeyword] = useState('');

  const onSearch = () => {
    fetch({ keyword: keyword.trim(), theme });
    messageSentStatus.onOpen();
  };

  const handleOnType = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (isError && messageSentStatus.isOpen) {
      toast({
        description: `??????"${keyword.trim()}"?????????`,
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
      <NextHeadSeo title={theme} />
      <Background
        name="??????"
        image={background}
        wordOneAlt="???"
        wordOne={wordOne}
        wordTwoAlt="???"
        wordTwo={wordTwo}
        bgColor={PAGE_PROPS.gradientColor}
      >
        <Flex align="center" mt="8">
          <InputGroup size="lg">
            <Input
              bg="white"
              placeholder="??????????????????"
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
        <Flex flexDir={{ base: 'column', lg: 'row' }} mx="8">
          {scenes[0] && (
            <Box flexGrow={3} flexShrink={1}>
              <Image
                alt={theme}
                loading="lazy"
                src={scenes[0].Picture.PictureUrl1}
                align="center"
                fit="cover"
                fallbackSrc="/static/fallback.jpg"
                width={[600, 900]}
                height={[400, 600]}
              />
            </Box>
          )}
          <Box m="8" flexGrow={1} flexShrink={5}>
            <Heading textAlign="center" mb="4">
              {theme}
            </Heading>
          </Box>
        </Flex>
        {!isUninitialized && !isError && (
          <>
            <Banner
              title={`?????????${originalArgs?.keyword}????????????...`}
              mainColor={PAGE_PROPS.mainColor}
              href="/scenes"
              hideButton
            />
            {isLoading && <LoadingScreen mainColor={PAGE_PROPS.mainColor} />}
            {data?.success && (
              <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
                {data.data.map((scene) => (
                  <SceneCard
                    key={scene.ScenicSpotID}
                    id={scene.ScenicSpotID}
                    name={scene.ScenicSpotName}
                    city={scene.City}
                    image={scene.Picture.PictureUrl1}
                  />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
        <Banner
          title="????????????"
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
                key={scene.ScenicSpotID}
                id={scene.ScenicSpotID}
                name={scene.ScenicSpotName}
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
          title="???????????????"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {remarks.map((remark) => (
            <FanCard
              id={remark.ScenicSpotID}
              key={remark.ScenicSpotID}
              name={remark.ScenicSpotName}
              city={remark.City}
              description={remark.Remarks}
              image={remark.Picture.PictureUrl1}
              href={`/cities/${CityMap[remark.City]}/scene/${
                remark.ScenicSpotID
              }`}
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

  const theme = context.params.category as SceneClass;

  if (!THEMES.includes(theme)) {
    return {
      redirect: {
        destination: '/scenes',
        permanent: false,
      },
    };
  }

  try {
    const [scenes, remarks] = await Promise.all([
      getSceneCardsByThemeClass(theme, DEFAULT_FETCHED_CARD_NUMBER),
      getScenesWithRemarksByThemeClass(theme, DEFAULT_FETCHED_REMARK_NUMBER),
    ]);

    return {
      props: { scenes, theme, remarks },
      revalidate: SIX_HOURS_IN_SECONDS,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default CategoryPage;
