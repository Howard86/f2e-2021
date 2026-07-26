import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import type { City, Picture, Position } from './lib/shared-types';
import { constructHotelsSearch } from './lib/utils';

export interface Hotel {
  Address: string;
  City?: string;
  Class: HotelClass;
  Description?: string;
  Fax: string;
  Grade?: string;
  HotelID: string;
  HotelName: string;
  ParkingInfo: string;
  Phone: string;
  Picture: Picture;
  Position: Position;
  ServiceInfo?: string;
  Spec?: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  WebsiteUrl?: string;
  ZipCode?: string;
}

export type HotelClass = '一般旅館' | '一般觀光旅館' | '國際觀光旅館' | '民宿';

export interface HotelCard {
  Address: string;
  City: string;
  HotelID: string;
  HotelName: string;
  Phone?: string;
  Picture: Picture;
  ServiceInfo?: string;
}

export interface HotelRemark {
  Address: string;
  City: string;
  Description: string;
  HotelID: string;
  HotelName: string;
  Picture: Picture;
}

export const getHotelById = async (id: string): Promise<Hotel | undefined> => {
  const result = await apiGet<Hotel[]>('Tourism/Hotel', {
    $filter: `HotelID eq '${id}'`,
    $top: '1',
  });

  return result[0];
};

export const getHotelCards = async (count = 30): Promise<HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
    $select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    $top: count.toString(),
  });

export const getHotelCardsByCity = async (
  city: City,
  count = 30,
): Promise<HotelCard[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
    $select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    $top: count.toString(),
  });

export const getHotelWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
    $select: 'HotelID,HotelName,Description,City,Address,Picture',
    $top: count.toString(),
  });

export const getHotelCountWithCity = async (
  city: City,
  count = 30,
): Promise<HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
    $select: 'HotelID',
    $top: count.toString(),
  });

export const searchHotelsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructHotelsSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
    $select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    $top: count.toString(),
  });
