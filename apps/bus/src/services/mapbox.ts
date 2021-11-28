import mapboxgl from 'mapbox-gl';
import { render } from 'react-dom';
import type { GeoJSONLineString } from 'wellknown';

export type Coordinate = [number, number];

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

export const createJSXMarker = (
  Element: JSX.Element,
  coordinates: mapboxgl.LngLatLike,
  options?: mapboxgl.MarkerOptions,
) => {
  const node = document.createElement('div');
  render(Element, node);

  return new mapboxgl.Marker(node, options).setLngLat(coordinates);
};

export const addLayerAndSource = (
  map: mapboxgl.Map,
  sourceName: string,
  geoJson: GeoJSONLineString,
  color: string,
) => {
  map.addSource(sourceName, {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: geoJson,
      properties: {},
    },
  });

  map.addLayer({
    id: sourceName,
    type: 'line',
    source: sourceName,
    layout: {},
    paint: {
      'line-color': color,
      'line-width': 3,
    },
  });

  const bounds = new mapboxgl.LngLatBounds(
    geoJson.coordinates[0] as Coordinate,
    geoJson.coordinates[0] as Coordinate,
  );

  for (const coordinate of geoJson.coordinates) {
    bounds.extend(coordinate as Coordinate);
  }

  map.fitBounds(bounds);

  return sourceName;
};
