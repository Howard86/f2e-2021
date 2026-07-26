import mapboxgl from 'mapbox-gl';
import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
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
    localIdeographFontFamily: "'Roboto', sans-serif",
    style: 'mapbox://styles/mapbox/dark-v10',
    ...options,
  });
};

export const createJSXMarker = (
  Element: ReactElement,
  coordinates: mapboxgl.LngLatLike,
  options?: mapboxgl.MarkerOptions,
) => {
  const node = document.createElement('div');
  const root = createRoot(node);
  root.render(Element);

  const marker = new mapboxgl.Marker(node, options).setLngLat(coordinates);
  const remove = marker.remove.bind(marker);
  marker.remove = () => {
    root.unmount();
    marker.remove = remove;
    return remove();
  };

  return marker;
};

export const addLayerAndSource = (
  map: mapboxgl.Map,
  sourceName: string,
  geoJson: GeoJSONLineString,
  color: string,
) => {
  map.addSource(sourceName, {
    data: {
      geometry: geoJson,
      properties: {},
      type: 'Feature',
    },
    type: 'geojson',
  });

  map.addLayer({
    id: sourceName,
    layout: {},
    paint: {
      'line-color': color,
      'line-width': 3,
    },
    source: sourceName,
    type: 'line',
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
