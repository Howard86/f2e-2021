import { BikeService, TdxService } from '@f2e/tdx';

export const service = new TdxService({
  baseUrl: process.env.TDX_BASE_URL,
  clientId: process.env.TDX_CLIENT_ID,
  clientSecret: process.env.TDX_CLIENT_SECRET,
});

export const bikeService = new BikeService(service);
