import React from 'react';

import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react';

import Background from '@/components/Background';
import Banner from '@/components/Banner';
import GridCard from '@/components/GridCard';
import Layout from '@/components/layout/Layout';
import ThemeCard from '@/components/ThemeCard';
import background from '@/static/background/transports.png';
import wordOne from '@/static/background/transports-1.png';
import wordTwo from '@/static/background/transports-2.png';
import cardFive from '@/static/card/transports-5.png';
import cardSix from '@/static/card/transports-6.png';
import cardSeven from '@/static/card/transports-7.png';
import cardEight from '@/static/card/transports-8.png';
import cardNine from '@/static/card/transports-9.png';
import cardTen from '@/static/card/transports-10.png';

const PAGE_PROPS = {
  mainColor: 'transports.main',
  gradientColor: 'transports.light',
};

const TransportsPage = (): JSX.Element => (
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
      <Grid
        mt={[20, 24, 28]}
        h={['300px', '380px']}
        templateRows="repeat(2, 1fr)"
        templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={[4, 6]}
      >
        <GridCard
          rowSpan={[1, 1, 2]}
          colSpan={1}
          title="火車"
          image="/static/card/transports-1.png"
        />
        <GridCard
          rowSpan={1}
          colSpan={1}
          title="高鐵"
          image="/static/card/transports-2.png"
        />
        <GridCard
          rowSpan={[1, 1, 2]}
          colSpan={1}
          title="捷運"
          image="/static/card/transports-4.png"
        />
        <GridCard
          rowSpan={1}
          colSpan={1}
          title="公車"
          image="/static/card/transports-3.png"
        />
      </Grid>
    </Background>
    <Box
      h={['90px', '280px', '360px']}
      bgGradient={`linear(to-b, ${PAGE_PROPS.gradientColor}, white)`}
    />
    <Flex flexDir="column" bg="white">
      <Banner
        title="高速公路"
        mainColor={PAGE_PROPS.mainColor}
        href="/scenes"
        hideButton
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
        <ThemeCard
          name="省道即時交通資訊"
          image={cardFive}
          href="https://168.thb.gov.tw/"
        />
        <ThemeCard
          name="即時路況資訊"
          image={cardSix}
          href="https://1968.freeway.gov.tw/"
        />
        <ThemeCard
          name="公路客運乘車資訊"
          image={cardSeven}
          href="https://www.taiwanbus.tw/"
        />
      </SimpleGrid>
      <Banner
        title="交通租賃"
        mainColor={PAGE_PROPS.mainColor}
        href="/scenes"
        hideButton
      />

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mx="8">
        <ThemeCard name="汽車" image={cardEight} />
        <ThemeCard name="摩特車" image={cardNine} />
        <ThemeCard name="自行車" image={cardTen} />
      </SimpleGrid>
    </Flex>
  </>
);

TransportsPage.Layout = Layout;
TransportsPage.layoutProps = PAGE_PROPS;

export default TransportsPage;
