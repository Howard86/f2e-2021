import { constructRestaurantsSearch } from '@f2e/tdx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import { mapRestaurantToPlaceCard, tourismService } from '@/services/tdx';

const router = new RouterBuilder();
router.get(async (req) => {
  const { keyword } = req.query;

  if (typeof keyword !== 'string')
    throw new BadRequestException('keyword not found');

  const results = await tourismService.getRestaurants({
    top: 30,
    select: 'RestaurantID,RestaurantName,City,Address,OpenTime,Phone,Picture',
    filter: `Picture/PictureUrl1 ne null and City ne null and (${constructRestaurantsSearch(
      keyword,
    )})`,
    orderBy: 'SrcUpdateTime desc, Description desc',
  });

  if (results.length === 0)
    throw new NotFoundException('not results are found');

  return results.map(mapRestaurantToPlaceCard);
});

export default router.build();
