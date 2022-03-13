import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import { City, Picture, Position } from './lib/shared-types';
import { constructHotelsSearch } from './lib/utils';

export interface Hotel {
  HotelID: string;
  HotelName: string;
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
  HotelID: string;
  HotelName: string;
  City: string;
  Address: string;
  ServiceInfo?: string;
  Phone?: string;
  Picture: Picture;
}

export interface HotelRemark {
  HotelID: string;
  HotelName: string;
  Description: string;
  City: string;
  Address: string;
  Picture: Picture;
}

export const getHotelById = async (id: string): Promise<Hotel | undefined> => {
  const result = await apiGet<Hotel[]>('Tourism/Hotel', {
    $top: '1',
    $filter: `HotelID eq '${id}'`,
  });

  return result[0];
};

export const getHotelCards = async (count = 30): Promise<HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $top: count.toString(),
    $select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
  });

export const getHotelCardsByCity = async (
  city: City,
  count = 30,
): Promise<HotelCard[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
  });

export const getHotelWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'HotelID,HotelName,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
  });

export const getHotelCountWithCity = async (
  city: City,
  count = 30,
): Promise<HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'HotelID',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
  });

export const searchHotelsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $top: count.toString(),
    $select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructHotelsSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
  });
