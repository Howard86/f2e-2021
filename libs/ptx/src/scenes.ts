import { apiGet } from './lib/api';
import { PTXCityMap } from './lib/category';
import { City, Picture, Position } from './lib/shared-types';
import { constructScenesSearch } from './lib/utils';

export interface SceneCard {
  ScenicSpotID: string;
  ScenicSpotName: string;
  City: string;
  Picture: {
    PictureUrl1: string;
  };
}

export interface SceneRemark {
  ScenicSpotID: string;
  ScenicSpotName: string;
  City: string;
  Remarks: string;
  Picture: {
    PictureUrl1: string;
  };
}

export interface SceneTheme {
  ScenicSpotID: string;
  City: string;
  Class: SceneClass;
  Picture: {
    PictureUrl1: string;
  };
}

export interface RawSceneTheme {
  ScenicSpotID: string;
  City: string;
  Class1?: SceneClass;
  Class2?: SceneClass;
  Class3?: SceneClass;
  Picture: {
    PictureUrl1: string;
  };
}

export interface Scene {
  ScenicSpotID: string;
  ScenicSpotName: string;
  City?: string;
  DescriptionDetail: string;
  Description?: string;
  Phone: string;
  Address: string;
  ZipCode?: string;
  TravelInfo?: string;
  OpenTime: string;
  Picture: Picture;
  Position: Position;
  // API return {}
  ParkingPosition: unknown;
  TicketInfo?: string;
  Remarks?: string;
  SrcUpdateTime: string;
  UpdateTime: string;
  Class1?: SceneClass;
  Level?: string;
  MapUrl?: string;
  Class2?: SceneClass;
  Class3?: SceneClass;
  WebsiteUrl?: string;
  Keyword?: string;
}

// generate from 3,000 results with https://app.quicktype.io
export type SceneClass =
  | '休閒農業類'
  | '其他'
  | '古蹟類'
  | '國家公園類'
  | '國家風景區類'
  | '小吃/特產類'
  | '廟宇類'
  | '文化類'
  | '林場類'
  | '森林遊樂區類'
  | '溫泉類'
  | '生態類'
  | '自然風景類'
  | '藝術類'
  | '觀光工廠類'
  | '遊憩類'
  | '都會公園類'
  | '體育健身類';

export const getSceneCards = (count = 30): Promise<SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Picture',
    $filter: 'Picture/PictureUrl1 ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, TicketInfo desc',
  });

export const getScenesWithRemarks = async (
  count = 30,
): Promise<SceneRemark[]> => {
  const results = await apiGet<SceneRemark[]>('Tourism/ScenicSpot', {
    $top: (count * 5).toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Remarks,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Remarks ne null and City ne null',
    $orderBy: 'SrcUpdateTime desc, Remarks desc',
  });

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getSceneTheme = async (count = 30): Promise<SceneTheme[]> => {
  const rawResults = await apiGet<RawSceneTheme[]>('Tourism/ScenicSpot', {
    $top: (count * 10).toString(),
    $select: 'ScenicSpotID,City,Class1,Class2,Class3,Picture',
    $filter: 'Picture/PictureUrl1 ne null and City ne null and Class1 ne null',
    $orderBy: 'SrcUpdateTime desc, Remarks desc',
  });

  const classSet = new Set<SceneClass>();
  const results: SceneTheme[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const result of rawResults) {
    if (result.Class1 && !classSet.has(result.Class1)) {
      classSet.add(result.Class1);
      results.push({
        Class: result.Class1,
        ScenicSpotID: result.ScenicSpotID,
        Picture: result.Picture,
        City: result.City,
      });
    } else if (result.Class2 && !classSet.has(result.Class2)) {
      classSet.add(result.Class2);
      results.push({
        Class: result.Class2,
        ScenicSpotID: result.ScenicSpotID,
        Picture: result.Picture,
        City: result.City,
      });
    } else if (result.Class3 && !classSet.has(result.Class3)) {
      classSet.add(result.Class3);
      results.push({
        Class: result.Class3,
        ScenicSpotID: result.ScenicSpotID,
        Picture: result.Picture,
        City: result.City,
      });
    }
  }

  return results.filter((result) => result.Class !== '其他').slice(0, count);
};

export const getSceneCardsByCity = async (
  city: City,
  count = 30,
): Promise<SceneCard[]> => {
  const results = await apiGet<Omit<SceneCard, 'City'>[]>(
    `Tourism/ScenicSpot/${PTXCityMap[city]}`,
    {
      $top: count.toString(),
      $select: 'ScenicSpotID,ScenicSpotName,Picture',
      $filter: 'Picture/PictureUrl1 ne null',
      $orderBy: 'SrcUpdateTime desc, TicketInfo desc',
    },
  );
  return results.map((result) => ({ ...result, City: city }));
};

// TODO: improve this query
export const getSceneCardsByThemeClass = async (
  theme: SceneClass,
  count: number,
): Promise<SceneCard[]> =>
  apiGet<SceneCard[]>(`Tourism/ScenicSpot`, {
    $top: count.toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (Class1 eq '${theme}' or Class2 eq '${theme}' or Class3 eq '${theme}')`,
    $orderBy: 'SrcUpdateTime desc, TicketInfo desc',
  });

export const getScenesWithRemarksByCity = async (
  city: City,
  count = 30,
): Promise<SceneRemark[]> => {
  const results = await apiGet<SceneRemark[]>(
    `Tourism/ScenicSpot/${PTXCityMap[city]}`,
    {
      $top: (count * 5).toString(),
      $select: 'ScenicSpotID,ScenicSpotName,City,Remarks,Picture',
      $filter: 'Picture/PictureUrl1 ne null and Remarks ne null',
      $orderBy: 'SrcUpdateTime desc, Remarks desc',
    },
  );

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getScenesWithRemarksByThemeClass = async (
  theme: SceneClass,
  count = 30,
): Promise<SceneRemark[]> => {
  const results = await apiGet<SceneRemark[]>('Tourism/ScenicSpot', {
    $top: (count * 5).toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Remarks,Picture',
    $filter: `Picture/PictureUrl1 ne null and Remarks ne null and City ne null and (Class1 eq '${theme}' or Class2 eq '${theme}' or Class3 eq '${theme}')`,
    $orderBy: 'SrcUpdateTime desc, Remarks desc',
  });

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getSceneById = async (id: string): Promise<Scene | undefined> => {
  const result = await apiGet<Scene[]>('Tourism/ScenicSpot', {
    $top: '1',
    $filter: `ScenicSpotID eq '${id}'`,
  });

  return result[0];
};

export const searchScenesByKeyword = async (
  keyword: string,
  count = 30,
): Promise<SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (${constructScenesSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, Remarks desc',
  });

export const searchScenesByKeywordAndCity = async (
  keyword: string,
  city: City,
  count = 30,
): Promise<SceneCard[]> =>
  apiGet(`Tourism/ScenicSpot/${PTXCityMap[city]}`, {
    $top: count.toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Picture',
    $filter: `Picture/PictureUrl1 ne null and (${constructScenesSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, Remarks desc',
  });

export const searchScenesByKeywordAndTheme = async (
  keyword: string,
  theme: SceneClass,
  count = 30,
): Promise<SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ScenicSpotID,ScenicSpotName,City,Picture',
    $filter: `Picture/PictureUrl1 ne null and City ne null and (Class1 eq '${theme}' or Class2 eq '${theme}' or Class3 eq '${theme}') and (${constructScenesSearch(
      keyword,
    )})`,
    $orderBy: 'SrcUpdateTime desc, Remarks desc',
  });
