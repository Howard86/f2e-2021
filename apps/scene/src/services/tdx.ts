import { TdxService, TourismService } from '@f2e/tdx';

export const service = new TdxService({
  baseUrl: process.env.TDX_BASE_URL,
  clientId: process.env.TDX_CLIENT_ID,
  clientSecret: process.env.TDX_CLIENT_SECRET,
});

export const tourismService = new TourismService(service);
