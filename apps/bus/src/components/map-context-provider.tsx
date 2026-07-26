import { useDisclosure } from '@chakra-ui/react';
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
  layerId: string;
  map: mapboxgl.Map;
  markers: mapboxgl.Marker[];
  positionMarker: mapboxgl.Marker;
  stationIdSet: Set<string>;
}

interface MapContextValue {
  divRef: MutableRefObject<HTMLDivElement>;
  isLoaded: boolean;
  mapContextRef: MutableRefObject<MapContextState>;
  setLoaded: VoidFunction;
}

const MapContext = createContext<MapContextValue>({} as MapContextValue);

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const mapContextRef = useRef<MapContextState>({
    layerId: '',
    map: null,
    markers: [],
    positionMarker: null,
    stationIdSet: new Set<string>(),
  });
  const { onOpen, open } = useDisclosure();

  const context = useMemo(
    () => ({ divRef, isLoaded: open, mapContextRef, setLoaded: onOpen }),
    [onOpen, open],
  );

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
