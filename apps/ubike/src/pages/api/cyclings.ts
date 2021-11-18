import {
  AvailableBike,
  BIKE_CITIES,
  BikeCycling,
  CitySlug,
  CitySlugMap,
  getCyclingShapeByCity,
  Station,
} from '@f2e/ptx';
import {
  BadRequestException,
  NextApiRequestWithQuery,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import mock from '@/mock-bike.json';

export interface StationWithBike extends Station {
  bike: AvailableBike;
}

export interface CyclingQueryParam {
  city: CitySlug;
}

const router = new RouterBuilder();

router.get<BikeCycling[]>(
  async (req: NextApiRequestWithQuery<Partial<CyclingQueryParam>>) => {
    if (!req.query.city) {
      throw new BadRequestException(`Missing city=${req.query.city}`);
    }

    const city = CitySlugMap[req.query.city];

    if (!BIKE_CITIES.includes(city)) {
      throw new NotFoundException(`City=${city} is not in the BIKE_LISTS`);
    }

    if (process.env.NODE_ENV !== 'production') {
      return mock as BikeCycling[];
    }

    return getCyclingShapeByCity(city);
  },
);

export default router.build();
