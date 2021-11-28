import type { BusRoute } from '@f2e/ptx';

// eslint-disable-next-line import/prefer-default-export
export const getBusRouteDestinations = (busRoute: BusRoute): string => {
  if (!busRoute.DepartureStopNameZh) {
    return busRoute.DestinationStopNameZh;
  }

  if (!busRoute.DestinationStopNameZh) {
    return busRoute.DepartureStopNameZh;
  }

  if (busRoute.DepartureStopNameZh === busRoute.DestinationStopNameZh) {
    return busRoute.DepartureStopNameZh;
  }

  return `${busRoute.DepartureStopNameZh}-${busRoute.DestinationStopNameZh}`;
};
