import { apiGet, ApiParam } from './lib/api';

export interface Station {
  StationUID: string;
  StationID: string;
  AuthorityID: string;
  StationName: StationName;
  StationPosition: StationPosition;
  StationAddress: StationAddress;
  BikesCapacity: number;
  ServiceType: number;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface StationName {
  Zh_tw: string;
  En: string;
}

export interface StationPosition {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}

export interface StationAddress {
  Zh_tw: string;
  En: string;
}

export interface AvailableBike {
  StationUID: string;
  StationID: string;
  ServiceStatus: number;
  ServiceType: number;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface BikeQueryParam {
  lat: number;
  lng: number;
  meter: number;
  count: number;
}

const mapToPTXParam = ({
  lat,
  lng,
  count,
  meter,
}: BikeQueryParam): Partial<ApiParam> => ({
  $top: count.toString(),
  $spatialFilter: `nearby(${lat}, ${lng}, ${meter})`,
  $orderBy: 'StationUID',
});

export const getNearByStations = (query: BikeQueryParam) =>
  apiGet<Station[]>('Bike/Station/NearBy', mapToPTXParam(query));

export const getNearByAvailableBikes = (query: BikeQueryParam) =>
  apiGet<AvailableBike[]>('Bike/Availability/NearBy', mapToPTXParam(query));
