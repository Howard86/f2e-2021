export type Route = {
  label: string;
  href: string;
};

const ROUTES: Route[] = [
  { href: '/', label: '活動新訊' },
  { href: '/scenes', label: '景點' },
  { href: '/restaurants', label: '美食' },
  { href: '/hotels', label: '住宿' },
  { href: '/transports', label: '交通' },
];

export default ROUTES;
