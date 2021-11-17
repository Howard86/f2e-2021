import mapboxgl from 'mapbox-gl';
import { render } from 'react-dom';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const getPosition = (
  lat: number,
  lng: number,
  zoom: number,
): Partial<mapboxgl.MapboxOptions> => ({
  center: [lng, lat],
  zoom,
});

export const initialize = (
  container: HTMLDivElement,
  options?: Partial<mapboxgl.MapboxOptions>,
) => {
  if (!mapboxgl.supported()) {
    throw new Error('Browser not supported');
  }

  return new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10',
    localIdeographFontFamily: "'Roboto', sans-serif",
    ...options,
  });
};

export const attachJSX = (
  map: mapboxgl.Map,
  Element: JSX.Element,
  coordinates: mapboxgl.LngLatLike,
) => {
  const node = document.createElement('div');
  render(Element, node);

  new mapboxgl.Marker(node).setLngLat(coordinates).addTo(map);
};
