import { apiGet, ApiParam } from './lib/api';
import { City, PTXCityMap } from './lib';

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

export interface BikeCycling {
  RouteName: string;
  AuthorityName?: string;
  CityCode: string;
  City: City;
  Town?: string;
  RoadSectionStart?: string;
  RoadSectionEnd?: string;
  Direction?: string;
  CyclingLength?: number;
  UpdateTime: string;
  Geometry: string;
  FinishedTime?: string;
}

export interface StationInfo {
  StationUID: string;
  StationName: StationName;
  StationPosition: StationPosition;
  StationAddress: StationAddress;
}

export interface AvailableBikeInfo {
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
}

export interface BikeCyclingInfo {
  RouteName: string;
  City: City;
  CyclingLength?: number;
  Geometry: string;
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
  apiGet<StationInfo[]>('Bike/Station/NearBy', {
    ...mapToPTXParam(query),
    $select: 'StationUID,StationName,StationPosition,StationAddress',
    $filter: 'ServiceType eq 2',
  });

export const getNearByAvailableBikes = (query: BikeQueryParam) =>
  apiGet<AvailableBikeInfo[]>('Bike/Availability/NearBy', {
    ...mapToPTXParam(query),
    $select: 'StationUID,AvailableRentBikes,AvailableReturnBikes',
    $filter: 'ServiceType eq 2',
  });

export const getCyclingShapeByCity = (city: City, count = 100) =>
  apiGet<BikeCyclingInfo[]>(`Cycling/Shape/City/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'RouteName,City,CyclingLength,Geometry',
    $filter: 'CyclingLength gt 300 and Geometry ne null',
  });
