import React, { useState } from 'react';

import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import Pagination from '@/components/Pagination';
import PlaceCard from '@/components/PlaceCard';
import ThemeCard from '@/components/ThemeCard';
import { getRestaurants } from '@/services/tdx';
import background from '@/static/background/restaurants.png';
import wordOne from '@/static/background/restaurants-1.png';
import wordTwo from '@/static/background/restaurants-2.png';
import cardOne from '@/static/card/restaurants-1.png';
import cardTwo from '@/static/card/restaurants-2.png';
import cardThree from '@/static/card/restaurants-3.png';
import mockFood from '@/static/mock/food.png';
import mockScene from '@/static/mock/scene.png';

interface RestaurantsPageProps {
  restaurants: TDX.Restaurant[];
}

const PAGE_PROPS = {
  mainColor: 'restaurants.main',
  gradientColor: 'restaurants.light',
};
const DEFAULT_CARD_NUMBER = 6;

const RestaurantsPage = ({
  restaurants,
}: RestaurantsPageProps): JSX.Element => {
  const [page, setPage] = useState(0);
  const onSearch = () => {};

  return (
    <>
      <Background
        name="美食"
        image={background}
        wordOneAlt="美"
        wordOne={wordOne}
        wordTwoAlt="食"
        wordTwo={wordTwo}
      >
        <InputGroup size="lg" my="8" maxW="container.md">
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
        <HStack spacing={0} mt="20">
          <ThemeCard
            name="台灣文化"
            image={cardOne}
            imageHeight={300}
            imageWidth={400}
            roundedRight="none"
            zIndex="docked"
          />
          <ThemeCard
            name="台灣小吃"
            image={cardTwo}
            rounded="none"
            imageHeight={300}
            imageWidth={400}
          />
          <ThemeCard
            name="台灣各地特色"
            image={cardThree}
            roundedLeft="none"
            imageHeight={300}
            imageWidth={400}
          />
        </HStack>
      </Background>
      <Box
        h="120px"
        bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
      />
      <Flex flexDir="column" bg="white">
        <Banner
          title="熱門美食"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {restaurants
            .slice(
              DEFAULT_CARD_NUMBER * page,
              DEFAULT_CARD_NUMBER * page + DEFAULT_CARD_NUMBER,
            )
            .map((restaurant) => (
              <PlaceCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                city={restaurant.city}
                image={restaurant.image || mockFood}
                address={restaurant.address}
                contactNumber={restaurant.contactNumber}
                openingHours={restaurant.openingHours}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            page={page}
            total={Math.ceil(restaurants.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setPage}
          />
        </Center>
        <Banner
          title="網紅必推美食"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
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
      </Flex>
    </>
  );
};

RestaurantsPage.Layout = Layout;
RestaurantsPage.layoutProps = PAGE_PROPS;

export const getStaticProps = async (
  _context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<RestaurantsPageProps>> => {
  const restaurants = await getRestaurants();

  return {
    props: {
      restaurants,
    },
  };
};

export default RestaurantsPage;
