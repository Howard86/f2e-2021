import {
  BadRequestException,
  NextApiRequestWithQuery,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import { CITIES, THEMES } from '@/constants/category';
import {
  searchScenesByKeyword,
  searchScenesByKeywordAndCity,
  searchScenesByKeywordAndTheme,
} from '@/services/ptx';

const router = new RouterBuilder();

type Query = {
  keyword: string;
  city: PTX.SceneCity;
  theme: PTX.SceneClass;
};

router.get((req: NextApiRequestWithQuery<Partial<Query>>) => {
  if (!req.query.keyword) {
    throw new BadRequestException('keyword not found');
  }

  if (req.query.city) {
    if (!CITIES.includes(req.query.city)) {
      throw new NotFoundException('city not found');
    }

    return searchScenesByKeywordAndCity(req.query.keyword, req.query.city);
  }

  if (req.query.theme) {
    if (!THEMES.includes(req.query.theme)) {
      throw new NotFoundException('theme not found');
    }

    return searchScenesByKeywordAndTheme(req.query.keyword, req.query.theme);
  }

  return searchScenesByKeyword(req.query.keyword);
});

export default router.build();
