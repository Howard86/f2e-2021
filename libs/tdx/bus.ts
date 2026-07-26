import type { ApiParam, NearByApiParam, TdxService } from './base';
import type { City } from './constants';

export interface BusRoute {
  AuthorityID: string;
  BusRouteType: number;
  City: string;
  CityCode: string;
  DepartureStopNameEn: string;
  DepartureStopNameZh: string;
  DestinationStopNameEn: string;
  DestinationStopNameZh: string;
  FareBufferZoneDescriptionEn: string;
  FareBufferZoneDescriptionZh: string;
  HasSubRoutes: boolean;
  Operators: [
    {
      OperatorID: string;
      OperatorName: {
        Zh_tw: string;
        En: string;
      };
      OperatorCode: string;
      OperatorNo: string;
    },
  ];
  ProviderID: string;
  RouteID: string;
  RouteMapImageUrl: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  RouteUID: string;
  SubRoutes: [
    {
      SubRouteUID: string;
      SubRouteID: string;
      OperatorIDs: [string];
      SubRouteName: {
        Zh_tw: string;
        En: string;
      };
      Headsign: string;
      HeadsignEn: string;
      Direction: number;
      FirstBusTime: string;
      LastBusTime: string;
      HolidayFirstBusTime: string;
      HolidayLastBusTime: string;
    },
  ];
  TicketPriceDescriptionEn: string;
  TicketPriceDescriptionZh: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusEstimation {
  CurrentStop: string;
  DataTime: string;
  DestinationStop: string;
  Direction: number;
  Estimates: [
    {
      PlateNumb: string;
      EstimateTime: number;
      IsLastBus: boolean;
      VehicleStopStatus: number;
    },
  ];
  EstimateTime: number;
  IsLastBus: boolean;
  MessageType: number;
  NextBusTime: string;
  PlateNumb: string;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  RouteUID: string;
  SrcRecTime: string;
  SrcTransTime: string;
  SrcUpdateTime: string;
  StopCountDown: number;
  StopID: string;
  StopName: {
    Zh_tw: string;
    En: string;
  };
  StopSequence: number;
  StopStatus: number;
  StopUID: string;
  SubRouteID: string;
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  SubRouteUID: string;
  TransTime: string;
  UpdateTime: string;
}

export interface BusStopOfRoute {
  Direction: BusDirection;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  RouteUID: string;
  Stops: [
    {
      StopUID: string;
      StopID: string;
      StopName: {
        Zh_tw: string;
        En: string;
      };
      StopBoarding: number;
      StopSequence: number;
      StopPosition: {
        PositionLon: number;
        PositionLat: number;
        GeoHash: string;
      };
      StationID: string;
      StationGroupID: string;
      LocationCityCode: string;
    },
  ];
  UpdateTime: string;
  VersionID: number;
}

export interface BusStation {
  Bearing: string;
  LocationCityCode: string;
  StationAddress: string;
  StationGroupID: string;
  StationID: string;
  StationName: {
    Zh_tw: string;
    En: string;
  };
  StationPosition: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  StationUID: string;
  Stops: [
    {
      StopUID: string;
      StopID: string;
      StopName: {
        Zh_tw: string;
        En: string;
      };
      RouteUID: string;
      RouteID: string;
      RouteName: {
        Zh_tw: string;
        En: string;
      };
    },
  ];
  UpdateTime: string;
  VersionID: number;
}

export interface BusShape {
  Direction: number;
  EncodedPolyline: string;
  Geometry: string;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  RouteUID: string;
  SubRouteID: string;
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  SubRouteUID: string;
  UpdateTime: string;
  VersionID: number;
}

type BusPropertyType =
  | 'Route'
  | 'EstimatedTimeOfArrival'
  | 'DisplayStopOfRoute'
  | 'Shape';

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

export class BusService {
  private readonly BASE_PATH = '/basic/v2/Bus';

  private readonly service: TdxService;

  constructor(service: TdxService) {
    this.service = service;
  }

  getBusRoutesByCity(
    city: City,
    params: ApiParam = this.service.DEFAULT_API_PARAMS,
  ) {
    return this.service.get<BusRoute[]>(
      `${this.BASE_PATH}/Route/City/${city}`,
      params,
    );
  }

  getBusStationNearBy(params: NearByApiParam) {
    return this.service.get<BusStation[]>(
      '/advance/v2/Bus/Station/NearBy',
      params,
    );
  }

  getBusShapesByCityAndRouteName =
    this.generateGetByRouteNameAndCity<BusShape>('Shape');

  getBusRoutesByCityAndRouteName =
    this.generateGetByRouteNameAndCity<BusRoute>('Route');

  getBusEstimationsByCityAndRouteName =
    this.generateGetByRouteNameAndCity<BusEstimation>('EstimatedTimeOfArrival');

  getBusStopOfRoutesByCityAndRouteName =
    this.generateGetByRouteNameAndCity<BusStopOfRoute>('DisplayStopOfRoute');

  private generateGetByRouteNameAndCity<T>(type: BusPropertyType) {
    return async (city: City, routeName: string, params?: ApiParam) =>
      this.service.get<T[]>(
        `${this.BASE_PATH}/${type}/City/${city}/${routeName}`,
        {
          filter: `RouteName/Zh_tw eq '${routeName}'`,
          ...params,
        },
      );
  }
}
