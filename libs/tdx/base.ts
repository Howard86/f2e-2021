export interface NearByApiParam extends ApiParam {
  spatialFilter: string;
}

export interface ApiParam {
  select?: string;
  filter?: string;
  orderBy?: string;
  top?: string | number;
  skip?: string | number;
}

export type TdxServiceParams = {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
};

export class TdxService {
  private clientId: string;

  private clientSecret: string;

  private baseUrl: string;

  private accessToken: string | undefined;

  private expirationTimestamp: number | undefined;

  private refreshed = false;

  public DEFAULT_API_PARAMS: ApiParam = { top: 20 };

  constructor(params: Partial<TdxServiceParams>) {
    this.setPrivateVariable(params, 'clientId');
    this.setPrivateVariable(params, 'clientSecret');
    this.setPrivateVariable(params, 'baseUrl');
  }

  static checkExistence<T>(items: T[]): T | null {
    return items.length > 0 ? items[0] : null;
  }

  async get<T, P extends ApiParam = ApiParam>(
    path: string,
    params: P,
  ): Promise<T> {
    if (
      !this.refreshed &&
      (!this.accessToken ||
        !this.expirationTimestamp ||
        this.expirationTimestamp >= Date.now())
    ) {
      await this.refreshToken();
    }

    if (!this.accessToken) throw new Error('Already refreshed existed token');

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
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/json',
        },
      },
    );

    const json = await response.json();

    if (!response.ok) throw new Error(JSON.stringify(json));

    this.refreshed = false;

    return json;
  }

  private async refreshToken() {
    const response = await fetch(
      `${this.baseUrl}/auth/realms/TDXConnect/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      },
    );

    if (!response.ok) throw new Error(JSON.stringify(response));

    const json = (await response.json()) as {
      access_token: string;
      expires_in: number;
      token_type: string;
    };

    this.refreshed = true;
    this.accessToken = json.access_token;
    this.expirationTimestamp = json.expires_in + Date.now();
  }

  private setPrivateVariable(
    params: Partial<TdxServiceParams>,
    key: keyof TdxServiceParams,
  ) {
    if (!params[key]) throw new Error(`Missing env ${key}`);

    this[key] = params[key];
  }
}
