import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CityMap,
  getRestaurantCards,
  getRestaurantWithRemarks,
  RestaurantCard,
  RestaurantRemark,
} from '@f2e/ptx';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import NextHeadSeo from 'next-head-seo';
import { FiSearch } from 'react-icons/fi';

import Background from '@/components/Background';
import BackgroundCard from '@/components/BackgroundCard';
import Banner from '@/components/Banner';
import FanCard from '@/components/FanCard';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Pagination from '@/components/Pagination';
import PlaceCard from '@/components/PlaceCard';
import {
  DEFAULT_CARD_NUMBER,
  DEFAULT_FETCHED_CARD_NUMBER,
  DEFAULT_FETCHED_REMARK_NUMBER,
} from '@/constants/pagination';
import { SIX_HOURS_IN_SECONDS } from '@/constants/time';
import useAppToast from '@/hooks/use-app-toast';
import { useLazyGetRestaurantCardsQuery } from '@/services/local';
import background from '@/static/background/restaurants.png';
import wordOne from '@/static/background/restaurants-1.png';
import wordTwo from '@/static/background/restaurants-2.png';

interface RestaurantsPageProps {
  restaurants: RestaurantCard[];
  remarks: RestaurantRemark[];
}

const PAGE_PROPS = {
  mainColor: 'restaurants.main',
  gradientColor: 'restaurants.light',
};

const RestaurantsPage = ({
  restaurants,
  remarks,
}: RestaurantsPageProps): JSX.Element => {
  const toast = useAppToast();
  const [fetch, { data, isUninitialized, isLoading, isError, originalArgs }] =
    useLazyGetRestaurantCardsQuery();

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
          image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/static/background/restaurants.png'`,
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
        <InputGroup size="lg" my="8" maxW="container.md">
          <Input
            rounded="2xl"
            value={keyword}
            onChange={handleOnType}
            bg="white"
            placeholder="??????????????????"
          />
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
        <SimpleGrid h={['160px', '220px']} columns={3} gap={[2, 0]}>
          <BackgroundCard
            name="????????????"
            image="/static/card/restaurants-1.png"
            roundedRight="none"
          />
          <BackgroundCard
            name="????????????"
            image="/static/card/restaurants-2.png"
            rounded="none"
          />
          <BackgroundCard
            name="??????????????????"
            image="/static/card/restaurants-3.png"
            roundedLeft="none"
          />
        </SimpleGrid>
      </Background>
      <Box
        h={['40px', '120px', '220px']}
        bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
      />
      <Flex flexDir="column" bg="white">
        {!isUninitialized && !isError && (
          <>
            <Banner
              title={`?????????${originalArgs?.keyword}????????????...`}
              mainColor={PAGE_PROPS.mainColor}
              href="/scenes"
              mt="0"
              hideButton
            />
            {isLoading && <LoadingScreen mainColor={PAGE_PROPS.mainColor} />}
            {data?.success && (
              <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
                {data.data.map((restaurant) => (
                  <PlaceCard
                    key={restaurant.RestaurantID}
                    id={restaurant.RestaurantID}
                    name={restaurant.RestaurantName}
                    city={restaurant.City}
                    image={restaurant.Picture.PictureUrl1}
                    address={restaurant.Address}
                    contactNumber={restaurant.Phone}
                    openingHours={restaurant.OpenTime}
                    href={`/cities/${CityMap[restaurant.City]}/restaurant/${
                      restaurant.RestaurantID
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
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {restaurants
            .slice(
              DEFAULT_CARD_NUMBER * page,
              DEFAULT_CARD_NUMBER * page + DEFAULT_CARD_NUMBER,
            )
            .map((restaurant) => (
              <PlaceCard
                key={restaurant.RestaurantID}
                id={restaurant.RestaurantID}
                name={restaurant.RestaurantName}
                city={restaurant.City}
                image={restaurant.Picture.PictureUrl1}
                address={restaurant.Address}
                contactNumber={restaurant.Phone}
                openingHours={restaurant.OpenTime}
                href={`/cities/${CityMap[restaurant.City]}/restaurant/${
                  restaurant.RestaurantID
                }`}
              />
            ))}
        </SimpleGrid>
        <Center mt="8">
          <Pagination
            colorTheme="restaurants"
            page={page}
            total={Math.ceil(restaurants.length / DEFAULT_CARD_NUMBER)}
            onPageChange={setPage}
          />
        </Center>
        <Banner
          mb={[10, 10, 20]}
          title="??????????????????"
          mainColor={PAGE_PROPS.mainColor}
          href="/scenes"
          hideButton
        />
        <SimpleGrid columns={[1, 2, 3]} spacingX={8} spacingY={12} mx="8">
          {remarks.map((remark) => (
            <FanCard
              id={remark.RestaurantID}
              key={remark.RestaurantID}
              name={remark.RestaurantName}
              city={remark.City}
              description={remark.Description}
              image={remark.Picture.PictureUrl1}
              href={`/cities/${CityMap[remark.City]}/restaurant/${
                remark.RestaurantID
              }`}
            />
          ))}
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
  const [restaurants, remarks] = await Promise.all([
    getRestaurantCards(DEFAULT_FETCHED_CARD_NUMBER),
    getRestaurantWithRemarks(DEFAULT_FETCHED_REMARK_NUMBER),
  ]);

  return { props: { restaurants, remarks }, revalidate: SIX_HOURS_IN_SECONDS };
};

export default RestaurantsPage;
