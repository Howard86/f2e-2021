export interface Picture {
  PictureUrl1?: string;
  PictureDescription1?: string;
  PictureUrl2?: string;
  PictureDescription2?: string;
  PictureUrl3?: string;
  PictureDescription3?: string;
}

export interface Position {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}

export type City =
  | '臺北市'
  | '新北市'
  | '桃園市'
  | '臺中市'
  | '臺南市'
  | '高雄市'
  | '基隆市'
  | '新竹市'
  | '新竹縣'
  | '苗栗縣'
  | '彰化縣'
  | '南投縣'
  | '雲林縣'
  | '嘉義縣'
  | '嘉義市'
  | '屏東縣'
  | '宜蘭縣'
  | '花蓮縣'
  | '臺東縣'
  | '金門縣'
  | '澎湖縣'
  | '連江縣';

export type CitySlug =
  | 'taipei'
  | 'newtaipei'
  | 'taoyuan'
  | 'taichung'
  | 'tainan'
  | 'kaohsiung'
  | 'keelung'
  | 'hsinchu'
  | 'hsinchucounty'
  | 'miaolicounty'
  | 'changhuacounty'
  | 'nantoucounty'
  | 'yunlincounty'
  | 'chiayicounty'
  | 'chiayi'
  | 'pingtungcounty'
  | 'yilancounty'
  | 'hualiencounty'
  | 'taitungcounty'
  | 'kinmencounty'
  | 'penghucounty'
  | 'lienchiangcounty';
