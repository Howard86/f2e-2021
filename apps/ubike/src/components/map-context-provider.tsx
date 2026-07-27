import type mapboxgl from 'mapbox-gl';
import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';

interface MapContextState {
  layerIdRef: MutableRefObject<string>;
  mapRef: MutableRefObject<mapboxgl.Map>;
  markersRef: MutableRefObject<Record<string, mapboxgl.Marker | undefined>>;
  positionMarkerRef: MutableRefObject<mapboxgl.Marker>;
  stationIdSetRef: MutableRefObject<Set<string>>;
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
      layerIdRef,
      mapRef,
      markersRef,
      positionMarkerRef,
      stationIdSetRef,
    }),
    [],
  );

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
