import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import NextHeadSeo from 'next-head-seo';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import SceneCard, { SceneCardProps } from '@/components/SceneCard';
import SceneModal from '@/components/SceneModal';
import { DEFAULT_FETCHED_REMARK_NUMBER } from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetSceneCardsQuery } from '@/services/local';
import { mapScenicSpotToSceneCard, tourismService } from '@/services/tdx';
import background from '@/static/background/scenes.png';
import wordOne from '@/static/background/scenes-1.png';
import wordTwo from '@/static/background/scenes-2.png';

interface ScenesPageProps {
  scenes: SceneCardProps[];
}

const PAGE_PROPS = { mainColor: 'scenes.main', gradientColor: 'scenes.light' };

const ScenesPage = ({ scenes }: ScenesPageProps): React.ReactElement => {
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
    if (isError && messageSentStatus.open) {
      toast({
        description: `查無"${keyword.trim()}"的結果`,
        status: 'warning',
      });
      messageSentStatus.onClose();
    }
  }, [isError, keyword, messageSentStatus, messageSentStatus.open, toast]);

  return (
    <>
      <NextHeadSeo
        og={{
          description: '景點',
          image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/background/scenes.png'`,
        }}
      />
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
          <InputGroup
            endElement={
              <IconButton
                variant="ghost"
                rounded="full"
                aria-label="search"
                onClick={onSearch}
              >
                <FiSearch />
              </IconButton>
            }
            endElementProps={{ pointerEvents: 'auto' }}
          >
            <Input
              size="lg"
              bg="white"
              placeholder="請輸入關鍵字"
              value={keyword}
              onChange={handleOnType}
            />
          </InputGroup>
          <Button
            variant="subtle"
            onClick={modal.onOpen}
            flexShrink={0}
            size="lg"
            m="4"
          >
            <BsGrid3X3GapFill />
            進階搜尋
          </Button>
        </Flex>
      </Background>

      <Flex
        flexDir="column"
        bgGradient="to-b"
        gradientFrom={PAGE_PROPS.gradientColor}
        gradientTo="white"
      >
        {!isUninitialized && !isError && (
          <>
            <Banner
              title={`搜尋『${originalArgs?.keyword}』的結果...`}
              mainColor={PAGE_PROPS.mainColor}
              href="/scenes"
              mt="0"
              hideButton
            />
            {isLoading && <LoadingScreen mainColor={PAGE_PROPS.mainColor} />}
            {data?.success && (
              <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
                {data.data.map((scene) => (
                  <SceneCard key={scene.href} {...scene} />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
        <Banner
          title="熱門景點"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          // TODO: fix with CSS selector
          mt={isSuccess ? undefined : 0}
        />
        <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
          {scenes.map((scene) => (
            <SceneCard key={scene.href} {...scene} />
          ))}
        </SimpleGrid>
      </Flex>
      <SceneModal
        open={modal.open}
        onClose={modal.onClose}
        placement={isModalCentered ? 'center' : 'top'}
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
    const scenes = await tourismService.getScenicSpots({
      top: DEFAULT_FETCHED_REMARK_NUMBER,
      select: 'ScenicSpotID,ScenicSpotName,City,Picture',
      filter: 'Picture/PictureUrl1 ne null and City ne null',
      orderBy: 'SrcUpdateTime desc, TicketInfo desc',
    });

    return {
      props: { scenes: scenes.map(mapScenicSpotToSceneCard) },
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
