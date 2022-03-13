import {
  BIKE_CITIES,
  BikeCyclingInfo,
  CitySlug,
  CitySlugMap,
  getCyclingShapeByCity,
} from '@f2e/ptx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';
import { GeoJSONMultiLineString, parse } from 'wellknown';

import mock from '@/mock-bike.json';

export interface BikeCyclingWithGeoJson
  extends Omit<BikeCyclingInfo, 'Geometry'> {
  geoJson: GeoJSONMultiLineString;
}

export interface CyclingQueryParam {
  city: CitySlug;
}

const router = new RouterBuilder();

router.get<BikeCyclingWithGeoJson[]>(async (req) => {
  if (typeof req.query.city !== 'string') {
    throw new BadRequestException(`Missing city=${req.query.city}`);
  }

  const city = CitySlugMap[req.query.city];

  if (!BIKE_CITIES.includes(city)) {
    throw new NotFoundException(`City=${city} is not in the BIKE_LISTS`);
  }

  if (process.env.NODE_ENV !== 'production') {
    return mock as unknown as BikeCyclingWithGeoJson[];
  }

  const results = await getCyclingShapeByCity(city);

  return results.map(({ Geometry, ...rest }) => ({
    ...rest,
    geoJson: parse(Geometry) as GeoJSONMultiLineString,
  }));
});

export default router.build();
