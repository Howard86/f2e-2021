import { RouterBuilder } from 'next-api-handler';

import getWeathers from '@/services/weather';

const router = new RouterBuilder();

router.get(() => getWeathers());

export default router.build();
