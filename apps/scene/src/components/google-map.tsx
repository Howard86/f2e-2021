import { chakra, type HTMLChakraProps } from '@chakra-ui/react';

interface GoogleMapProps extends HTMLChakraProps<'iframe'> {
  lat: number;
  lng: number;
  query?: string;
}

const GoogleMap = ({ query, lat, lng, ...props }: GoogleMapProps) => (
  <chakra.iframe
    allowFullScreen
    border="none"
    frameBorder="0"
    h={['300px', '600px', '700px']}
    src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams({
      center: `${lat},${lng}`,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      language: 'zh-TW',
      q: query,
      region: 'tw',
      zoom: '16',
    }).toString()}`}
    title="google-map"
    w="full"
    {...props}
  />
);

export default GoogleMap;
