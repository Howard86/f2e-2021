import { searchHotelsByKeyword } from '@f2e/ptx';
import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

const router = new RouterBuilder();
router.get(async (req) => {
  if (typeof req.query.keyword !== 'string') {
    throw new BadRequestException('keyword not found');
  }

  const results = await searchHotelsByKeyword(req.query.keyword);

  if (results.length === 0) {
    throw new NotFoundException('not results are found');
  }

  return results;
});

export default router.build();
