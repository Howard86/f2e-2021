import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import type { City, Picture, Position } from './lib/shared-types';
import { constructRestaurantsSearch } from './lib/utils';

export interface Restaurant {
  Address: string;
  City?: string;
  Class?: RestaurantClass;
  Description: string;
  MapUrl?: string;
  OpenTime?: string;
  ParkingInfo?: string;
  Phone: string;
  Picture: Picture;
  Position: Position;
  RestaurantID: string;
  RestaurantName: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  WebsiteUrl?: string;
  ZipCode?: string;
}

export type RestaurantClass =
  | '中式美食'
  | '伴手禮'
  | '其他'
  | '地方特產'
  | '夜市小吃'
  | '甜點冰品'
  | '異國料理'
  | '素食';

export interface RestaurantCard {
  Address: string;
  City: string;
  OpenTime?: string;
  Phone?: string;
  Picture: Picture;
  RestaurantID: string;
  RestaurantName: string;
}

export interface RestaurantRemark {
  Address: string;
  City: string;
  Description: string;
  Picture: Picture;
  RestaurantID: string;
  RestaurantName: string;
}

export const getRestaurantById = async (
  id: string,
): Promise<Restaurant | undefined> => {
  const result = await apiGet<Restaurant[]>('Tourism/Restaurant', {
    $filter: `RestaurantID eq '${id}'`,
    $top: '1',
  });

  return result[0];
};

export const getRestaurantCards = async (
  count = 30,
): Promise<RestaurantCard[]> =>
  apiGet('Tourism/Restaurant', {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
    $select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    $top: count.toString(),
  });

export const getRestaurantCardsByCity = async (
  city: City,
  count = 30,
): Promise<RestaurantCard[]> =>
  apiGet(`Tourism/Restaurant/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
    $select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    $top: count.toString(),
  });

export const getRestaurantWithRemarks = async (
  count = 30,
): Promise<RestaurantRemark[]> =>
  apiGet('Tourism/Restaurant', {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
    $select: 'RestaurantID,RestaurantName,Description,City,Address,Picture',
    $top: count.toString(),
  });

export const getRestaurantWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<RestaurantRemark[]> =>
  apiGet(`Tourism/Restaurant/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
    $select: 'RestaurantID,RestaurantName,Description,City,Address,Picture',
    $top: count.toString(),
  });

export const searchRestaurantsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<RestaurantCard[]> =>
  apiGet('Tourism/Restaurant', {
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructRestaurantsSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, Description desc',
    $select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    $top: count.toString(),
  });
