import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

import type mapboxgl from 'mapbox-gl';

interface MapContextState {
  map: mapboxgl.Map;
  markers: mapboxgl.Marker[];
  stationIdSet: Set<string>;
  positionMarker: mapboxgl.Marker;
  layerId: string;
}

const MapContext = createContext<MutableRefObject<MapContextState>>(
  {} as MutableRefObject<MapContextState>,
);

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const mapContextRef = useRef<MapContextState>({
    map: null,
    markers: [],
    stationIdSet: new Set<string>(),
    positionMarker: null,
    layerId: '',
  });

  return (
    <MapContext.Provider value={mapContextRef}>{children}</MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
