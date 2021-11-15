import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

interface GoogleMapProps extends BoxProps {
  lat: number;
  lng: number;
  query?: string;
}

const GoogleMap = ({ query, lat, lng, ...props }: GoogleMapProps) => (
  <Box
    as="iframe"
    w="full"
    h={['300px', '600px', '700px']}
    loading="lazy"
    title="google-map"
    frameBorder="0"
    allowFullScreen
    border="none"
    src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      language: 'zh-TW',
      region: 'tw',
      zoom: '16',
      center: `${lat},${lng}`,
      q: query,
    }).toString()}`}
    {...props}
  />
);

export default GoogleMap;
