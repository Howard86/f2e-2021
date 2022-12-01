export interface ApiParam {
  top: string | number;
  skip: string | number;
  orderBy: string;
  filter: string;
  select: string;
  spatialFilter: string;
}

export type PtxServiceParams = {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
};

export default class TdxService {
  private clientId: string;

  private clientSecret: string;

  private baseUrl: string;

  private accessToken: string | undefined;

  private expirationTimestamp: number | undefined;

  private refreshed = false;

  constructor(params: Partial<PtxServiceParams>) {
    this.setPrivateVariable(params, 'clientId');
    this.setPrivateVariable(params, 'clientSecret');
    this.setPrivateVariable(params, 'baseUrl');
  }

  async get<T>(path: string, params: Partial<ApiParam> = {}): Promise<T> {
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
      `${this.baseUrl}/api/basic${encodeURI(path)}?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/json',
        },
      },
    );

    const json = await response.json();

    if (!response.ok) throw new Error(json);

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
    params: Partial<PtxServiceParams>,
    key: keyof PtxServiceParams,
  ) {
    if (!params[key]) throw new Error(`Missing env ${key}`);

    this[key] = params[key];
  }
}
