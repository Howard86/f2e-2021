import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';

import type mapboxgl from 'mapbox-gl';

const MapContext = createContext<{
  mapRef: MutableRefObject<mapboxgl.Map>;
  markersRef: MutableRefObject<mapboxgl.Marker[]>;
  positionMarkerRef: MutableRefObject<mapboxgl.Marker>;
  layerIdRef: MutableRefObject<string>;
}>({
  mapRef: null,
  markersRef: null,
  positionMarkerRef: null,
  layerIdRef: null,
});

interface MapContextProviderProps {
  children: ReactNode;
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const mapRef = useRef<mapboxgl.Map>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const positionMarkerRef = useRef<mapboxgl.Marker>(null);
  const layerIdRef = useRef<string>('');

  return (
    <MapContext.Provider
      value={{ mapRef, markersRef, layerIdRef, positionMarkerRef }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

export default MapContextProvider;
