import { type City, PTXCityMap } from './lib';
import { type ApiParam, apiGet } from './lib/api';

export interface Station {
  AuthorityID: string;
  BikesCapacity: number;
  ServiceType: number;
  SrcUpdateTime: string;
  StationAddress: StationAddress;
  StationID: string;
  StationName: StationName;
  StationPosition: StationPosition;
  StationUID: string;
  UpdateTime: string;
}

export interface StationName {
  En: string;
  Zh_tw: string;
}

export interface StationPosition {
  GeoHash: string;
  PositionLat: number;
  PositionLon: number;
}

export interface StationAddress {
  En: string;
  Zh_tw: string;
}

export interface AvailableBike {
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
  ServiceStatus: number;
  ServiceType: number;
  SrcUpdateTime: string;
  StationID: string;
  StationUID: string;
  UpdateTime: string;
}

export interface BikeQueryParam {
  count: number;
  lat: number;
  lng: number;
  meter: number;
}

export interface BikeCycling {
  AuthorityName?: string;
  City: City;
  CityCode: string;
  CyclingLength?: number;
  Direction?: string;
  FinishedTime?: string;
  Geometry: string;
  RoadSectionEnd?: string;
  RoadSectionStart?: string;
  RouteName: string;
  Town?: string;
  UpdateTime: string;
}

export interface StationInfo {
  StationAddress: StationAddress;
  StationName: StationName;
  StationPosition: StationPosition;
  StationUID: string;
}

export interface AvailableBikeInfo {
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
}

export interface BikeCyclingInfo {
  City: City;
  CyclingLength?: number;
  Geometry: string;
  RouteName: string;
}

const mapToPTXParam = ({
  lat,
  lng,
  count,
  meter,
}: BikeQueryParam): Partial<ApiParam> => ({
  $orderBy: 'StationUID',
  $spatialFilter: `nearby(${lat}, ${lng}, ${meter})`,
  $top: count.toString(),
});

export const getNearByStations = (query: BikeQueryParam) =>
  apiGet<StationInfo[]>('Bike/Station/NearBy', {
    ...mapToPTXParam(query),
    $filter: 'ServiceType eq 2',
    $select: 'StationUID,StationName,StationPosition,StationAddress',
  });

export const getNearByAvailableBikes = (query: BikeQueryParam) =>
  apiGet<AvailableBikeInfo[]>('Bike/Availability/NearBy', {
    ...mapToPTXParam(query),
    $filter: 'ServiceType eq 2',
    $select: 'StationUID,AvailableRentBikes,AvailableReturnBikes',
  });

export const getCyclingShapeByCity = (city: City, count = 100) =>
  apiGet<BikeCyclingInfo[]>(`Cycling/Shape/City/${PTXCityMap[city]}`, {
    $filter: 'CyclingLength gt 300 and Geometry ne null',
    $select: 'RouteName,City,CyclingLength,Geometry',
    $top: count.toString(),
  });
