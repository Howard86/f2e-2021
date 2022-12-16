import { City, CitySet } from '@f2e/tdx';
import { BadRequestException, RouterBuilder } from 'next-api-handler';

import { busService } from '@/services/tdx';

const router = new RouterBuilder();

router.get((req) => {
  const city = req.query.city as City;
  const { route } = req.query;

  if (
    typeof city !== 'string' ||
    !CitySet.has(city) ||
    typeof route !== 'string'
  )
    throw new BadRequestException(
      `Missing required query=${JSON.stringify(req.query)}`,
    );

  return busService.getBusRoutesByCityAndRouteName(city, route, {
    top: 20,
    filter: undefined,
  });
});

export default router.build();
