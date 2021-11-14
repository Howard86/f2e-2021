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

const PAGE_PROPS = {
  mainColor: 'transports.main',
  gradientColor: 'transports.light',
};

const TransportsPage = (): JSX.Element => (
  <>
    <Background
      name="交通"
      image={background}
      wordOneAlt="交"
      wordOne={wordOne}
      wordTwoAlt="通"
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
          href="https://www.railway.gov.tw/"
          isExternal
        />
        <GridCard
          rowSpan={1}
          colSpan={1}
          title="高鐵"
          image="/static/card/transports-2.png"
          href="https://www.thsrc.com.tw"
          isExternal
        />
        <GridCard
          rowSpan={[1, 1, 2]}
          colSpan={1}
          title="捷運"
          image="/static/card/transports-4.png"
          href="https://www.metro.taipei"
          isExternal
        />
        <GridCard
          rowSpan={1}
          colSpan={1}
          title="公車"
          image="/static/card/transports-3.png"
          href="https://ebus.gov.taipei"
          isExternal
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
          id="省道"
          theme="省道即時交通資訊"
          image="/static/card/transports-5.png"
          href="https://168.thb.gov.tw/"
        />
        <ThemeCard
          id="路況"
          theme="即時路況資訊"
          image="/static/card/transports-6.png"
          href="https://1968.freeway.gov.tw/"
        />
        <ThemeCard
          id="公路"
          theme="公路客運乘車資訊"
          image="/static/card/transports-7.png"
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
        <ThemeCard
          id="汽車"
          theme="汽車"
          image="/static/card/transports-8.png"
          href="https://gogoout.com/blog/irent-zipcar-gogoout/"
        />
        <ThemeCard
          id="摩托車"
          theme="摩特車"
          image="/static/card/transports-9.png"
          href="https://technews.tw/2019/12/21/three-shared-locomotive-services-comparability/"
        />
        <ThemeCard
          id="自行車"
          theme="自行車"
          image="/static/card/transports-10.png"
          href="https://www.dot.gov.taipei/News.aspx?n=76E4ACA9285DDACA&sms=022299092584F3D9"
        />
      </SimpleGrid>
    </Flex>
  </>
);

TransportsPage.Layout = Layout;
TransportsPage.layoutProps = PAGE_PROPS;

export default TransportsPage;
