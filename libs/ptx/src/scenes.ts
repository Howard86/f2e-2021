import { apiGet } from './lib/api';
import { constructScenesSearch } from './lib/utils';
import { PTXCityMap } from './category';
import { PTX } from './types';

export const getSceneCards = (count = 30): Promise<PTX.SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ID,City,Name,Picture',
    $filter: 'Picture/PictureUrl1 ne null and City ne null',
    $orderBy: 'TicketInfo desc',
  });

export const getScenesWithRemarks = async (
  count = 30,
): Promise<PTX.SceneRemark[]> => {
  const results = await apiGet<PTX.SceneRemark[]>('Tourism/ScenicSpot', {
    $top: (count * 5).toString(),
    $select: 'ID,Name,City,Remarks,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Remarks ne null and City ne null',
    $orderBy: 'Remarks desc, UpdateTime desc',
  });

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getSceneTheme = async (count = 30): Promise<PTX.SceneTheme[]> => {
  const rawResults = await apiGet<PTX.RawSceneTheme[]>('Tourism/ScenicSpot', {
    $top: (count * 10).toString(),
    $select: 'ID,City,Class1,Class2,Class3,Picture',
    $filter: 'Picture/PictureUrl1 ne null and City ne null and Class1 ne null',
    $orderBy: 'UpdateTime desc',
  });

  const classSet = new Set<PTX.SceneClass>();
  const results: PTX.SceneTheme[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const result of rawResults) {
    if (result.Class1 && !classSet.has(result.Class1)) {
      classSet.add(result.Class1);
      results.push({
        Class: result.Class1,
        ID: result.ID,
        Picture: result.Picture,
        City: result.City,
      });
    } else if (result.Class2 && !classSet.has(result.Class2)) {
      classSet.add(result.Class2);
      results.push({
        Class: result.Class2,
        ID: result.ID,
        Picture: result.Picture,
        City: result.City,
      });
    } else if (result.Class3 && !classSet.has(result.Class3)) {
      classSet.add(result.Class3);
      results.push({
        Class: result.Class3,
        ID: result.ID,
        Picture: result.Picture,
        City: result.City,
      });
    }
  }

  return results.filter((result) => result.Class !== '其他').slice(0, count);
};

export const getSceneCardsByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.SceneCard[]> => {
  const results = await apiGet<Omit<PTX.SceneCard, 'City'>[]>(
    `Tourism/ScenicSpot/${PTXCityMap[city]}`,
    {
      $top: count.toString(),
      $select: 'ID,Name,Picture',
      $filter: 'Picture/PictureUrl1 ne null',
      $orderBy: 'TicketInfo desc',
    },
  );
  return results.map((result) => ({ ...result, City: city }));
};

// TODO: improve this query
export const getSceneCardsByThemeClass = async (
  theme: PTX.SceneClass,
  count: number,
): Promise<PTX.SceneCard[]> =>
  apiGet<PTX.SceneCard[]>(`Tourism/ScenicSpot`, {
    $top: count.toString(),
    $select: 'ID,City,Name,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (Class1 eq '${theme}' or Class2 eq '${theme}' or Class3 eq '${theme}')`,
    $orderBy: 'TicketInfo desc',
  });

export const getScenesWithRemarksByCity = async (
  city: PTX.City,
  count = 30,
): Promise<PTX.SceneRemark[]> => {
  const results = await apiGet<PTX.SceneRemark[]>(
    `Tourism/ScenicSpot/${PTXCityMap[city]}`,
    {
      $top: (count * 5).toString(),
      $select: 'ID,Name,City,Remarks,Picture',
      $filter: 'Picture/PictureUrl1 ne null and Remarks ne null',
      $orderBy: 'Remarks desc, UpdateTime desc',
    },
  );

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getScenesWithRemarksByThemeClass = async (
  theme: PTX.SceneClass,
  count = 30,
): Promise<PTX.SceneRemark[]> => {
  const results = await apiGet<PTX.SceneRemark[]>('Tourism/ScenicSpot', {
    $top: (count * 5).toString(),
    $select: 'ID,Name,City,Remarks,Picture',
    $filter: `Picture/PictureUrl1 ne null and Remarks ne null and City ne null and (Class1 eq '${theme}' or Class2 eq '${theme}' or Class3 eq '${theme}')`,
    $orderBy: 'Remarks desc, UpdateTime desc',
  });

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getSceneById = async (
  id: string,
): Promise<PTX.Scene | undefined> => {
  const result = await apiGet<PTX.Scene[]>('Tourism/ScenicSpot', {
    $top: '1',
    $filter: `ID eq '${id}'`,
  });

  return result[0];
};

export const searchScenesByKeyword = async (
  keyword: string,
  count = 30,
): Promise<PTX.SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ID,City,Name,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructScenesSearch(
      keyword,
    )})`,
  });

export const searchScenesByKeywordAndCity = async (
  keyword: string,
  city: PTX.City,
  count = 30,
): Promise<PTX.SceneCard[]> =>
  apiGet(`Tourism/ScenicSpot/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ID,City,Name,Picture',
    $filter: `Picture/PictureUrl1 ne null and (${constructScenesSearch(
      keyword,
    )})`,
  });

export const searchScenesByKeywordAndTheme = async (
  keyword: string,
  theme: PTX.SceneClass,
  count = 30,
): Promise<PTX.SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ID,City,Name,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (Class1 eq '${theme}' or Class2 eq '${theme}' or Class3 eq '${theme}') and (${constructScenesSearch(
      keyword,
    )})`,
  });
