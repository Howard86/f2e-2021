import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';

import type mapboxgl from 'mapbox-gl';

interface MapContextState {
  mapRef: MutableRefObject<mapboxgl.Map>;
  markersRef: MutableRefObject<Record<string, mapboxgl.Marker | undefined>>;
  stationIdSetRef: MutableRefObject<Set<string>>;
  positionMarkerRef: MutableRefObject<mapboxgl.Marker>;
  layerIdRef: MutableRefObject<string>;
}

const MapContext = createContext<MapContextState>({} as MapContextState);

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const mapRef = useRef<mapboxgl.Map>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker | undefined>>({});
  const stationIdSetRef = useRef<Set<string>>(new Set<string>());
  const positionMarkerRef = useRef<mapboxgl.Marker>(null);
  const layerIdRef = useRef<string>('');

  const context = useMemo(
    () => ({
      mapRef,
      markersRef,
      layerIdRef,
      positionMarkerRef,
      stationIdSetRef,
    }),
    [],
  );

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
