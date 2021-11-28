import type { BusRoute } from '@f2e/ptx';

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

export const getSubRouteTime = (
  firstTime?: string,
  lastTime?: string,
): string => (firstTime && lastTime ? `${firstTime}-${lastTime}` : '無標註');
