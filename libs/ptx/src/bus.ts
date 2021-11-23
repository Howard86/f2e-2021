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
  HolidayFirstBusTime?: string;
  HolidayLastBusTime?: string;
}

export interface BusEstimation {
  PlateNumb: string;
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
  LocationCityCode: string;
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

export const getBusRouteByCity = (city: City, count = 30) =>
  apiGet<BusRoute[]>(`Bus/Route/City/${PTXCityMap[city]}`, {
    $top: count.toString(),
  });

export const getBusEstimationByRouteAndCity = (route: string, city: City) =>
  apiGet<BusEstimation[]>(
    `Bus/EstimatedTimeOfArrival/City/${PTXCityMap[city]}/${route}`,
  );

export const getRouteStopByCityAndRouteName = (route: string, city: City) =>
  apiGet<RouteStop[]>(`Bus/StopOfRoute/City/${PTXCityMap[city]}/${route}`);

export const getBusRouteDetailByCityAndRouteName = (
  route: string,
  city: City,
) => apiGet<BusRouteDetail[]>(`Bus/Route/City/${PTXCityMap[city]}/${route}`);
