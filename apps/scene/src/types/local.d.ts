import { City, SceneClass } from '@f2e/ptx';

declare namespace Local {
  interface SearchScenesQuery {
    keyword: string;
    city: City;
    theme: SceneClass;
  }

  interface SearchQuery {
    keyword: string;
    city: City;
  }
}
