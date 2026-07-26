import type { ApiParam, NearByApiParam, TdxService } from './base';
import type { City } from './constants';

export interface BikeStation {
  AuthorityID: string;
  BikesCapacity: number;
  ServiceType: number;
  SrcUpdateTime: string;
  StationAddress: {
    Zh_tw: string;
    En: string;
  };
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
  StopDescription: string;
  UpdateTime: string;
}

export interface BikeAvailability {
  AvailableRentBikes: number;
  AvailableRentBikesDetail: {
    GeneralBikes: number;
    ElectricBikes: number;
  };
  AvailableReturnBikes: number;
  ServiceStatus: number;
  ServiceType: number;
  SrcUpdateTime: string;
  StationID: string;
  StationUID: string;
  UpdateTime: string;
}

export interface CyclingShape {
  AuthorityName: string;
  City: string;
  CityCode: string;
  CyclingLength: number;
  Direction: string;
  FinishedTime: string;
  Geometry: string;
  RoadSectionEnd: string;
  RoadSectionStart: string;
  RouteName: string;
  Town: string;
  UpdateTime: string;
}

export class BikeService {
  private readonly BIKE_BASE_URL = '/advanced/v2/Bike';

  private readonly service: TdxService;

  constructor(service: TdxService) {
    this.service = service;
  }

  getNearByBikeStations(param: NearByApiParam) {
    return this.service.get<BikeStation[]>(
      `${this.BIKE_BASE_URL}/Station/NearBy`,
      param,
    );
  }

  getNearByBikesAvailability(param: NearByApiParam) {
    return this.service.get<BikeAvailability[]>(
      `${this.BIKE_BASE_URL}/Availability/NearBy`,
      param,
    );
  }

  getCyclingShapeByCity(city: City, param: ApiParam) {
    return this.service.get<CyclingShape[]>(
      `/basic/v2/Cycling/Shape/City/${city}`,
      param,
    );
  }
}
