export const SCENE_KEYWORDS: (keyof PTX.Scene)[] = [
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

export const constructODataSearch = (value: string): string =>
  SCENE_KEYWORDS.map((keyword) => `indexof(${keyword}, '${value}') gt -1`).join(
    ' or ',
  );
