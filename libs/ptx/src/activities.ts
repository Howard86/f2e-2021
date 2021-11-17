import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import { City, Picture, Position } from './lib/shared-types';
import { constructActivitiesSearch } from './lib/utils';

export interface Activity {
  ID: string;
  Name: string;
  Description: string;
  Particpation?: string;
  Location?: string;
  Address?: string;
  Phone?: string;
  Organizer: string;
  StartTime: string;
  EndTime: string;
  Picture: Picture;
  Position: Position;
  Class1?: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  Class2?: string;
  Cycle?: string;
  WebsiteUrl?: string;
  City?: string;
  ParkingInfo?: string;
  Charge?: string;
  MapUrl?: string;
  TravelInfo?: string;
}

export interface ActivityCard {
  ID: string;
  Name: string;
  City: string;
  Address: string;
  Phone: string;
  Picture: Picture;
  StartTime: string;
  EndTime: string;
}

export interface ActivityRemark {
  ID: string;
  Name: string;
  Description: string;
  City: string;
  Address: string;
  Picture: Picture;
}

export const getActivityById = async (
  id: string,
): Promise<Activity | undefined> => {
  const result = await apiGet<Activity[]>('Tourism/Activity', {
    $top: '1',
    $filter: `ID eq '${id}'`,
  });

  return result[0];
};

export const getActivityCardsByCity = async (
  city: City,
  count = 30,
): Promise<ActivityCard[]> =>
  apiGet(`Tourism/Activity/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,StartTime,EndTime,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'StartTime desc',
  });

export const getActivityWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<ActivityRemark[]> =>
  apiGet(`Tourism/Activity/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'TravelInfo desc, UpdateTime desc',
  });

export const searchActivitiesByKeyword = async (
  keyword: string,
  count = 30,
): Promise<ActivityCard[]> =>
  apiGet('Tourism/Activity', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,StartTime,EndTime,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructActivitiesSearch(
      keyword,
    )})`,
  });
