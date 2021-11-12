import React, { useState } from 'react';

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
  Text,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { BsCalendar } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import GridCard from '@/components/GridCard';
import Layout from '@/components/layout/Layout';
import Pagination from '@/components/Pagination';
import PlaceCard from '@/components/PlaceCard';
import { getHotels } from '@/services/tdx';
import background from '@/static/background/hotels.png';
import wordOne from '@/static/background/hotels-1.png';
import wordTwo from '@/static/background/hotels-2.png';
import cardOne from '@/static/card/hotels-1.png';
import cardTwo from '@/static/card/hotels-2.png';
import cardThree from '@/static/card/hotels-3.png';
import cardFour from '@/static/card/hotels-4.png';
import mockFood from '@/static/mock/food.png';

interface HotelsPageProps {
  hotels: TDX.Hotel[];
}

const PAGE_PROPS = { mainColor: 'hotels.main', gradientColor: 'hotels.light' };
const DEFAULT_CARD_NUMBER = 6;

const HotelsPage = ({ hotels }: HotelsPageProps): JSX.Element => {
  const [page, setPage] = useState(0);

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
        <Flex align="flex-end" my="8" p="8" bg="whiteAlpha.500" rounded="2xl">
          <FormControl>
            <FormLabel>目的地</FormLabel>
            <Input bg="white" placeholder="你要去哪裡？" />
          </FormControl>
          <Box mx="6">
            <Text mb="2">入住-退房</Text>
            <Button bg="white" leftIcon={<BsCalendar />}>
              2021/10/6~10/9
            </Button>
          </Box>
          <Box mr="6">
            <Text mb="2">房間及人數</Text>
            <Button bg="white">2位成人，1間房間</Button>
          </Box>
          <Button flexShrink={0} bg="white" leftIcon={<FiSearch />}>
            搜尋
          </Button>
        </Flex>
        <Grid
          h="400px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={6}
        >
          <GridCard
            rowSpan={2}
            colSpan={1}
            title="台北"
            subtitle="650間住宿"
            image={cardOne}
          />
          <GridCard
            rowSpan={1}
            colSpan={1}
            title="花蓮"
            subtitle="650間住宿"
            image={cardTwo}
            imageHeight={200}
            imageWidth={300}
          />
          <GridCard
            rowSpan={2}
            colSpan={1}
            title="台東"
            subtitle="650間住宿"
            image={cardFour}
          />
          <GridCard
            rowSpan={1}
            colSpan={1}
            title="桃園"
            subtitle="650間住宿"
            image={cardThree}
            imageHeight={200}
            imageWidth={300}
          />
        </Grid>
      </Background>
      <Box
        h="340px"
        bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
      />
      <Flex flexDir="column" bg="white">
        <Banner
          title="住宿推薦"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {hotels
            .slice(
              DEFAULT_CARD_NUMBER * page,
              DEFAULT_CARD_NUMBER * page + DEFAULT_CARD_NUMBER,
            )
            .map((hotel) => (
              <PlaceCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                image={hotel.image || mockFood}
                address={hotel.address}
                contactNumber={hotel.contactNumber}
                openingHours={hotel.openingHours}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
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
  const hotels = await getHotels();

  return {
    props: {
      hotels,
    },
  };
};

export default HotelsPage;
