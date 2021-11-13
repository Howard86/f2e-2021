const SCENE_KEYWORDS: (keyof PTX.Scene)[] = [
  'Description',
  'Name',
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

const RESTAURANT_KEYWORDS: (keyof PTX.Restaurant)[] = [
  'Name',
  'Description',
  'Address',
  'OpenTime',
  'Class',
  'City',
  'ParkingInfo',
];

const getODataSearchCriteria = (keyword: string, value: string) =>
  `indexof(${keyword}, '${value}') gt -1`;

export const constructScenesSearch = (value: string): string =>
  SCENE_KEYWORDS.map((keyword) => getODataSearchCriteria(keyword, value)).join(
    ' or ',
  );

export const constructRestaurantsSearch = (value: string): string =>
  RESTAURANT_KEYWORDS.map((keyword) =>
    getODataSearchCriteria(keyword, value),
  ).join(' or ');
