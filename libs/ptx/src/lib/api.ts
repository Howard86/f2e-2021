import JsSHA1 from 'jssha/dist/sha1';

export interface ApiParam {
  $top: string;
  $skip: string;
  $orderBy: string;
  $filter: string;
  $select: string;
  $spatialFilter: string;
}

export const getAuthorizationHeader = () => {
  const AppID = process.env.PTX_APP_ID;
  const AppKey = process.env.PTX_APP_KEY;

  const GMTString = new Date().toUTCString();
  const ShaObj = new JsSHA1('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');

  return {
    'Content-Type': 'application/json',
    Authorization: `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`,
    'X-Date': GMTString,
    'Accept-Encoding': 'gzip, deflate',
  };
};

export const apiGet = async <T>(
  url: string,
  params?: Partial<ApiParam>,
): Promise<T> => {
  const query = new URLSearchParams();
  query.append('$format', 'JSON');

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        query.append(key, params[key]);
      }
    });
  }

  const response = await fetch(
    `${process.env.PTX_BASE_URL}/${encodeURI(url)}?${query.toString()}`,
    {
      headers: getAuthorizationHeader(),
    },
  );

  if (response.ok && response.status < 400) {
    return response.json();
  }
  const text = await response.text();
  console.error(text);
  console.error(response.url);
  console.error(response.headers);

  throw new Error(response.statusText);
};
