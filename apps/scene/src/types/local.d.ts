declare namespace Local {
  import { City } from '@f2e/tdx';

  interface SearchQuery {
    city: City;
    keyword: string;
  }
}
