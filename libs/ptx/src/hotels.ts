import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import { City, Picture, Position } from './lib/shared-types';
import { constructHotelsSearch } from './lib/utils';

export interface Hotel {
  ID: string;
  Name: string;
  Description?: string;
  Address: string;
  ZipCode?: string;
  Phone: string;
  Fax: string;
  Picture: Picture;
  Position: Position;
  Class: HotelClass;
  ParkingInfo: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  Grade?: string;
  ServiceInfo?: string;
  WebsiteUrl?: string;
  Spec?: string;
  City?: string;
}

export type HotelClass = '一般旅館' | '一般觀光旅館' | '國際觀光旅館' | '民宿';

export interface HotelCard {
  ID: string;
  Name: string;
  City: string;
  Address: string;
  ServiceInfo?: string;
  Phone?: string;
  Picture: Picture;
}

export interface HotelRemark {
  ID: string;
  Name: string;
  Description: string;
  City: string;
  Address: string;
  Picture: Picture;
}

export const getHotelById = async (id: string): Promise<Hotel | undefined> => {
  const result = await apiGet<Hotel[]>('Tourism/Hotel', {
    $top: '1',
    $filter: `ID eq '${id}'`,
  });

  return result[0];
};

export const getHotelCards = async (count = 30): Promise<HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,ServiceInfo,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'ServiceInfo desc',
  });

export const getHotelCardsByCity = async (
  city: City,
  count = 30,
): Promise<HotelCard[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,ServiceInfo,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'ServiceInfo desc',
  });

export const getHotelWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'ServiceInfo desc, UpdateTime desc',
  });

export const getHotelCountWithCity = async (
  city: City,
  count = 30,
): Promise<HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
  });

export const searchHotelsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,ServiceInfo,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructHotelsSearch(
      keyword,
    )})`,
  });
