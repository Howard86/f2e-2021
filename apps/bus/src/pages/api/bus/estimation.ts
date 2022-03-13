import {
  BusEstimationInfo,
  CITIES,
  CitySlug,
  CitySlugMap,
  getBusEstimationsByRouteAndCity,
} from '@f2e/ptx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

const router = new RouterBuilder();

export interface BusEstimationParam {
  route: string;
  city: CitySlug;
}

router.get<BusEstimationInfo[]>((req) => {
  if (
    typeof req.query.city !== 'string' ||
    typeof req.query.route !== 'string'
  ) {
    throw new BadRequestException(`missing query ${JSON.stringify(req.query)}`);
  }

  const city = CitySlugMap[req.query.city];

  if (!CITIES.includes(city)) {
    throw new NotFoundException(`city ${req.query.city} does not exist`);
  }

  return getBusEstimationsByRouteAndCity(req.query.route, city);
});

export default router.build();
