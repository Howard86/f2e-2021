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
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import NextHeadSeo from 'next-head-seo';
import type React from 'react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/background';
import Banner from '@/components/banner';
import Layout from '@/components/layout/layout';
import LoadingScreen from '@/components/loading-screen';
import SceneCard, { type SceneCardProps } from '@/components/scene-card';
import SceneModal from '@/components/scene-modal';
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

const PAGE_PROPS = { gradientColor: 'scenes.light', mainColor: 'scenes.main' };

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
        bgColor={PAGE_PROPS.gradientColor}
        image={background}
        name="景點"
        wordOne={wordOne}
        wordOneAlt="景"
        wordTwo={wordTwo}
        wordTwoAlt="點"
      >
        <Flex align="center" flexDir={['column', 'row']} mt="4">
          <InputGroup
            endElement={
              <IconButton
                aria-label="search"
                onClick={onSearch}
                rounded="full"
                variant="ghost"
              >
                <FiSearch />
              </IconButton>
            }
            endElementProps={{ pointerEvents: 'auto' }}
          >
            <Input
              bg="white"
              onChange={handleOnType}
              placeholder="請輸入關鍵字"
              size="lg"
              value={keyword}
            />
          </InputGroup>
          <Button
            flexShrink={0}
            m="4"
            onClick={modal.onOpen}
            size="lg"
            variant="subtle"
          >
            <BsGrid3X3GapFill />
            進階搜尋
          </Button>
        </Flex>
      </Background>

      <Flex
        bgGradient="to-b"
        flexDir="column"
        gradientFrom={PAGE_PROPS.gradientColor}
        gradientTo="white"
      >
        {!(isUninitialized || isError) && (
          <>
            <Banner
              hideButton
              href="/scenes"
              mainColor={PAGE_PROPS.mainColor}
              mt="0"
              title={`搜尋『${originalArgs?.keyword}』的結果...`}
            />
            {Boolean(isLoading) && (
              <LoadingScreen mainColor={PAGE_PROPS.mainColor} />
            )}
            {data?.success === true && (
              <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
                {data.data.map((scene) => (
                  <SceneCard key={scene.href} {...scene} />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
        <Banner
          href="/scenes"
          mainColor={PAGE_PROPS.mainColor}
          // TODO: fix with CSS selector
          mt={isSuccess ? undefined : 0}
          title="熱門景點"
        />
        <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
          {scenes.map((scene) => (
            <SceneCard key={scene.href} {...scene} />
          ))}
        </SimpleGrid>
      </Flex>
      <SceneModal
        onClose={modal.onClose}
        open={modal.open}
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
      filter: 'Picture/PictureUrl1 ne null and City ne null',
      orderBy: 'SrcUpdateTime desc, TicketInfo desc',
      select: 'ScenicSpotID,ScenicSpotName,City,Picture',
      top: DEFAULT_FETCHED_REMARK_NUMBER,
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
