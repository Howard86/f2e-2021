import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

import type mapboxgl from 'mapbox-gl';

const MapContext = createContext<MutableRefObject<mapboxgl.Map>>(null);

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const mapRef = useRef<mapboxgl.Map>(null);

  return <MapContext.Provider value={mapRef}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
