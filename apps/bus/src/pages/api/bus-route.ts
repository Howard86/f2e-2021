import {
  BusRoute,
  CITIES,
  CitySlug,
  CitySlugMap,
  getBusRoutesByCity,
} from '@f2e/ptx';
import {
  BadRequestException,
  NextApiRequestWithQuery,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

const router = new RouterBuilder();

export interface BusRouteParam {
  city: CitySlug;
}

router.get<BusRoute[]>(
  (req: NextApiRequestWithQuery<Partial<BusRouteParam>>) => {
    if (!req.query.city) {
      throw new BadRequestException(`missing query 'city'`);
    }

    const city = CitySlugMap[req.query.city];

    if (!CITIES.includes(city)) {
      throw new NotFoundException(`city ${req.query.city} does not exist`);
    }

    return getBusRoutesByCity(city, 99999);
  },
);

export default router.build();
