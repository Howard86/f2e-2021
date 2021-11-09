declare namespace Weather {
  // TODO: replace with real api from https://opendata.cwb.gov.tw/dist/opendata-swagger.html#/預報/get_v1_rest_datastore_F_C0032_001
  interface City {
    id: string;
    city: string;
    temperature: number;
  }
}
