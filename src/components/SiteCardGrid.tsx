import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

import SiteCard from './SiteCard';

import bed from '@/static/card/bed.png';
import bus from '@/static/card/bus.png';
import food from '@/static/card/food.png';
import spot from '@/static/card/spot.png';

const SiteCardGrid = (props: SimpleGridProps) => (
  <SimpleGrid columns={[2, 2, 4]} spacing={[8, 12, 16]} px="8" {...props}>
    <SiteCard title="景點" href="/scenes" image={spot} />
    <SiteCard title="美食" href="/restaurants" image={food} />
    <SiteCard title="住宿" href="/hotels" image={bed} />
    <SiteCard title="交通" href="/transports" image={bus} />
  </SimpleGrid>
);

export default SiteCardGrid;
