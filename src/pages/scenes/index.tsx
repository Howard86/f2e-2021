import React from 'react';

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
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import dynamic from 'next/dynamic';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import SceneCard from '@/components/SceneCard';
import ThemeCard from '@/components/ThemeCard';
import {
  getSceneCards,
  getScenesWithRemarks,
  getSceneTheme,
} from '@/services/ptx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

const DynamicSceneModal = dynamic(() => import('@/components/SceneModal'));

interface ScenesPageProps {
  scenes: PTX.SceneCard[];
  remarks: PTX.SceneRemark[];
  themes: PTX.SceneTheme[];
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const ScenesPage = ({
  scenes,
  remarks,
  themes,
}: ScenesPageProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isCentered = useBreakpointValue({ base: false, md: true });

  const onSearch = () => {};

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
        <Flex flexDir={['column', 'row']} align="center" mt="4">
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
          <Button
            variant="scenes"
            onClick={onOpen}
            flexShrink={0}
            leftIcon={<BsGrid3X3GapFill />}
            size="lg"
            m="4"
          >
            進階搜尋
          </Button>
        </Flex>
      </Background>

      <Flex
        flexDir="column"
        bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
      >
        <Banner
          title="熱門景點"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          mt="0"
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.ID}
              id={scene.ID}
              name={scene.Name}
              city={scene.City}
              image={scene.Picture.PictureUrl1}
            />
          ))}
        </SimpleGrid>
        <Banner
          title="網紅攻略"
          mainColor={PAGE_PROPS.mainColor}
          mb={{ lg: 16 }}
          hideButton
          href="/scenes"
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6} spacingY={12} mx="8" mt="4">
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
        <Banner
          title="主題觀點"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
        />

        <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
          {themes.map((theme) => (
            <ThemeCard
              id={theme.ID}
              key={theme.ID}
              theme={theme.Class}
              image={theme.Picture.PictureUrl1}
            />
          ))}
        </SimpleGrid>
      </Flex>
      <DynamicSceneModal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={isCentered}
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
      getSceneCards(6),
      getScenesWithRemarks(6),
      getSceneTheme(6),
    ]);

    return {
      props: { scenes, remarks, themes },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};

export default ScenesPage;
