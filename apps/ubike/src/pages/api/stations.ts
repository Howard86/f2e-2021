import {
  AvailableBike,
  BikeQueryParam,
  getNearByAvailableBikes,
  getNearByStations,
  Station,
} from '@f2e/ptx';
import {
  BadRequestException,
  NextApiRequestWithQuery,
  RouterBuilder,
} from 'next-api-handler';

import mock from '@/mock.json';

export interface StationWithBike extends Station {
  bike: AvailableBike;
}

export interface StationQueryParam {
  lat: string;
  lng: string;
}

const router = new RouterBuilder();

router.get<StationWithBike[]>(
  async (req: NextApiRequestWithQuery<Partial<StationQueryParam>>) => {
    const latitude = Number.parseFloat(req.query.lat);
    const longitude = Number.parseFloat(req.query.lng);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      throw new BadRequestException(
        `Incorrect lat=${req.query.lat} or ${req.query.lng}`,
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      return mock;
    }

    const defaultQuery: BikeQueryParam = {
      lat: latitude,
      lng: longitude,
      count: 30,
      meter: 700,
    };

    const [stations, bikes] = await Promise.all([
      getNearByStations(defaultQuery),
      getNearByAvailableBikes(defaultQuery),
    ]);

    return stations.map((station, index) => ({
      ...station,
      bike: bikes[index],
    }));
  },
);

export default router.build();
