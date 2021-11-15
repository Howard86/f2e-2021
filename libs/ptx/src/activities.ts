import { apiGet } from './lib/api';
import { constructActivitiesSearch } from './lib/utils';
import { PTXCityMap } from './category';
import { PTX } from './types';

export const getActivityById = async (
  id: string,
): Promise<PTX.Activity | undefined> => {
  const result = await apiGet<PTX.Activity[]>('Tourism/Activity', {
    $top: '1',
    $filter: `ID eq '${id}'`,
  });

  return result[0];
};

export const getActivityCardsByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.ActivityCard[]> =>
  apiGet(`Tourism/Activity/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,StartTime,EndTime,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'StartTime desc',
  });

export const getActivityWithRemarksByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.ActivityRemark[]> =>
  apiGet(`Tourism/Activity/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'TravelInfo desc, UpdateTime desc',
  });

export const searchActivitiesByKeyword = async (
  keyword: string,
  count = 30,
): Promise<PTX.ActivityCard[]> =>
  apiGet('Tourism/Activity', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,StartTime,EndTime,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructActivitiesSearch(
      keyword,
    )})`,
  });
