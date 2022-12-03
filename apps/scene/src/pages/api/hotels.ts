import { constructHotelsSearch, TdxService, TourismService } from '@f2e/tdx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import { mapHotelToPlaceCard } from '@/services/tdx';

const router = new RouterBuilder();
const service = new TdxService({
  baseUrl: process.env.TDX_BASE_URL,
  clientId: process.env.TDX_CLIENT_ID,
  clientSecret: process.env.TDX_CLIENT_SECRET,
});

const tourismService = new TourismService(service);

router.get(async (req) => {
  const { keyword } = req.query;

  if (typeof keyword !== 'string')
    throw new BadRequestException('keyword not found');

  const results = await tourismService.getHotels({
    top: 30,
    select: 'HotelID,HotelName,City,Address,ServiceInfo,Phone,Picture',
    filter: `Picture/PictureUrl1 ne null and City ne null and (${constructHotelsSearch(
      keyword,
    )})`,
    orderBy: 'SrcUpdateTime desc, ServiceInfo desc',
  });

  if (results.length === 0)
    throw new NotFoundException('not results are found');

  return results.map(mapHotelToPlaceCard);
});

export default router.build();
