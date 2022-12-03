declare namespace Local {
  import { City } from '@f2e/tdx';

  interface SearchQuery {
    keyword: string;
    city: City;
  }
}
