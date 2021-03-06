import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CityMap,
  getSceneCards,
  getScenesWithRemarks,
  getSceneTheme,
  SceneCard as TSceneCard,
  SceneRemark,
  SceneTheme,
} from '@f2e/ptx';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import dynamic from 'next/dynamic';
import NextHeadSeo from 'next-head-seo';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import SceneCard from '@/components/SceneCard';
import ThemeCard from '@/components/ThemeCard';
import { DEFAULT_FETCHED_REMARK_NUMBER } from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetSceneCardsQuery } from '@/services/local';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

const DynamicSceneModal = dynamic(() => import('@/components/SceneModal'));

interface ScenesPageProps {
  scenes: TSceneCard[];
  remarks: SceneRemark[];
  themes: SceneTheme[];
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const ScenesPage = ({
  scenes,
  remarks,
  themes,
}: ScenesPageProps): JSX.Element => {
  const toast = useAppToast();
  const [
    fetch,
    { data, isUninitialized, isLoading, isError, isSuccess, originalArgs },
  ] = useLazyGetSceneCardsQuery();

  const isModalCentered = useBreakpointValue({ base: false, md: true });
  const modal = useDisclosure();
  const messageSentStatus = useDisclosure();
  const [keyword, setKeyword] = useState('');

  const onSearch = () => {
    fetch({ keyword: keyword.trim() });
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

  return (
    <>
      <NextHeadSeo
        og={{
          description: '??????',
          image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/background/scenes.png'`,
        }}
      />
      <Background
        name="??????"
        image={background}
        wordOneAlt="???"
        wordOne={wordOne}
        wordTwoAlt="???"
        wordTwo={wordTwo}
        bgColor={PAGE_PROPS.gradientColor}
      >
        <Flex flexDir={['column', 'row']} align="center" mt="4">
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
          <Button
            variant="scenes"
            onClick={modal.onOpen}
            flexShrink={0}
            leftIcon={<BsGrid3X3GapFill />}
            size="lg"
            m="4"
          >
            ????????????
          </Button>
        </Flex>
      </Background>

      <Flex
        flexDir="column"
        bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
      >
        {!isUninitialized && !isError && (
          <>
            <Banner
              title={`?????????${originalArgs?.keyword}????????????...`}
              mainColor={PAGE_PROPS.mainColor}
              href="/scenes"
              mt="0"
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
          // TODO: fix with CSS selector
          mt={isSuccess ? undefined : 0}
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.ScenicSpotID}
              id={scene.ScenicSpotID}
              name={scene.ScenicSpotName}
              city={scene.City}
              image={scene.Picture.PictureUrl1}
            />
          ))}
        </SimpleGrid>
        <Banner
          title="????????????"
          mainColor={PAGE_PROPS.mainColor}
          mb={{ lg: 16 }}
          hideButton
          href="/scenes"
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} spacingY={12} mx="8" mt="4">
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
        <Banner
          title="????????????"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
        />

        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {themes.map((theme) => (
            <ThemeCard
              id={theme.ScenicSpotID}
              key={theme.ScenicSpotID}
              theme={theme.Class}
              image={theme.Picture.PictureUrl1}
            />
          ))}
        </SimpleGrid>
      </Flex>
      <DynamicSceneModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        isCentered={isModalCentered}
      />
    </>
  );
};

ScenesPage.Layout = Layout;
ScenesPage.layoutProps = PAGE_PROPS;

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ScenesPageProps>> => {
  try {
    const [scenes, remarks, themes] = await Promise.all([
      getSceneCards(DEFAULT_FETCHED_REMARK_NUMBER),
      getScenesWithRemarks(DEFAULT_FETCHED_REMARK_NUMBER),
      getSceneTheme(DEFAULT_FETCHED_REMARK_NUMBER),
    ]);

    return {
      props: { scenes, remarks, themes },
      revalidate: SIX_HOURS_IN_SECONDS,
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};

export default ScenesPage;
