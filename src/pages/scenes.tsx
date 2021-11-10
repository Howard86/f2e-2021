import React from 'react';

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Logo from '@/components/icons/Logo';
import Layout from '@/components/layout/Layout';
import SceneCard from '@/components/SceneCard';
import ThemeCard from '@/components/ThemeCard';
import { getScenes } from '@/services/tdx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';
import mockCard from '@/static/mock/card.png';
import mockScene from '@/static/mock/scene.png';
import mockTheme from '@/static/mock/theme.png';

interface ScenesPageProps {
  scenes: TDX.Scene[];
}

const ScenesPage = ({ scenes }: ScenesPageProps): JSX.Element => {
  const onSearch = () => {};

  return (
    <>
      <Container h="100vh" centerContent>
        <Box
          pos="absolute"
          top="0"
          left="0"
          right="0"
          h="100vh"
          w="100vw"
          overflow="hidden"
          zIndex="hide"
        >
          <Image
            alt="scenes-background"
            src={background}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </Box>
        <Logo color="white" my="12" w="152" h="117" />
        <Flex flexDir="column">
          <HStack spacing={8}>
            <Box w={[100, 200, 300]}>
              <Image
                alt="景"
                src={wordOne}
                placeholder="blur"
                width={300}
                height={300}
              />
            </Box>
            <Box w={[100, 200, 300]}>
              <Image
                alt="點"
                src={wordTwo}
                placeholder="blur"
                width={300}
                height={300}
              />
            </Box>
          </HStack>
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
        </Flex>
      </Container>
      <Flex flexDir="column" bgGradient="linear(to-b, brand.1, white)">
        <Banner title="熱門景點" mainColor="brand.0" href="/scenes" mt="0" />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              id={scene.id}
              name={scene.name}
              city={scene.city}
              image={scene.image || mockCard}
            />
          ))}
        </SimpleGrid>
        <Banner title="網紅攻略" mainColor="brand.0" href="/scenes" />
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
        <Banner title="主題觀點" mainColor="brand.0" href="/scenes" />

        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          <ThemeCard name="單車之旅" image={mockTheme} />
          <ThemeCard name="戶外踏青" image={mockTheme} />
          <ThemeCard name="商城街" image={mockTheme} />
        </SimpleGrid>
      </Flex>
    </>
  );
};

ScenesPage.Layout = Layout;

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ScenesPageProps>> => {
  const scenes = await getScenes();

  return {
    props: {
      scenes: scenes.slice(0, 6),
    },
  };
};

export default ScenesPage;
