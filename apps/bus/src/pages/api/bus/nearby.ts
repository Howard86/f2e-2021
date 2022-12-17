import { BusStation } from '@f2e/tdx';
import { BadRequestException, RouterBuilder } from 'next-api-handler';

import { busService } from '@/services/tdx';

export interface StationQueryParam {
  lat: string;
  lng: string;
}

const router = new RouterBuilder();

router.get<BusStation[]>(async (req) => {
  if (typeof req.query.lat !== 'string' || typeof req.query.lng !== 'string')
    throw new BadRequestException(
      `Incorrect lat=${req.query.lat} or ${req.query.lng}`,
    );

  const latitude = Number.parseFloat(req.query.lat);
  const longitude = Number.parseFloat(req.query.lng);

  if (Number.isNaN(latitude) || Number.isNaN(longitude))
    throw new BadRequestException(
      `Incorrect lat=${req.query.lat} or ${req.query.lng}`,
    );

  return busService.getBusStationNearBy({
    spatialFilter: `nearby(${latitude}, ${longitude}, 1000)`,
  });
});

export default router.build();
