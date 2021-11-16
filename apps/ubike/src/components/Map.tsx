import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';

import parseCoordinate from '@/services/utils';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    const handleMove = () => {
      const center = map.current.getCenter();
      setLng(parseCoordinate(center.lng, 4));
      setLat(parseCoordinate(center.lat, 4));
      setZoom(parseCoordinate(map.current.getZoom(), 2));
    };
    map.current.on('move', handleMove);

    // eslint-disable-next-line consistent-return
    return () => {
      map.current.off('move', handleMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box
        color="white"
        bgColor="blackAlpha.800"
        py="1.5"
        px="3"
        zIndex="docked"
        pos="absolute"
        top="0"
        left="0"
        m="3"
        rounded="sm"
      >
        Location ({lat},{lng}) with zoom {zoom}
      </Box>
      <Box ref={mapContainer} h="400" />
    </Box>
  );
};

export default Map;
