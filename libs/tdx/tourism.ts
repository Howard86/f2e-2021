import { TdxService } from './base';
import { City } from './constants';

export interface ScenicSpot extends TourismCommonProperty {
  ScenicSpotID: string;
  ScenicSpotName: string;
  DescriptionDetail: string;
  ZipCode: string;
  TravelInfo: string;
  OpenTime: string;
  Class1: string;
  Class2: string;
  Class3: string;
  Level: string;
  ParkingPosition: Partial<{
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  }>;
  TicketInfo: string;
  Remarks: string;
  Keyword: string;
}

export interface Restaurant extends TourismCommonProperty {
  RestaurantID: string;
  RestaurantName: string;
  ZipCode: string;
  OpenTime: string;
  Class: string;
}

export interface Hotel extends TourismCommonProperty {
  HotelID: string;
  HotelName: string;
  ZipCode: string;
  Grade: string;
  Fax: string;
  Class: string;
  Spec: string;
  ServiceInfo: string;
}

export interface Activity extends TourismCommonProperty {
  ActivityID: string;
  ActivityName: string;
  Particpation: string;
  Location: string;
  Organizer: string;
  StartTime: string;
  EndTime: string;
  Cycle: string;
  NonCycle: string;
  Class1: string;
  Class2: string;
  TravelInfo: string;
  ParkingInfo: string;
  Charge: string;
  Remarks: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface TourismCommonProperty {
  Description: string;
  Address: string;
  Phone: string;
  WebsiteUrl: string;
  Picture: {
    PictureUrl1: string;
    PictureDescription1?: string;
    PictureUrl2?: string;
    PictureDescription2?: string;
    PictureUrl3?: string;
    PictureDescription3?: string;
  };
  Position: Partial<{
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  }>;
  MapUrl: string;
  ParkingInfo: string;
  City: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export type TourismPropertyType =
  | 'ScenicSpot'
  | 'Restaurant'
  | 'Hotel'
  | 'Activity';

export class TourismService {
  private BASE_PATH = '/basic/v2/Tourism';

  private service: TdxService;

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
        top: 1,
        filter: `${type}ID eq '${id}'`,
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
