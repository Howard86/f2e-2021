import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import { City } from './lib/shared-types';

export interface BusRoute {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: boolean;
  Operators: Operator[];
  AuthorityID: string;
  ProviderID: string;
  SubRoutes: SubRoute[];
  BusRouteType: number;
  RouteName: NameType;
  DepartureStopNameZh: string;
  DepartureStopNameEn: string;
  DestinationStopNameZh: string;
  DestinationStopNameEn: string;
  TicketPriceDescriptionZh: TicketPriceDescriptionZh;
  TicketPriceDescriptionEn: TicketPriceDescriptionEn;
  RouteMapImageUrl: string;
  City: PTXCityMap;
  CityCode: string;
  UpdateTime: string; // as Date
  VersionID: number;
  FareBufferZoneDescriptionZh?: string;
  FareBufferZoneDescriptionEn?: string;
}

export type TicketPriceDescriptionZh =
  | '1段票'
  | '一段票'
  | '三段票'
  | '二段票'
  | '依里程計費'
  | '免費'
  | '兩段票'
  | '詳票價表';

export type TicketPriceDescriptionEn =
  | 'Fare :1X'
  | 'Free'
  | '1 segment'
  | '1 segments'
  | '1X'
  | '2 segment'
  | '2 segments'
  | '2X'
  | '3 segments'
  | '1 Segment'
  | '2 Segments'
  | 'Fare:1X';

export interface Operator {
  OperatorID: string;
  OperatorName: NameType;
  OperatorCode: string;
  OperatorNo: string;
}

export interface NameType {
  Zh_tw: string;
  En: string;
}

export interface SubRoute {
  SubRouteUID: string;
  SubRouteID: string;
  OperatorIDs: string[];
  SubRouteName: NameType;
  Direction: number;
  FirstBusTime: string;
  LastBusTime: string;
  Headsign?: string;
  HolidayFirstBusTime?: string;
  HolidayLastBusTime?: string;
}

export interface BusEstimation {
  PlateNumb?: string;
  StopUID: string;
  StopID: string;
  StopName: NameType;
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: NameType;
  Direction: BusDirection;
  StopSequence: number;
  StopStatus: BusStopStatus;
  SrcUpdateTime: string;
  UpdateTime: string;
  EstimateTime?: number; // only when BusStopStatus = 0
  NextBusTime?: string;
  Estimates?: Estimate[]; // only for BUS_ESTIMATED_CITIES
}

export interface Estimate {
  PlateNumb: string;
  EstimateTime: number;
  IsLastBus: boolean;
  VehicleStopStatus?: number;
}

export enum BusDirection {
  '去程',
  '返程',
  '迴圈',
  '未知' = 255,
}

export enum BusStopStatus {
  '正常',
  '尚未發車',
  '交管不停靠',
  '末班車已過',
  '今日未營運',
}

export interface RouteStop {
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
  Operators: Operator[];
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: NameType;
  Direction: number;
  City: PTXCityMap;
  CityCode: string;
  Stops: Stop[];
  UpdateTime: string;
  VersionID: number;
}

export interface Stop {
  StopUID: string;
  StopID: string;
  StopName: NameType;
  StopBoarding: number;
  StopSequence: number;
  StopPosition: StopPosition;
  StationID: string;
  LocationCityCode: LocationCityCode;
}

export interface StopPosition {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}

