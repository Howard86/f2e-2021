declare namespace OpenData {
  // TODO: replace with real api from https://opendata.cwb.gov.tw/dist/opendata-swagger.html#/預報/get_v1_rest_datastore_F_C0032_001
  interface CityWeather {
    id: string;
    city: string;
    minT: string;
    maxT: string;
    weather: Weather;
  }

  type Weather =
    | '晴'
    | '短暫雨'
    | '多雲'
    | '多雲時晴'
    | '多雲時陰'
    | '晴時多雲'
    | '多雲短暫雨'
    | '陰天'
    | '晴時多雲'
    | '陰時多雲'
    | '陰短暫雨';

  interface WeatherParam {
    Authorization: string;
    limit: string; // as number
    offset: string; // as number;
    format: string;
    elementName: string[];
    // locationName: string[];
    sort: string;
    // startTime: string[]; // can be array
    timeFrom: string; // as date
    timeTo: string; // as date
  }

  interface WeatherResponse {
    success: string;
    result: {
      resource_id: string;
      fields: Field[];
    };
    records: {
      datasetDescription: string;
      location: Location[];
    };
  }

  interface Field {
    id: string;
    type: string;
  }

  interface Location {
    locationName: string;
    weatherElement: WeatherElement[];
  }

  interface WeatherElement {
    elementName: string;
    time: Time[];
  }

  interface Time {
    startTime: string;
    endTime: string;
    parameter: {
      parameterName: string;
      parameterValue?: string;
      parameterUnit?: string;
    };
  }
}
