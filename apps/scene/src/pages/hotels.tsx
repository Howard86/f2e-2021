import {
  Box,
  Button,
  Center,
  Field,
  Flex,
  Grid,
  Input,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CityMap } from '@f2e/tdx';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import NextHeadSeo from 'next-head-seo';
import type React from 'react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { BsCalendar } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/background';
import Banner from '@/components/banner';
import GridCard from '@/components/grid-card';
import Layout from '@/components/layout/layout';
import LoadingScreen from '@/components/loading-screen';
import Pagination from '@/components/pagination';
import PlaceCard, { type PlaceCardProps } from '@/components/place-card';
import {
  DEFAULT_CARD_NUMBER,
  DEFAULT_FETCHED_CARD_NUMBER,
} from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetHotelCardsQuery } from '@/services/local';
import { mapHotelToPlaceCard, tourismService } from '@/services/tdx';
import background from '@/static/background/hotels.png';
import wordOne from '@/static/background/hotels-1.png';
import wordTwo from '@/static/background/hotels-2.png';

interface HotelsPageProps {
  hotels: PlaceCardProps[];
}

const PAGE_PROPS = { gradientColor: 'hotels.light', mainColor: 'hotels.dark' };

const HotelsPage = ({ hotels }: HotelsPageProps): React.ReactElement => {
  const toast = useAppToast();
  const [fetch, { data, isUninitialized, isLoading, isError, originalArgs }] =
    useLazyGetHotelCardsQuery();

  const messageSentStatus = useDisclosure();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);

  const onSearch = () => {
    fetch({ keyword: keyword.trim() });
    messageSentStatus.onOpen();
  };

  const handleOnType = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleShowMaintainingMessage = () => {
    toast({ description: 'Sorry, 尚未實作此功能！', status: 'error' });
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
          description: '住宿',
          image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/background/hotels.png'`,
        }}
      />
      <Background
        bgColor={PAGE_PROPS.gradientColor}
        image={background}
        name="住宿"
        wordOne={wordOne}
        wordOneAlt="住"
        wordTwo={wordTwo}
        wordTwoAlt="宿"
      >
        <Stack
          align={['start', 'start', 'flex-end']}
          bg="whiteAlpha.500"
          css={{ '& button': { rounded: '2xl' } }}
          direction={['column', 'column', 'row']}
          my={[6, 8]}
          p={[4, 8]}
          rounded="2xl"
          zIndex="2"
        >
          <Field.Root>
            <Field.Label fontWeight="bold">目的地</Field.Label>
            <Input
              bg="white"
              onChange={handleOnType}
              placeholder="你要去哪裡？"
              value={keyword}
            />
          </Field.Root>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Box>
                <Text fontWeight="bold" mb="2">
                  入住-退房
                </Text>
                <Button bg="white" onClick={handleShowMaintainingMessage}>
                  <BsCalendar />
                  2021/10/6~10/9
                </Button>
              </Box>
            </Tooltip.Trigger>
            <Portal>
              <Tooltip.Positioner>
                <Tooltip.Content>功能尚未上線</Tooltip.Content>
              </Tooltip.Positioner>
            </Portal>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Box w={['full', 'initial']}>
                <Text fontWeight="bold" mb="2">
                  房間及人數
                </Text>
                <Button
                  bg="white"
                  onClick={handleShowMaintainingMessage}
                  w="full"
                >
                  2位成人，1間房間
                </Button>
              </Box>
            </Tooltip.Trigger>
            <Portal>
              <Tooltip.Positioner>
                <Tooltip.Content>功能尚未上線</Tooltip.Content>
              </Tooltip.Positioner>
            </Portal>
          </Tooltip.Root>
          <Button
            alignSelf={['center', 'center', 'initial']}
            bg="white"
            flexShrink={0}
            onClick={onSearch}
          >
            <FiSearch />
            搜尋
          </Button>
        </Stack>
        <Grid
          gap={[4, 6]}
          h={['260px', '380px', '460px']}
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          templateRows="repeat(2, 1fr)"
        >
          <GridCard
            colSpan={1}
            href={`/${CityMap.臺北市}`}
            image="/static/card/hotels-1.png"
            rowSpan={[1, 1, 2]}
            title="台北"
          />
          <GridCard
            colSpan={1}
            href={`/${CityMap.花蓮縣}`}
            image="/static/card/hotels-2.png"
            rowSpan={1}
            title="花蓮"
          />
          <GridCard
            colSpan={1}
            href={`/${CityMap.臺東縣}`}
            image="/static/card/hotels-4.png"
            rowSpan={[1, 1, 2]}
            title="台東"
          />
          <GridCard
            colSpan={1}
            href={`/${CityMap.桃園市}`}
            image="/static/card/hotels-3.png"
            rowSpan={1}
            title="桃園"
          />
        </Grid>
      </Background>
      <Box
        bgGradient="to-b"
        gradientFrom={PAGE_PROPS.gradientColor}
        gradientTo="white"
        h={['340px', '620px', '520px']}
      />
      <Flex bg="white" flexDir="column">
        {!(isUninitialized || isError) && (
          <>
            <Banner
              hideButton
              href="/scenes"
              mainColor={PAGE_PROPS.mainColor}
              title={`搜尋『${originalArgs?.keyword}』的結果...`}
            />
            {Boolean(isLoading) && (
              <LoadingScreen mainColor={PAGE_PROPS.mainColor} />
            )}
            {data?.success === true && (
              <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
                {data.data.map((hotel) => (
                  <PlaceCard key={hotel.href} {...hotel} />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
        <Banner
          hideButton
          href="/scenes"
          mainColor={PAGE_PROPS.mainColor}
          title="住宿推薦"
        />
        <SimpleGrid columns={[1, 2, 3]} gap={6} mx="8">
          {hotels
            .slice(
              DEFAULT_CARD_NUMBER * page,
              DEFAULT_CARD_NUMBER * page + DEFAULT_CARD_NUMBER,
            )
            .map((hotel) => (
              <PlaceCard key={hotel.href} {...hotel} />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            colorTheme="hotels"
            onPageChange={setPage}
            page={page}
            total={Math.ceil(hotels.length / DEFAULT_CARD_NUMBER)}
          />
        </Center>
      </Flex>
    </>
  );
};

HotelsPage.Layout = Layout;
HotelsPage.layoutProps = PAGE_PROPS;

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<HotelsPageProps>> => {
  const hotels = await tourismService.getHotels({
    filter: 'Picture/PictureUrl1 ne null and Address ne null',
    orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
    select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    top: DEFAULT_FETCHED_CARD_NUMBER,
  });

  return {
    props: {
      hotels: hotels.map(mapHotelToPlaceCard),
    },
    revalidate: SIX_HOURS_IN_SECONDS,
  };
};

export default HotelsPage;
