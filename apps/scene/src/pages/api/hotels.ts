import {
  BadRequestException,
  NextApiRequestWithQuery,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler';

import { searchHotelsByKeyword } from '@/services/ptx';

const router = new RouterBuilder();
router.get(async (req: NextApiRequestWithQuery<{ keyword?: string }>) => {
  if (!req.query.keyword) {
    throw new BadRequestException('keyword not found');
  }

  const results = await searchHotelsByKeyword(req.query.keyword);

  if (results.length === 0) {
    throw new NotFoundException('not results are found');
  }

  return results;
});

export default router.build();
