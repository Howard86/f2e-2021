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
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { BsCalendar } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import GridCard from '@/components/GridCard';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import PlaceCard from '@/components/PlaceCard';
import { CityMap } from '@/constants/category';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetHotelCardsQuery } from '@/services/local';
import { getHotelCards } from '@/services/ptx';
import background from '@/static/background/hotels.png';
import wordOne from '@/static/background/hotels-1.png';
import wordTwo from '@/static/background/hotels-2.png';

interface HotelsPageProps {
  hotels: PTX.HotelCard[];
}

const PAGE_PROPS = { mainColor: 'hotels.dark', gradientColor: 'hotels.light' };
const DEFAULT_CARD_NUMBER = 6;

const HotelsPage = ({ hotels }: HotelsPageProps): JSX.Element => {
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
    if (isError && messageSentStatus.isOpen) {
      toast({
        description: `查無"${keyword.trim()}"的結果`,
        status: 'warning',
      });
      messageSentStatus.onClose();
    }
  }, [isError, keyword, messageSentStatus, messageSentStatus.isOpen, toast]);

  return (
    <>
      <Background
        name="住宿"
        image={background}
        wordOneAlt="住"
        wordOne={wordOne}
        wordTwoAlt="宿"
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
            <FormLabel fontWeight="bold">目的地</FormLabel>
            <Input
              bg="white"
              value={keyword}
              onChange={handleOnType}
              placeholder="你要去哪裡？"
            />
          </FormControl>
          <Tooltip label="功能尚未上線">
            <Box>
              <Text fontWeight="bold" mb="2">
                入住-退房
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
          <Tooltip label="功能尚未上線">
            <Box w={['full', 'initial']}>
              <Text fontWeight="bold" mb="2">
                房間及人數
              </Text>
              <Button
                w="full"
                bg="white"
                onClick={handleShowMaintainingMessage}
              >
                2位成人，1間房間
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
            搜尋
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
            title="台北"
            subtitle="650間住宿"
            image="/static/card/hotels-1.png"
          />
          <GridCard
            rowSpan={1}
            colSpan={1}
            title="花蓮"
            subtitle="650間住宿"
            image="/static/card/hotels-2.png"
          />
          <GridCard
            rowSpan={[1, 1, 2]}
            colSpan={1}
            title="台東"
            subtitle="650間住宿"
            image="/static/card/hotels-4.png"
          />
          <GridCard
            rowSpan={1}
            colSpan={1}
            title="桃園"
            subtitle="650間住宿"
            image="/static/card/hotels-3.png"
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
              title={`搜尋『${originalArgs?.keyword}』的結果...`}
              mainColor={PAGE_PROPS.mainColor}
              href="/scenes"
              hideButton
            />
            {isLoading && <LoadingScreen mainColor={PAGE_PROPS.mainColor} />}
            {data?.success && (
              <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
                {data.data.map((hotel) => (
                  <PlaceCard
                    key={hotel.ID}
                    id={hotel.ID}
                    name={hotel.Name}
                    city={hotel.City}
                    image={hotel.Picture.PictureUrl1}
                    address={hotel.Address}
                    contactNumber={hotel.Phone}
                    serviceInfo={hotel.ServiceInfo}
                    href={`/cities/${CityMap[hotel.City]}/hotel/${hotel.ID}`}
                  />
                ))}
              </SimpleGrid>
            )}
          </>
        )}
        <Banner
          title="住宿推薦"
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
                key={hotel.ID}
                id={hotel.ID}
                name={hotel.Name}
                city={hotel.City}
                image={hotel.Picture.PictureUrl1}
                address={hotel.Address}
                contactNumber={hotel.Phone}
                serviceInfo={hotel.ServiceInfo}
                href={`/cities/${CityMap[hotel.City]}/hotel/${hotel.ID}`}
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

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<HotelsPageProps>> => {
  const hotels = await getHotelCards(30);

  return {
    props: {
      hotels,
    },
  };
};

export default HotelsPage;
