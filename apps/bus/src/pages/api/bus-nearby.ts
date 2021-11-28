import { BusStation, getNearbyBusStations } from '@f2e/ptx';
import {
  BadRequestException,
  NextApiRequestWithQuery,
  RouterBuilder,
} from 'next-api-handler';

export interface StationQueryParam {
  lat: string;
  lng: string;
}

const router = new RouterBuilder();

router.get<BusStation[]>(
  async (req: NextApiRequestWithQuery<Partial<StationQueryParam>>) => {
    const latitude = Number.parseFloat(req.query.lat);
    const longitude = Number.parseFloat(req.query.lng);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      throw new BadRequestException(
        `Incorrect lat=${req.query.lat} or ${req.query.lng}`,
      );
    }

    return getNearbyBusStations(latitude, longitude);
  },
);

export default router.build();
