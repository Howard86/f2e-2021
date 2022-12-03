import { TdxService } from './base';

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

export type City =
  | 'Taipei'
  | 'NewTaipei'
  | 'Taoyuan'
  | 'Taichung'
  | 'Tainan'
  | 'Kaohsiung'
  | 'Keelung'
  | 'Hsinchu'
  | 'HsinchuCounty'
  | 'MiaoliCounty'
  | 'ChanghuaCounty'
  | 'NantouCounty'
  | 'YunlinCounty'
  | 'ChiayiCounty'
  | 'Chiayi'
  | 'PingtungCounty'
  | 'YilanCounty'
  | 'HualienCounty'
  | 'TaitungCounty'
  | 'KinmenCounty'
  | 'PenghuCounty'
  | 'LienchiangCounty';

export enum CityMap {
  '臺北市' = 'Taipei',
  '新北市' = 'Newtaipei',
  '桃園市' = 'Taoyuan',
  '臺中市' = 'Taichung',
  '臺南市' = 'Tainan',
  '高雄市' = 'Kaohsiung',
  '基隆市' = 'Keelung',
  '新竹市' = 'Hsinchu',
  '新竹縣' = 'HsinchuCounty',
  '苗栗縣' = 'MiaoliCounty',
  '彰化縣' = 'ChanghuaCounty',
  '南投縣' = 'NantouCounty',
  '雲林縣' = 'YunlinCounty',
  '嘉義縣' = 'ChiayiCounty',
  '嘉義市' = 'Chiayi',
  '屏東縣' = 'PingtungCounty',
  '宜蘭縣' = 'YilanCounty',
  '花蓮縣' = 'HualienCounty',
  '臺東縣' = 'TaitungCounty',
  '金門縣' = 'KinmenCounty',
  '澎湖縣' = 'PenghuCounty',
  '連江縣' = 'LienchiangCounty',
}

export class TourismService {
  private BASE_PATH = '/v2/Tourism';

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
        filter: `${type}ID eq ${id}`,
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
