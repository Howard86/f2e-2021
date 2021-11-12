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
  Stack,
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
import { getHotels } from '@/services/ptx';
import background from '@/static/background/hotels.png';
import wordOne from '@/static/background/hotels-1.png';
import wordTwo from '@/static/background/hotels-2.png';
import mockFood from '@/static/mock/food.png';

interface HotelsPageProps {
  hotels: PTX.Hotel[];
}

const PAGE_PROPS = { mainColor: 'hotels.dark', gradientColor: 'hotels.light' };
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
            <Input bg="white" placeholder="你要去哪裡？" />
          </FormControl>
          <Box>
            <Text fontWeight="bold" mb="2">
              入住-退房
            </Text>
            <Button bg="white" leftIcon={<BsCalendar />}>
              2021/10/6~10/9
            </Button>
          </Box>
          <Box w={['full', 'initial']}>
            <Text fontWeight="bold" mb="2">
              房間及人數
            </Text>
            <Button w="full" bg="white">
              2位成人，1間房間
            </Button>
          </Box>
          <Button
            alignSelf={['center', 'initial']}
            flexShrink={0}
            bg="white"
            leftIcon={<FiSearch />}
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
  const hotels = await getHotels();

  return {
    props: {
      hotels,
    },
  };
};

export default HotelsPage;
