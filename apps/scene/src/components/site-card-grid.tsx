import { SimpleGrid, type SimpleGridProps } from '@chakra-ui/react';
import bed from '@/static/card/bed.png';
import bus from '@/static/card/bus.png';
import food from '@/static/card/food.png';
import spot from '@/static/card/spot.png';
import SiteCard from './site-card';

const SiteCardGrid = (props: SimpleGridProps) => (
  <SimpleGrid columns={[2, 2, 4]} gap={[8, 12, 16]} px="8" {...props}>
    <SiteCard href="/scenes" image={spot} title="景點" />
    <SiteCard href="/restaurants" image={food} title="美食" />
    <SiteCard href="/hotels" image={bed} title="住宿" />
    <SiteCard href="/transports" image={bus} title="交通" />
  </SimpleGrid>
);

export default SiteCardGrid;
