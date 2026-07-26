import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import type { City } from './lib/shared-types';

export interface BusRoute {
  AuthorityID: string;
  BusRouteType: number;
  City: PTXCityMap;
  CityCode: string;
  DepartureStopNameEn: string;
  DepartureStopNameZh: string;
  DestinationStopNameEn: string;
  DestinationStopNameZh: string;
  FareBufferZoneDescriptionEn?: string;
  FareBufferZoneDescriptionZh?: string;
  HasSubRoutes: boolean;
  Operators: Operator[];
  ProviderID: string;
  RouteID: string;
  RouteMapImageUrl: string;
  RouteName: NameType;
  RouteUID: string;
  SubRoutes: SubRoute[];
  TicketPriceDescriptionEn: TicketPriceDescriptionEn;
  TicketPriceDescriptionZh: TicketPriceDescriptionZh;
  UpdateTime: string; // as Date
  VersionID: number;
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
  OperatorCode: string;
  OperatorID: string;
  OperatorName: NameType;
  OperatorNo: string;
}

export interface NameType {
  En: string;
  Zh_tw: string;
}

export interface SubRoute {
  Direction: number;
  FirstBusTime: string;
  Headsign?: string;
  HolidayFirstBusTime?: string;
  HolidayLastBusTime?: string;
  LastBusTime: string;
  OperatorIDs: string[];
  SubRouteID: string;
  SubRouteName: NameType;
  SubRouteUID: string;
}

export interface BusEstimation {
  Direction: BusDirection;
  Estimates?: Estimate[]; // only for BUS_ESTIMATED_CITIES
  EstimateTime?: number; // only when BusStopStatus = 0
  NextBusTime?: string;
  PlateNumb?: string;
  RouteID: string;
  RouteName: NameType;
  RouteUID: string;
  SrcUpdateTime: string;
  StopID: string;
  StopName: NameType;
  StopSequence: number;
  StopStatus: BusStopStatus;
  StopUID: string;
  SubRouteID: string;
  SubRouteName: NameType;
  SubRouteUID: string;
  UpdateTime: string;
}

export interface Estimate {
  EstimateTime: number;
  IsLastBus: boolean;
  PlateNumb: string;
  VehicleStopStatus?: number;
}

export const BusDirection = {
  去程: 0,
  未知: 255,
  返程: 1,
  迴圈: 2,
} as const;

export type BusDirection = (typeof BusDirection)[keyof typeof BusDirection];

export const BusStopStatus = {
  交管不停靠: 2,
  今日未營運: 4,
  尚未發車: 1,
  末班車已過: 3,
  正常: 0,
} as const;

export type BusStopStatus = (typeof BusStopStatus)[keyof typeof BusStopStatus];

export interface RouteStop {
  City: PTXCityMap;
  CityCode: string;
  Direction: number;
  Operators: Operator[];
  RouteID: string;
  RouteName: NameType;
  RouteUID: string;
  Stops: Stop[];
  SubRouteID: string;
  SubRouteName: NameType;
  SubRouteUID: string;
  UpdateTime: string;
  VersionID: number;
}

export interface Stop {
  LocationCityCode: LocationCityCode;
  StationID: string;
  StopBoarding: number;
  StopID: string;
  StopName: NameType;
  StopPosition: StopPosition;
  StopSequence: number;
  StopUID: string;
}

export interface StopPosition {
  GeoHash: string;
  PositionLat: number;
  PositionLon: number;
}

export interface BusRouteDetail {
  AuthorityID: string;
  BusRouteType: number;
  City: PTXCityMap;
  CityCode: string;
  DepartureStopNameEn: string;
  DepartureStopNameZh: string;
  DestinationStopNameEn: string;
  DestinationStopNameZh: string;
  FareBufferZoneDescriptionEn: string;
  FareBufferZoneDescriptionZh: string;
  HasSubRoutes: boolean;
  Operators: Operator[];
  ProviderID: string;
  RouteID: string;
  RouteMapImageUrl: string;
  RouteName: NameType;
  RouteUID: string;
  SubRoutes: SubRoute[];
  TicketPriceDescriptionEn: TicketPriceDescriptionEn;
  TicketPriceDescriptionZh: TicketPriceDescriptionZh;
  UpdateTime: string;
  VersionID: number;
}

export interface BusRouteShape {
  EncodedPolyline: string;
  Geometry: string;
  RouteID: string;
  RouteName: NameType;
  RouteUID: string;
  SubRouteName: Record<string, unknown>;
  UpdateTime: string;
  VersionID: number;
}

export interface BusStation {
  Bearing: string;
  LocationCityCode: LocationCityCode;
  StationAddress: string;
  StationID: string;
  StationName: NameType;
  StationPosition: StopPosition;
  StationUID: string;
  Stops: BusStationStop[];
  UpdateTime: string;
  VersionID: number;
}

export interface BusStationStop {
  RouteID: string;
  RouteName: NameType;
  RouteUID: string;
  StopID: string;
  StopName: NameType;
  StopUID: string;
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
  DepartureStopNameZh?: string;
  DestinationStopNameZh?: string;
  RouteName: NameType;
  RouteUID: string;
}

export const getBusRoutesByCity = (city: City, count = 30) =>
  apiGet<BusRouteInfo[]>(`Bus/Route/City/${PTXCityMap[city]}`, {
    $select: 'RouteUID,RouteName,DepartureStopNameZh,DestinationStopNameZh',
    $top: count.toString(),
  });

export interface BusEstimationInfo {
  Direction: BusDirection;
  EstimateTime?: number; // only when BusStopStatus = 0
  RouteName: NameType;
  RouteUID: string;
  StopName: NameType;
  StopStatus: BusStopStatus;
  StopUID: string;
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
  Direction: BusDirection;
  RouteUID: string;
  Stops: Stop[];
}

export const getRouteStopsByCityAndRouteName = (route: string, city: City) =>
  apiGet<RouteStopInfo[]>(`Bus/StopOfRoute/City/${PTXCityMap[city]}/${route}`, {
    $select: 'RouteUID,Direction,Stops',
  });

export interface BusRouteDetailInfo {
  DepartureStopNameZh: string;
  DestinationStopNameZh: string;
  FareBufferZoneDescriptionZh: string;
  HasSubRoutes: boolean;
  Operators: Operator[];
  RouteMapImageUrl: string;
  RouteName: NameType;
  RouteUID: string;
  SubRoutes: SubRoute[];
  TicketPriceDescriptionZh: TicketPriceDescriptionZh;
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
  LocationCityCode: LocationCityCode;
  StationName: NameType;
  StationPosition: StopPosition;
  StationUID: string;
  Stops: BusStationStop[];
}

export const getNearbyBusStations = (
  lat: number,
  lng: number,
  radius = 1000,
  count = 100,
) =>
  apiGet<BusStationInfo[]>('Bus/Station/NearBy', {
    $spatialFilter: `nearby(${lat},${lng},${radius})`,
    $top: count.toString(),
  });
