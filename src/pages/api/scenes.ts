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
router.get(
  async (req: NextApiRequestWithQuery<Partial<Local.SearchScenesQuery>>) => {
    if (!req.query.keyword) {
      throw new BadRequestException('keyword not found');
    }

    let results: PTX.SceneCard[];

    // TODO: refactor logic
    if (req.query.city) {
      if (!CITIES.includes(req.query.city)) {
        throw new NotFoundException('city not found');
      }

      results = await searchScenesByKeywordAndCity(
        req.query.keyword,
        req.query.city,
      );
    } else if (req.query.theme) {
      if (!THEMES.includes(req.query.theme)) {
        throw new NotFoundException('theme not found');
      }

      results = await searchScenesByKeywordAndTheme(
        req.query.keyword,
        req.query.theme,
      );
    } else {
      results = await searchScenesByKeyword(req.query.keyword);
    }

    if (results.length === 0) {
      throw new NotFoundException('not results are found');
    }

    return results;
  },
);

export default router.build();
