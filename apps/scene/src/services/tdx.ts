import {
  Activity,
  CityMap,
  Hotel,
  Restaurant,
  ScenicSpot,
  TdxService,
  TourismService,
} from '@f2e/tdx';

import { PlaceCardProps } from '@/components/PlaceCard';
import { SceneCardProps } from '@/components/SceneCard';

export const service = new TdxService({
  baseUrl: process.env.TDX_BASE_URL,
  clientId: process.env.TDX_CLIENT_ID,
  clientSecret: process.env.TDX_CLIENT_SECRET,
});

export const tourismService = new TourismService(service);

const serializeUndefined = <T extends object>(item: T) => {
  const newObject = {} as T;

  for (const key of Object.keys(item)) {
    if (item[key] !== undefined) {
      newObject[key] = item[key];
    }
  }

  return newObject;
};

export const mapScenicSpotToSceneCard = (item: ScenicSpot): SceneCardProps =>
  serializeUndefined({
    name: item.ScenicSpotName,
    city: item.City,
    image: item.Picture.PictureUrl1,
    href: `/${CityMap[item.City]}/scene/${item.ScenicSpotID}`,
  });

export const mapRestaurantToPlaceCard = (item: Restaurant): PlaceCardProps =>
  serializeUndefined({
    name: item.RestaurantName,
    city: item.City,
    image: item.Picture.PictureUrl1,
    address: item.Address,
    contactNumber: item.Phone,
    openingHours: item.OpenTime,
    href: `/${CityMap[item.City]}/restaurant/${item.RestaurantID}`,
  });

export const mapHotelToPlaceCard = (item: Hotel): PlaceCardProps =>
  serializeUndefined({
    name: item.HotelName,
    city: item.City,
    image: item.Picture.PictureUrl1,
    address: item.Address,
    contactNumber: item.Phone,
    openingHours: item.ServiceInfo,
    href: `/${CityMap[item.City]}/hotel/${item.HotelID}`,
  });

export const mapActivityToPlaceCard = (item: Activity): PlaceCardProps =>
  serializeUndefined({
    name: item.ActivityName,
    city: item.City,
    image: item.Picture.PictureUrl1,
    address: item.Address,
    contactNumber: item.Phone,
    href: `/${CityMap[item.City]}/activity/${item.ActivityID}`,
    openingHours:
      item.StartTime && item.EndTime
        ? `${new Date(item.StartTime).toLocaleDateString()}~${new Date(
            item.EndTime,
          ).toLocaleDateString()}`
        : undefined,
  });
