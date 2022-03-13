import {
  AvailableBikeInfo,
  BikeQueryParam,
  getNearByAvailableBikes,
  getNearByStations,
  StationInfo,
} from '@f2e/ptx';
import { BadRequestException, RouterBuilder } from 'next-api-handler';

import mock from '@/mock.json';

export interface StationWithBike extends StationInfo {
  bike: AvailableBikeInfo;
}

export interface StationQueryParam {
  lat: string;
  lng: string;
  r: string;
}

const router = new RouterBuilder();

router.get<StationWithBike[]>(async (req) => {
  if (
    typeof req.query.lat !== 'string' ||
    typeof req.query.lng !== 'string' ||
    typeof req.query.r !== 'string'
  ) {
    throw new BadRequestException(
      `Incorrect lat=${req.query.lat} or ${req.query.lng} or r=${req.query.r}`,
    );
  }

  const latitude = Number.parseFloat(req.query.lat);
  const longitude = Number.parseFloat(req.query.lng);
  const radius = Number.parseFloat(req.query.r);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    throw new BadRequestException(
      `Incorrect lat=${req.query.lat} or ${req.query.lng}`,
    );
  }

  if (Number.isNaN(radius) || radius < 500 || radius > 1000) {
    throw new BadRequestException(`Invalid input of radisu ${radius}`);
  }

  if (process.env.NODE_ENV !== 'production') {
    return mock;
  }

  const defaultQuery: BikeQueryParam = {
    lat: latitude,
    lng: longitude,
    count: 30,
    meter: radius,
  };

  const [stations, bikes] = await Promise.all([
    getNearByStations(defaultQuery),
    getNearByAvailableBikes(defaultQuery),
  ]);

  return stations.map((station, index) => ({
    ...station,
    bike: bikes[index],
  }));
});

export default router.build();
