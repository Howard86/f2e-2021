import { BikeAvailability, BikeStation } from '@f2e/tdx';
import { BadRequestException, RouterBuilder } from 'next-api-handler';

import mock from '@/mock.json';
import { bikeService } from '@/services/tdx';

export interface NormalisedBikeStation {
  uids: string[];
  entities: Record<string, BikeAvailableStation>;
}

interface BikeAvailableStation extends BikeStation, BikeAvailability {}

export interface StationQueryParam {
  lat: string;
  lng: string;
  r: string;
}

const router = new RouterBuilder();

router.get<NormalisedBikeStation>(async (req) => {
  const { lat, lng, r } = req.query;
  if (
    typeof lat !== 'string' ||
    typeof lng !== 'string' ||
    typeof r !== 'string'
  )
    throw new BadRequestException(`Incorrect lat=${lat} or ${lng} or r=${r}`);

  const latitude = Number.parseFloat(lat);
  const longitude = Number.parseFloat(lng);
  const radius = Number.parseFloat(r);

  if (Number.isNaN(latitude) || Number.isNaN(longitude))
    throw new BadRequestException(
      `Incorrect lat=${req.query.lat} or ${req.query.lng}`,
    );

  if (Number.isNaN(radius) || radius < 500 || radius > 1000)
    throw new BadRequestException(`Invalid input of radius ${radius}`);

  if (process.env.NODE_ENV !== 'production')
    return mock as unknown as NormalisedBikeStation;

  const [stations, bikes] = await Promise.all([
    bikeService.getNearByBikeStations({
      top: 30,
      spatialFilter: `nearby(${latitude}, ${longitude}, ${radius})`,
    }),
    bikeService.getNearByBikesAvailability({
      top: 30,
      spatialFilter: `nearby(${latitude}, ${longitude}, ${radius})`,
    }),
  ]);

  const normalised: NormalisedBikeStation = { uids: [], entities: {} };

  for (let i = 0; i < stations.length; i += 1) {
    const station = stations[i];
    const bike = bikes[i];

    if (bike.ServiceStatus === 1) {
      normalised.uids.push(bike.StationUID);
      normalised.entities[bike.StationUID] = {
        ...station,
        ...bike,
      };
    }
  }

  return normalised;
});

export default router.build();
