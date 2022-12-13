import { ApiParam, NearByApiParam, TdxService } from './base';
import { City } from './constants';

export interface BusRoute {
  RouteUID: string;
  RouteID: string;
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
  AuthorityID: string;
  ProviderID: string;
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
  BusRouteType: number;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  DepartureStopNameZh: string;
  DepartureStopNameEn: string;
  DestinationStopNameZh: string;
  DestinationStopNameEn: string;
  TicketPriceDescriptionZh: string;
  TicketPriceDescriptionEn: string;
  FareBufferZoneDescriptionZh: string;
  FareBufferZoneDescriptionEn: string;
  RouteMapImageUrl: string;
  City: string;
  CityCode: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusEstimation {
  PlateNumb: string;
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
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  Direction: number;
  EstimateTime: number;
  StopCountDown: number;
  CurrentStop: string;
  DestinationStop: string;
  StopSequence: number;
  StopStatus: number;
  MessageType: number;
  NextBusTime: string;
  IsLastBus: boolean;
  Estimates: [
    {
      PlateNumb: string;
      EstimateTime: number;
      IsLastBus: boolean;
      VehicleStopStatus: number;
    },
  ];
  DataTime: string;
  TransTime: string;
  SrcRecTime: string;
  SrcTransTime: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface BusStopOfRoute {
  RouteUID: string;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  Direction: number;
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
  StationUID: string;
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
  StationAddress: string;
  StationGroupID: string;
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
  LocationCityCode: string;
  Bearing: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusShape {
  RouteUID: string;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  Direction: number;
  Geometry: string;
  EncodedPolyline: string;
  UpdateTime: string;
  VersionID: number;
}

type BusPropertyType =
  | 'Route'
  | 'EstimatedTimeOfArrival'
  | 'DisplayStopOfRoute'
  | 'Shape';

export enum BusDirection {
  '去程' = 0,
  '返程' = 1,
  '迴圈' = 2,
  '未知' = 255,
}

export enum BusStopStatus {
  '正常' = 0,
  '尚未發車' = 1,
  '交管不停靠' = 2,
  '末班車已過' = 3,
  '今日未營運' = 4,
}

export class BusService {
  private BASE_PATH = '/basic/v2/Bus';

  private service: TdxService;

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

  getBusStopOfRoutesByCityAndRouteName(
    city: City,
    routeName: string,
    params: ApiParam = this.service.DEFAULT_API_PARAMS,
  ) {
    return this.service.get<BusStopOfRoute[]>(
      `${this.BASE_PATH}/DisplayStopOfRoute/City/${city}/${routeName}`,
      params,
    );
  }

  getBusStationNearBy(params: NearByApiParam) {
    return this.service.get<BusStation[]>(
      '/advance/v2/Bus/Station/NearBy',
      params,
    );
  }

  getBusShapeByCityAndRouteName =
    this.generateGetByRouteName<BusShape>('Shape');

  getBusRouteByCityAndRouteName =
    this.generateGetByRouteName<BusRoute>('Route');

  getBusEstimationsByCityAndRouteName =
    this.generateGetByRouteName<BusEstimation>('EstimatedTimeOfArrival');

  getBusStopOfRouteByCityAndRouteName =
    this.generateGetByRouteName<BusStopOfRoute>('DisplayStopOfRoute');

  private generateGetByRouteName<T>(type: BusPropertyType) {
    return async (city: City, routeName: string) => {
      const items = await this.service.get<T[]>(
        `${this.BASE_PATH}/${type}/City/${city}`,
        {
          top: 1,
          filter: `RouteName/Zh_tw eq '${routeName}'`,
        },
      );

      return TdxService.checkExistence(items);
    };
  }
}
