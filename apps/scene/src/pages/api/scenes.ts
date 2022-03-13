import {
  CITIES,
  City,
  SceneCard,
  SceneClass,
  searchScenesByKeyword,
  searchScenesByKeywordAndCity,
  searchScenesByKeywordAndTheme,
  THEMES,
} from '@f2e/ptx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

const router = new RouterBuilder();
router.get(async (req) => {
  if (typeof req.query.keyword !== 'string') {
    throw new BadRequestException('keyword not found');
  }

  let results: SceneCard[];

  // TODO: refactor logic
  if (typeof req.query.city === 'string') {
    if (!CITIES.includes(req.query.city as City)) {
      throw new NotFoundException('city not found');
    }

    results = await searchScenesByKeywordAndCity(
      req.query.keyword,
      req.query.city as City,
    );
  } else if (typeof req.query.theme === 'string') {
    if (!THEMES.includes(req.query.theme as SceneClass)) {
      throw new NotFoundException('theme not found');
    }

    results = await searchScenesByKeywordAndTheme(
      req.query.keyword,
      req.query.theme as SceneClass,
    );
  } else {
    results = await searchScenesByKeyword(req.query.keyword);
  }

  if (results.length === 0) {
    throw new NotFoundException('not results are found');
  }

  return results;
});

export default router.build();
