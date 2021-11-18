import {
  BIKE_CITIES,
  BikeCycling,
  CitySlug,
  CitySlugMap,
  getCyclingShapeByCity,
} from '@f2e/ptx';
import {
  BadRequestException,
  NextApiRequestWithQuery,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';
import { GeoJSONMultiLineString, parse } from 'wellknown';

import mock from '@/mock-bike.json';

export interface BikeCyclingWithGeoJson extends BikeCycling {
  geoJson: GeoJSONMultiLineString;
}

export interface CyclingQueryParam {
  city: CitySlug;
}

const router = new RouterBuilder();

router.get<BikeCyclingWithGeoJson[]>(
  async (req: NextApiRequestWithQuery<Partial<CyclingQueryParam>>) => {
    if (!req.query.city) {
      throw new BadRequestException(`Missing city=${req.query.city}`);
    }

    const city = CitySlugMap[req.query.city];

    if (!BIKE_CITIES.includes(city)) {
      throw new NotFoundException(`City=${city} is not in the BIKE_LISTS`);
    }

    if (process.env.NODE_ENV !== 'production') {
      return mock as BikeCyclingWithGeoJson[];
    }

    const results = await getCyclingShapeByCity(city);

    return results.map((result) => ({
      ...result,
      geoJson: parse(result.Geometry) as GeoJSONMultiLineString,
    }));
  },
);

export default router.build();
