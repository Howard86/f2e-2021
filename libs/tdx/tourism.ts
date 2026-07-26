import { TdxService } from './base';
import type { City } from './constants';

export interface ScenicSpot extends TourismCommonProperty {
  Class1: string;
  Class2: string;
  Class3: string;
  DescriptionDetail?: string;
  Keyword: string;
  Level: string;
  OpenTime: string;
  ParkingPosition: Partial<{
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  }>;
  Remarks: string;
  ScenicSpotID: string;
  ScenicSpotName: string;
  TicketInfo: string;
  TravelInfo?: string;
  ZipCode: string;
}

export interface Restaurant extends TourismCommonProperty {
  Class: string;
  OpenTime: string;
  RestaurantID: string;
  RestaurantName: string;
  ZipCode: string;
}

export interface Hotel extends TourismCommonProperty {
  Class: string;
  Fax: string;
  Grade: string;
  HotelID: string;
  HotelName: string;
  ServiceInfo?: string;
  Spec?: string;
  ZipCode: string;
}

export interface Activity extends TourismCommonProperty {
  ActivityID: string;
  ActivityName: string;
  Charge: string;
  Class1: string;
  Class2: string;
  Cycle: string;
  EndTime?: string;
  Location: string;
  NonCycle: string;
  Organizer: string;
  ParkingInfo: string;
  Particpation: string;
  Remarks: string;
  SrcUpdateTime: string;
  StartTime?: string;
  TravelInfo?: string;
  UpdateTime: string;
}

export interface TourismCommonProperty {
  // TDX omits these fields from otherwise valid records at runtime.
  Address?: string;
  City: string;
  Description?: string;
  MapUrl?: string;
  ParkingInfo?: string;
  Phone?: string;
  Picture?: {
    PictureUrl1: string;
    PictureDescription1?: string;
    PictureUrl2?: string;
    PictureDescription2?: string;
    PictureUrl3?: string;
    PictureDescription3?: string;
  };
  Position?: Partial<{
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  }>;
  SrcUpdateTime?: string;
  UpdateTime: string;
  WebsiteUrl?: string;
}

export type TourismPropertyType =
  | 'ScenicSpot'
  | 'Restaurant'
  | 'Hotel'
  | 'Activity';

export class TourismService {
  private readonly BASE_PATH = '/basic/v2/Tourism';

  private readonly service: TdxService;

  constructor(service: TdxService) {
    this.service = service;
  }

  getScenicSpotById = this.generateGetById<ScenicSpot>('ScenicSpot');

  getScenicSpots = this.generateGetItems<ScenicSpot>('ScenicSpot');

  getScenicSpotsByCity = this.generateGetItemsByCity<ScenicSpot>('ScenicSpot');

  getRestaurantById = this.generateGetById<Restaurant>('Restaurant');

  getRestaurants = this.generateGetItems<Restaurant>('Restaurant');

  getRestaurantsByCity = this.generateGetItemsByCity<Restaurant>('Restaurant');

  getHotelById = this.generateGetById<Hotel>('Hotel');

  getHotels = this.generateGetItems<Hotel>('Hotel');

  getHotelsByCity = this.generateGetItemsByCity<Hotel>('Hotel');

  getActivityById = this.generateGetById<Activity>('Activity');

  getActivities = this.generateGetItems<Activity>('Activity');

  getActivitiesByCity = this.generateGetItemsByCity<Activity>('Activity');

  private generateGetById<T>(type: TourismPropertyType) {
    return async (id: string) => {
      const items = await this.service.get<T[]>(`${this.BASE_PATH}/${type}`, {
        filter: `${type}ID eq '${id}'`,
        top: 1,
      });

      return TdxService.checkExistence(items);
    };
  }

  private generateGetItems<T>(type: TourismPropertyType) {
    return async (params = this.service.DEFAULT_API_PARAMS) =>
      this.service.get<T[]>(`${this.BASE_PATH}/${type}`, params);
  }

  private generateGetItemsByCity<T>(type: TourismPropertyType) {
    return async (city: City, params = this.service.DEFAULT_API_PARAMS) =>
      this.service.get<T[]>(`${this.BASE_PATH}/${type}/${city}`, params);
  }
}
