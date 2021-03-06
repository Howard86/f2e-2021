import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CityMap,
  getHotelCards,
  getHotelCountWithCity,
  HotelCard,
} from '@f2e/ptx';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import NextHeadSeo from 'next-head-seo';
import { BsCalendar } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import GridCard from '@/components/GridCard';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import PlaceCard from '@/components/PlaceCard';
import {
  DEFAULT_CARD_NUMBER,
  DEFAULT_FETCHED_CARD_NUMBER,
} from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetHotelCardsQuery } from '@/services/local';
import background from '@/static/background/hotels.png';
import wordOne from '@/static/background/hotels-1.png';
import wordTwo from '@/static/background/hotels-2.png';

interface HotelsPageProps {
  hotels: HotelCard[];
  taipei: string;
  hualian: string;
  taidong: string;
  taoyuan: string;
}

const PAGE_PROPS = { mainColor: 'hotels.dark', gradientColor: 'hotels.light' };

const HotelsPage = ({
  hotels,
  taipei,
  hualian,
  taidong,
  taoyuan,
}: HotelsPageProps): JSX.Element => {
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
    toast({ description: 'Sorry, ????????????????????????', status: 'error' });
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
          image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/background/hotels.png'`,
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
        <Stack
          direction={['column', 'column', 'row']}
          align={['start', 'start', 'flex-end']}
          my={[6, 8]}
          p={[4, 8]}
          bg="whiteAlpha.500"
          rounded="2xl"
          zIndex="2"
          sx={{ button: { rounded: '2xl' } }}
        >
          <FormControl>
            <FormLabel fontWeight="bold">?????????</FormLabel>
            <Input
              bg="white"
              value={keyword}
              onChange={handleOnType}
              placeholder="??????????????????"
            />
          </FormControl>
          <Tooltip label="??????????????????">
            <Box>
              <Text fontWeight="bold" mb="2">
                ??????-??????
              </Text>
              <Button
                bg="white"
                onClick={handleShowMaintainingMessage}
                leftIcon={<BsCalendar />}
              >
                2021/10/6~10/9
              </Button>
            </Box>
          </Tooltip>
          <Tooltip label="??????????????????">
            <Box w={['full', 'initial']}>
              <Text fontWeight="bold" mb="2">
                ???????????????
              </Text>
              <Button
                w="full"
                bg="white"
                onClick={handleShowMaintainingMessage}
              >
                2????????????1?????????
              </Button>
            </Box>
          </Tooltip>
          <Button
            alignSelf={['center', 'center', 'initial']}
            flexShrink={0}
            bg="white"
            leftIcon={<FiSearch />}
            onClick={onSearch}
          >
            ??????
          </Button>
        </Stack>
        <Grid
          h={['260px', '380px', '460px']}
          templateRows="repeat(2, 1fr)"
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={[4, 6]}
        >
          <GridCard
            rowSpan={[1, 1, 2]}
            colSpan={1}
            title="??????"
            subtitle={taipei}
            image="/static/card/hotels-1.png"
            href={`/cities/${CityMap['?????????']}`}
          />
          <GridCard
            rowSpan={1}
            colSpan={1}
            title="??????"
            subtitle={hualian}
            image="/static/card/hotels-2.png"
            href={`/cities/${CityMap['?????????']}`}
          />
          <GridCard
            rowSpan={[1, 1, 2]}
            colSpan={1}
            title="??????"
            subtitle={taidong}
            image="/static/card/hotels-4.png"
            href={`/cities/${CityMap['?????????']}`}
          />
          <GridCard
            rowSpan={1}
            colSpan={1}
            title="??????"
            subtitle={taoyuan}
            image="/static/card/hotels-3.png"
            href={`/cities/${CityMap['?????????']}`}
          />
        </Grid>
      </Background>
      <Box
        h={['340px', '620px', '520px']}
        bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
      />
      <Flex flexDir="column" bg="white">
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
                {data.data.map((hotel) => (
                  <PlaceCard
                    key={hotel.HotelID}
                    id={hotel.HotelID}
                    name={hotel.HotelName}
                    city={hotel.City}
                    image={hotel.Picture.PictureUrl1}
                    address={hotel.Address}
                    contactNumber={hotel.Phone}
                    serviceInfo={hotel.ServiceInfo}
                    href={`/cities/${CityMap[hotel.City]}/hotel/${
                      hotel.HotelID
                    }`}
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
          {hotels
            .slice(
              DEFAULT_CARD_NUMBER * page,
              DEFAULT_CARD_NUMBER * page + DEFAULT_CARD_NUMBER,
            )
            .map((hotel) => (
              <PlaceCard
                key={hotel.HotelID}
                id={hotel.HotelID}
                name={hotel.HotelName}
                city={hotel.City}
                image={hotel.Picture.PictureUrl1}
                address={hotel.Address}
                contactNumber={hotel.Phone}
                serviceInfo={hotel.ServiceInfo}
                href={`/cities/${CityMap[hotel.City]}/hotel/${hotel.HotelID}`}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            colorTheme="hotels"
            page={page}
            total={Math.ceil(hotels.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setPage}
          />
        </Center>
      </Flex>
    </>
  );
};

HotelsPage.Layout = Layout;
HotelsPage.layoutProps = PAGE_PROPS;

const DEFAULT_FETCHED_AMOUNT = 100;
const convertFigure = (array: unknown[]) =>
  `${
    array.length === DEFAULT_FETCHED_AMOUNT ? '100+' : array.length.toString()
  }?????????`;

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<HotelsPageProps>> => {
  const [hotels, taipei, hualian, taidong, taoyuan] = await Promise.all([
    getHotelCards(DEFAULT_FETCHED_CARD_NUMBER),
    getHotelCountWithCity('?????????', DEFAULT_FETCHED_AMOUNT),
    getHotelCountWithCity('?????????', DEFAULT_FETCHED_AMOUNT),
    getHotelCountWithCity('?????????', DEFAULT_FETCHED_AMOUNT),
    getHotelCountWithCity('?????????', DEFAULT_FETCHED_AMOUNT),
  ]);

  return {
    props: {
      hotels,
      taipei: convertFigure(taipei),
      hualian: convertFigure(hualian),
      taidong: convertFigure(taidong),
      taoyuan: convertFigure(taoyuan),
    },
    revalidate: SIX_HOURS_IN_SECONDS,
  };
};

export default HotelsPage;
