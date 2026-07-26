import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import type { City, Picture, Position } from './lib/shared-types';
import { constructActivitiesSearch } from './lib/utils';

export interface Activity {
  ActivityID: string;
  ActivityName: string;
  Address?: string;
  Charge?: string;
  City?: string;
  Class1?: string;
  Class2?: string;
  Cycle?: string;
  Description: string;
  EndTime: string;
  Location?: string;
  MapUrl?: string;
  Organizer: string;
  ParkingInfo?: string;
  Particpation?: string;
  Phone?: string;
  Picture: Picture;
  Position: Position;
  SrcUpdateTime: string;
  StartTime: string;
  TravelInfo?: string;
  UpdateTime: string;
  WebsiteUrl?: string;
}

export interface ActivityCard {
  ActivityID: string;
  ActivityName: string;
  Address: string;
  City: string;
  EndTime: string;
  Phone: string;
  Picture: Picture;
  StartTime: string;
}

export interface ActivityRemark {
  ActivityID: string;
  ActivityName: string;
  Address: string;
  City: string;
  Description: string;
  Picture: Picture;
}

export const getActivityById = async (
  id: string,
): Promise<Activity | undefined> => {
  const result = await apiGet<Activity[]>('Tourism/Activity', {
    $filter: `ActivityID eq '${id}'`,
    $top: '1',
  });

  return result[0];
};

export const getActivityCardsByCity = async (
  city: City,
  count = 30,
): Promise<ActivityCard[]> =>
  apiGet(`Tourism/Activity/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'StartTime desc',
    $select:
      'ActivityID,ActivityName,City,Address,StartTime,EndTime,Phone,Picture',
    $top: count.toString(),
  });

export const getActivityWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<ActivityRemark[]> =>
  apiGet(`Tourism/Activity/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, TravelInfo desc',
    $select: 'ActivityID,ActivityName,Description,City,Address,Picture',
    $top: count.toString(),
  });

export const searchActivitiesByKeyword = async (
  keyword: string,
  count = 30,
): Promise<ActivityCard[]> =>
  apiGet('Tourism/Activity', {
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructActivitiesSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, TravelInfo desc',
    $select:
      'ActivityID,ActivityName,City,Address,StartTime,EndTime,Phone,Picture',
    $top: count.toString(),
  });
