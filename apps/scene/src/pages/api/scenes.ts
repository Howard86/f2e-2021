import {
  type ApiParam,
  type City,
  CitySet,
  constructScenesSearch,
  type ScenicSpot,
} from '@f2e/tdx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import { mapScenicSpotToSceneCard, tourismService } from '@/services/tdx';

const router = new RouterBuilder();
router.get(async (req) => {
  const { keyword, city } = req.query;

  if (typeof keyword !== 'string') {
    throw new BadRequestException('keyword not found');
  }

  let results: ScenicSpot[];

  const apiParam: ApiParam = {
    filter: `Picture/PictureUrl1 ne null and (${constructScenesSearch(
      keyword,
    )})`,
    orderBy: 'SrcUpdateTime desc, Remarks desc',
    select: 'ScenicSpotID,ScenicSpotName,City,Picture',
    top: 30,
  };

  if (typeof city === 'string') {
    if (!CitySet.has(city as City)) {
      throw new NotFoundException('city not found');
    }

    results = await tourismService.getScenicSpotsByCity(city as City, apiParam);
  } else {
    results = await tourismService.getScenicSpots(apiParam);
  }

  if (results.length === 0) {
    throw new NotFoundException('not results are found');
  }

  return results.map(mapScenicSpotToSceneCard);
});

export default router.build();
