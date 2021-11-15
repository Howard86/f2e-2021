import { apiGet } from './lib/api';
import { constructHotelsSearch } from './lib/utils';
import { PTXCityMap } from './category';
import { PTX } from './types';

export const getHotelById = async (
  id: string,
): Promise<PTX.Hotel | undefined> => {
  const result = await apiGet<PTX.Hotel[]>('Tourism/Hotel', {
    $top: '1',
    $filter: `ID eq '${id}'`,
  });

  return result[0];
};

export const getHotelCards = async (count = 30): Promise<PTX.HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,ServiceInfo,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null and City ne null',
    $orderBy: 'ServiceInfo desc',
  });

export const getHotelCardsByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.HotelCard[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,ServiceInfo,Phone,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'ServiceInfo desc',
  });

export const getHotelWithRemarksByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,Name,Description,City,Address,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
    $orderBy: 'ServiceInfo desc, UpdateTime desc',
  });

export const getHotelCountWithCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.HotelRemark[]> =>
  apiGet(`Tourism/Hotel/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID',
    $filter: 'Picture/PictureUrl1 ne null and Address ne null',
  });

export const searchHotelsByKeyword = async (
  keyword: string,
  count = 30,
): Promise<PTX.HotelCard[]> =>
  apiGet('Tourism/Hotel', {
    $top: count.toString(),
    $select: 'ID,Name,City,Address,ServiceInfo,Phone,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructHotelsSearch(
      keyword,
    )})`,
  });
