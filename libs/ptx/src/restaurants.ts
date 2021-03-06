import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import { City, Picture, Position } from './lib/shared-types';
import { constructRestaurantsSearch } from './lib/utils';

export interface Restaurant {
  RestaurantID: string;
  RestaurantName: string;
  Description: string;
  Address: string;
  ZipCode?: string;
  Phone: string;
  OpenTime?: string;
  WebsiteUrl?: string;
  Picture: Picture;
  Position: Position;
  Class?: RestaurantClass;
  SrcUpdateTime: string;
  UpdateTime: string;
  City?: string;
  ParkingInfo?: string;
  MapUrl?: string;
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
  RestaurantID: string;
  RestaurantName: string;
  City: string;
  Address: string;
  OpenTime?: string;
  Phone?: string;
  Picture: Picture;
}

export interface RestaurantRemark {
  RestaurantID: string;
  RestaurantName: string;
  Description: string;
  City: string;
  Address: string;
  Picture: Picture;
}

export const getRestaurantById = async (
  id: string,
): Promise<Restaurant | undefined> => {
  const result = await apiGet<Restaurant[]>('Tourism/Restaurant', {
    $top: '1',
    $filter: `RestaurantID eq '${id}'`,
  });

  return result[0];
};

export const getRestaurantCards = async (
  count = 30,
): Promise<RestaurantCard[]> =>
  apiGet('Tourism/Restaurant', {
    $top: count.toString(),
    $select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
  });

export const getRestaurantCardsByCity = async (
  city: City,
  count = 30,
): Promise<RestaurantCard[]> =>
  apiGet(`Tourism/Restaurant/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
  });

export const getRestaurantWithRemarks = async (
  count = 30,
): Promise<RestaurantRemark[]> =>
  apiGet('Tourism/Restaurant', {
    $top: count.toString(),
    $select: 'RestaurantID,RestaurantName,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
  });

export const getRestaurantWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<RestaurantRemark[]> =>
  apiGet(`Tourism/Restaurant/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'RestaurantID,RestaurantName,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, Description desc',
  });

export const searchRestaurantsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<RestaurantCard[]> =>
  apiGet('Tourism/Restaurant', {
    $top: count.toString(),
    $select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructRestaurantsSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, Description desc',
  });
