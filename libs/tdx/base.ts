export interface NearByApiParam extends ApiParam {
  spatialFilter: string;
}

export interface ApiParam {
  filter?: string;
  orderBy?: string;
  select?: string;
  skip?: string | number;
  top?: string | number;
}

export interface TdxServiceParams {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
}

const getRequiredParam = (
  params: Partial<TdxServiceParams>,
  key: keyof TdxServiceParams,
) => {
  const value = params[key];

  if (!value) {
    throw new Error(`Missing env ${key}`);
  }

  return value;
};

export class TdxService {
  private readonly clientId: string;

  private readonly clientSecret: string;

  private readonly baseUrl: string;

  private accessToken: string | undefined;

  private expirationTimestamp: number | undefined;

  private refreshed = false;

  DEFAULT_API_PARAMS: ApiParam = { top: 20 };

  constructor(params: Partial<TdxServiceParams>) {
    this.clientId = getRequiredParam(params, 'clientId');
    this.clientSecret = getRequiredParam(params, 'clientSecret');
    this.baseUrl = getRequiredParam(params, 'baseUrl');
  }

  static checkExistence<T>(items: T[]): T | null {
    return items.length > 0 ? items[0] : null;
  }

  async get<T, P extends ApiParam = ApiParam>(
    path: string,
    params: P,
  ): Promise<T> {
    if (
      // biome-ignore lint/suspicious/noUnnecessaryConditions: tracks concurrent token refreshes across async calls.
      !this.refreshed &&
      (!(this.accessToken && this.expirationTimestamp) ||
        this.expirationTimestamp >= Date.now())
    ) {
      await this.refreshToken();
    }

    if (!this.accessToken) {
      throw new Error('Already refreshed existed token');
    }

    const query = new URLSearchParams();

    for (const key of Object.keys(params)) {
      if (params[key]) {
        query.append(`$${key}`, params[key]);
      }
    }

    query.append('$format', 'JSON');

    const response = await fetch(
      `${this.baseUrl}/api${encodeURI(path)}?${query.toString()}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }

    this.refreshed = false;

    return json;
  }

  private async refreshToken() {
    const response = await fetch(
      `${this.baseUrl}/auth/realms/TDXConnect/protocol/openid-connect/token`,
      {
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      throw new Error(JSON.stringify(response));
    }

    const json = (await response.json()) as {
      access_token: string;
      expires_in: number;
      token_type: string;
    };

    this.refreshed = true;
    this.accessToken = json.access_token;
    this.expirationTimestamp = json.expires_in + Date.now();
  }
}
