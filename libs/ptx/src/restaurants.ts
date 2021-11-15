import { apiGet } from './lib/api';
import { constructRestaurantsSearch } from './lib/utils';
import { PTXCityMap } from './category';
import { PTX } from './types';

export const getRestaurantById = async (
  id: string,
): Promise<PTX.Restaurant | undefined> => {
  const result = await apiGet<PTX.Restaurant[]>('Tourism/Restaurant', {
    $top: '1',
    $filter: `ID eq '${id}'`,
  });

  return result[0];
};

export const getRestaurantCards = async (
  count = 30,
): Promise<PTX.RestaurantCard[]> =>
  apiGet('Tourism/Restaurant', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,OpenTime,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'UpdateTime desc',
  });

export const getRestaurantCardsByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.RestaurantCard[]> =>
  apiGet(`Tourism/Restaurant/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,OpenTime,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'UpdateTime desc',
  });

export const getRestaurantWithRemarks = async (
  count = 30,
): Promise<PTX.RestaurantRemark[]> =>
  apiGet('Tourism/Restaurant', {
    $top: count.toString(),
    $select: 'ID,Name,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'Description desc, UpdateTime desc',
  });

export const getRestaurantWithRemarksByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.RestaurantRemark[]> =>
  apiGet(`Tourism/Restaurant/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'Description desc, UpdateTime desc',
  });

export const searchRestaurantsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<PTX.RestaurantCard[]> =>
  apiGet('Tourism/Restaurant', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,OpenTime,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructRestaurantsSearch(
      keyword,
    )})`,
  });