export interface BusRouteDetail {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: boolean;
  Operators: Operator[];
  AuthorityID: string;
  ProviderID: string;
  SubRoutes: SubRoute[];
  BusRouteType: number;
  RouteName: NameType;
  DepartureStopNameZh: string;
  DepartureStopNameEn: string;
  DestinationStopNameZh: string;
  DestinationStopNameEn: string;
  TicketPriceDescriptionZh: TicketPriceDescriptionZh;
  TicketPriceDescriptionEn: TicketPriceDescriptionEn;
  FareBufferZoneDescriptionZh: string;
  FareBufferZoneDescriptionEn: string;
  RouteMapImageUrl: string;
  City: PTXCityMap;
  CityCode: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusRouteShape {
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
  SubRouteName: Record<string, unknown>;
  Geometry: string;
  EncodedPolyline: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusStation {
  StationUID: string;
  StationID: string;
  StationName: NameType;
  StationPosition: StopPosition;
  StationAddress: string;
  Stops: BusStationStop[];
  LocationCityCode: LocationCityCode;
  Bearing: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusStationStop {
  StopUID: string;
  StopID: string;
  StopName: NameType;
  RouteUID: string;
  RouteID: string;
  RouteName: NameType;
}

type LocationCityCode =
  | 'CHA'
  | 'CYQ'
  | 'HSQ'
  | 'HUA'
  | 'ILA'
  | 'KIN'
  | 'LIE'
  | 'MIA'
  | 'NAN'
  | 'PEN'
  | 'PIF'
  | 'TTT'
  | 'YUN'
  | 'CYI'
  | 'HSZ'
  | 'KEE'
  | 'KHH'
  | 'NWT'
  | 'TAO'
  | 'TNN'
  | 'TPE'
  | 'TXG';

export interface BusRouteInfo {
  RouteUID: string;
  RouteName: NameType;
  DepartureStopNameZh?: string;
  DestinationStopNameZh?: string;
}

export const getBusRoutesByCity = (city: City, count = 30) =>
  apiGet<BusRouteInfo[]>(`Bus/Route/City/${PTXCityMap[city]}`, {
    $select: 'RouteUID,RouteName,DepartureStopNameZh,DestinationStopNameZh',
    $top: count.toString(),
  });

export interface BusEstimationInfo {
  StopUID: string;
  StopName: NameType;
  RouteUID: string;
  RouteName: NameType;
  Direction: BusDirection;
  StopStatus: BusStopStatus;
  EstimateTime?: number; // only when BusStopStatus = 0
}

export const getBusEstimationsByRouteAndCity = (route: string, city: City) =>
  apiGet<BusEstimationInfo[]>(
    `Bus/EstimatedTimeOfArrival/City/${PTXCityMap[city]}/${route}`,
    {
      $select:
        'StopUID,StopName,RouteUID,RouteName,Direction,StopStatus,EstimateTime',
    },
  );

export interface RouteStopInfo {
  RouteUID: string;
  Direction: BusDirection;
  Stops: Stop[];
}

export const getRouteStopsByCityAndRouteName = (route: string, city: City) =>
  apiGet<RouteStopInfo[]>(`Bus/StopOfRoute/City/${PTXCityMap[city]}/${route}`, {
    $select: 'RouteUID,Direction,Stops',
  });

export interface BusRouteDetailInfo {
  RouteUID: string;
  HasSubRoutes: boolean;
  Operators: Operator[];
  SubRoutes: SubRoute[];
  RouteName: NameType;
  DepartureStopNameZh: string;
  DestinationStopNameZh: string;
  TicketPriceDescriptionZh: TicketPriceDescriptionZh;
  FareBufferZoneDescriptionZh: string;
  RouteMapImageUrl: string;
}

export const getBusRouteDetailByCityAndRouteName = async (
  route: string,
  city: City,
) => {
  const results = await apiGet<BusRouteDetailInfo[]>(
    `Bus/Route/City/${PTXCityMap[city]}/${route}`,
    {
      $select:
        'RouteUID,HasSubRoutes,Operators,SubRoutes,RouteName,DepartureStopNameZh,DestinationStopNameZh,TicketPriceDescriptionZh,FareBufferZoneDescriptionZh,RouteMapImageUrl',
    },
  );

  return results[0];
};

export interface BusRouteShapeInfo {
  Geometry: string;
}

export const getBusRouteShapeByCityAndRouteName = async (
  route: string,
  city: City,
) => {
  const results = await apiGet<BusRouteShapeInfo[]>(
    `Bus/Shape/City/${PTXCityMap[city]}/${route}`,
    { $select: 'Geometry' },
  );

  return results[0];
};

export interface BusStationInfo {
  StationUID: string;
  StationName: NameType;
  StationPosition: StopPosition;
  Stops: BusStationStop[];
  LocationCityCode: LocationCityCode;
}

export const getNearbyBusStations = (
  lat: number,
  lng: number,
  radius = 1000,
  count = 100,
) =>
  apiGet<BusStationInfo[]>(`Bus/Station/NearBy`, {
    $spatialFilter: `nearby(${lat},${lng},${radius})`,
    $top: count.toString(),
  });
