import { Activity, Hotel, Restaurant, ScenicSpot } from './tourism';

const SCENE_KEYWORDS: (keyof ScenicSpot)[] = [
  'Description',
  'ScenicSpotName',
  'DescriptionDetail',
  'Keyword',
  'Remarks',
  'TravelInfo',
  'TicketInfo',
  'Address',
  'Class1',
  'Class2',
  'Class3',
];

const RESTAURANT_KEYWORDS: (keyof Restaurant)[] = [
  'RestaurantName',
  'Description',
  'Address',
  'OpenTime',
  'Class',
  'City',
  'ParkingInfo',
];

const HOTEL_KEYWORDS: (keyof Hotel)[] = [
  'Address',
  'City',
  'Class',
  'Description',
  'Grade',
  'HotelName',
  'ParkingInfo',
  'ServiceInfo',
  'Spec',
];

const ACTIVITY_KEYWORDS: (keyof Activity)[] = [
  'ActivityName',
  'Description',
  'Particpation',
  'Address',
  'Organizer',
  'StartTime',
  'EndTime',
  'Class1',
  'Class2',
  'City',
  'ParkingInfo',
  'Charge',
  'TravelInfo',
];

const getODataSearchCriteria = (keyword: string, value: string) =>
  `indexof(${keyword}, '${value}') gt -1`;

const OR_STATEMENT = ' or ';

export const constructScenesSearch = (value: string): string =>
  SCENE_KEYWORDS.map((keyword) => getODataSearchCriteria(keyword, value)).join(
    OR_STATEMENT,
  );

export const constructRestaurantsSearch = (value: string): string =>
  RESTAURANT_KEYWORDS.map((keyword) =>
    getODataSearchCriteria(keyword, value),
  ).join(OR_STATEMENT);

export const constructHotelsSearch = (value: string): string =>
  HOTEL_KEYWORDS.map((keyword) => getODataSearchCriteria(keyword, value)).join(
    OR_STATEMENT,
  );

export const constructActivitiesSearch = (value: string): string =>
  ACTIVITY_KEYWORDS.map((keyword) =>
    getODataSearchCriteria(keyword, value),
  ).join(OR_STATEMENT);
