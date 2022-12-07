import { ApiParam, TdxService } from './base';
import { City } from './constants';

export interface BikeStation {
  StationUID: string;
  StationID: string;
  AuthorityID: string;
  StationName: {
    Zh_tw: string;
    En: string;
  };
  StationPosition: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  StationAddress: {
    Zh_tw: string;
    En: string;
  };
  StopDescription: string;
  BikesCapacity: number;
  ServiceType: number;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface BikeAvailability {
  StationUID: string;
  StationID: string;
  ServiceStatus: number;
  ServiceType: number;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
  SrcUpdateTime: string;
  UpdateTime: string;
  AvailableRentBikesDetail: {
    GeneralBikes: number;
    ElectricBikes: number;
  };
}

export interface CyclingShape {
  RouteName: string;
  AuthorityName: string;
  CityCode: string;
  City: string;
  Town: string;
  RoadSectionStart: string;
  RoadSectionEnd: string;
  Direction: string;
  CyclingLength: number;
  FinishedTime: string;
  UpdateTime: string;
  Geometry: string;
}

export interface BikeNearByApiParam extends ApiParam {
  spatialFilter: string;
}

export class BikeService {
  private BIKE_BASE_URL = '/advanced/v2/Bike';

  private service: TdxService;

  constructor(service: TdxService) {
    this.service = service;
  }

  async getNearByBikeStations(param: BikeNearByApiParam) {
    return this.service.get<BikeStation[]>(
      `${this.BIKE_BASE_URL}/Station/NearBy`,
      param,
    );
  }

  async getNearByBikesAvailability(param: BikeNearByApiParam) {
    return this.service.get<BikeAvailability[]>(
      `${this.BIKE_BASE_URL}/Availability/NearBy`,
      param,
    );
  }

  async getCyclingShapeByCity(city: City, param: ApiParam) {
    return this.service.get<CyclingShape[]>(
      `/basic/v2/Cycling/Shape/City/${city}`,
      param,
    );
  }
}
