import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { useDisclosure } from '@chakra-ui/react';
import type mapboxgl from 'mapbox-gl';

interface MapContextState {
  map: mapboxgl.Map;
  markers: mapboxgl.Marker[];
  stationIdSet: Set<string>;
  positionMarker: mapboxgl.Marker;
  layerId: string;
}

interface MapContextValue {
  divRef: MutableRefObject<HTMLDivElement>;
  mapContextRef: MutableRefObject<MapContextState>;
  isLoaded: boolean;
  setLoaded: VoidFunction;
}

const MapContext = createContext<MapContextValue>({} as MapContextValue);

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const divRef = useRef<HTMLDivElement>();
  const mapContextRef = useRef<MapContextState>({
    map: null,
    markers: [],
    stationIdSet: new Set<string>(),
    positionMarker: null,
    layerId: '',
  });
  const { onOpen, isOpen } = useDisclosure();

  const context = useMemo(
    () => ({ mapContextRef, isLoaded: isOpen, setLoaded: onOpen, divRef }),
    [isOpen, onOpen],
  );

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
