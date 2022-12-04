import { City, CitySet, CyclingShape } from '@f2e/tdx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';
import { GeoJSONMultiLineString, parse } from 'wellknown';

import mock from '@/mock-bike.json';
import { bikeService } from '@/services/tdx';

export interface BikeCyclingWithGeoJson extends Omit<CyclingShape, 'Geometry'> {
  geoJson: GeoJSONMultiLineString;
}

const router = new RouterBuilder();

router.get<BikeCyclingWithGeoJson[]>(async (req) => {
  const { city } = req.query;

  if (typeof city !== 'string')
    throw new BadRequestException(`Missing city=${city}`);

  // TODO: check supported city list
  if (!CitySet.has(city as City))
    throw new NotFoundException(`City=${city} is not in the BIKE_LISTS`);

  if (process.env.NODE_ENV !== 'production')
    return mock as BikeCyclingWithGeoJson[];

  const results = await bikeService.getCyclingShapeByCity(city as City, {
    top: 200,
    filter: 'CyclingLength gt 1000 and Geometry ne null',
    orderBy: 'CyclingLength desc',
  });

  return results.map(({ Geometry, ...rest }) => ({
    ...rest,
    geoJson: parse(Geometry) as GeoJSONMultiLineString,
  }));
});

export default router.build();
