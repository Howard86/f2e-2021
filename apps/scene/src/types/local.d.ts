import { PTX } from '@f2e/ptx';

declare namespace Local {
  interface SearchScenesQuery {
    keyword: string;
    city: PTX.City;
    theme: PTX.SceneClass;
  }

  interface SearchQuery {
    keyword: string;
    city: PTX.City;
  }
}
