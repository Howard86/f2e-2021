declare namespace PTX {
  interface ApiParam {
    $top: string;
    $skip: string;
    $orderBy: string;
    $filter: string;
    $select: string;
    $spatialFilter: string;
  }

  interface SceneCard {
    ID: string;
    Name: string;
    City: string;
    Picture: {
      PictureUrl1: string;
    };
  }

  interface SceneRemark {
    ID: string;
    Name: string;
    City: string;
    Remarks: string;
    Picture: {
      PictureUrl1: string;
    };
  }

  interface SceneTheme {
    ID: string;
    City: string;
    Class: SceneClass;
    Picture: {
      PictureUrl1: string;
    };
  }

  interface RawSceneTheme {
    ID: string;
    City: string;
    Class1?: SceneClass;
    Class2?: SceneClass;
    Class3?: SceneClass;
    Picture: {
      PictureUrl1: string;
    };
  }

  interface Scene {
    ID: string;
    Name: string;
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
  type SceneClass =
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

  type City =
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

  type CitySlug =
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

  interface Restaurant {
    ID: string;
    Name: string;
    Description: string;
    Address: string;
    ZipCode?: string;
    Phone: string;
    OpenTime?: string;
    WebsiteUrl?: string;
    Picture: Picture;
    Position: Position;
    Class?: RestaurantClass;
    SrcUpdateTime: string;
    UpdateTime: string;
    City?: string;
    ParkingInfo?: string;
    MapUrl?: string;
  }

  type RestaurantClass =
    | '中式美食'
    | '伴手禮'
    | '其他'
    | '地方特產'
    | '夜市小吃'
    | '甜點冰品'
    | '異國料理'
    | '素食';

  interface RestaurantCard {
    ID: string;
    Name: string;
    City: string;
    Address: string;
    OpenTime?: string;
    Phone?: string;
    Picture: Picture;
  }

  interface RestaurantRemark {
    ID: string;
    Name: string;
    Description: string;
    City: string;
    Address: string;
    Picture: Picture;
  }

  interface Hotel {
    ID: string;
    Name: string;
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

  type HotelClass = '一般旅館' | '一般觀光旅館' | '國際觀光旅館' | '民宿';

  interface HotelCard {
    ID: string;
    Name: string;
    City: string;
    Address: string;
    ServiceInfo?: string;
    Phone?: string;
    Picture: Picture;
  }

  interface Activity {
    ID: string;
    Name: string;
    Description: string;
    Particpation?: string;
    Location?: string;
    Address?: string;
    Phone?: string;
    Organizer: string;
    StartTime: string;
    EndTime: string;
    Picture: Picture;
    Position: Position;
    Class1?: string;
    SrcUpdateTime: string;
    UpdateTime: string;
    Class2?: string;
    Cycle?: string;
    WebsiteUrl?: string;
    City?: string;
    ParkingInfo?: string;
    Charge?: string;
    MapUrl?: string;
    TravelInfo?: string;
  }

  interface ActivityCard {
    ID: string;
    Name: string;
    City: string;
    Address: string;
    Phone: string;
    Picture: Picture;
    StartTime: string;
    EndTime: string;
  }

  interface Picture {
    PictureUrl1?: string;
    PictureDescription1?: string;
    PictureUrl2?: string;
    PictureDescription2?: string;
    PictureUrl3?: string;
    PictureDescription3?: string;
  }

  interface Position {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  }
}
