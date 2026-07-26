import { type BusEstimation, type City, CitySet } from '@f2e/tdx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import { busService } from '@/services/tdx';

const router = new RouterBuilder();

export interface BusEstimationParam {
  city: City;
  route: string;
}

router.get<BusEstimation[]>((req) => {
  if (
    typeof req.query.city !== 'string' ||
    typeof req.query.route !== 'string'
  ) {
    throw new BadRequestException(`missing query ${JSON.stringify(req.query)}`);
  }

  const city = req.query.city as City;

  if (!CitySet.has(city)) {
    throw new NotFoundException(`city ${city} does not exist`);
  }

  return busService.getBusEstimationsByCityAndRouteName(city, req.query.route);
});

export default router.build();
