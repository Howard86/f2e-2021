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
  City: string;
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

export const getBusRouteByCity = (city: City, count = 30) =>
  apiGet<BusRoute[]>(`Bus/Route/City/${PTXCityMap[city]}`, {
    $top: count.toString(),
  });
