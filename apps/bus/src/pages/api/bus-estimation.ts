import {
  BusEstimation,
  CITIES,
  CitySlug,
  CitySlugMap,
  getBusEstimationByRouteAndCity,
} from '@f2e/ptx';
import {
  BadRequestException,
  NextApiRequestWithQuery,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

const router = new RouterBuilder();

export interface BusEstimationParam {
  route: string;
  city: CitySlug;
}

router.get<BusEstimation[]>(
  (req: NextApiRequestWithQuery<Partial<BusEstimationParam>>) => {
    if (!req.query.city || !req.query.route) {
      throw new BadRequestException(
        `missing query ${JSON.stringify(req.query)}`,
      );
    }

    const city = CitySlugMap[req.query.city];

    if (!CITIES.includes(city)) {
      throw new NotFoundException(`city ${req.query.city} does not exist`);
    }

    return getBusEstimationByRouteAndCity(req.query.route, city);
  },
);

export default router.build();
