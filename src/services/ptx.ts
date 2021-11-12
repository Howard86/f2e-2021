import JsSHA1 from 'jssha/dist/sha1';

const getAuthorizationHeader = () => {
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

const apiGet = async <T>(
  url: string,
  params?: Partial<PTX.ApiParam>,
): Promise<T> => {
  const response = await fetch(
    `${process.env.PTX_BASE_URL}/${url}?${new URLSearchParams({
      $format: 'JSON',
      ...params,
    }).toString()}`,
    {
      headers: getAuthorizationHeader(),
    },
  );

  if (response.ok && response.status < 400) {
    return response.json();
  }
  console.error(response.url);
  console.error(response.headers);

  throw new Error(response.statusText);
};

export const getSceneCards = (count = 30): Promise<PTX.SceneCard[]> =>
  apiGet('Tourism/ScenicSpot', {
    $top: count.toString(),
    $select: 'ID,City,Name,Picture',
    $filter: 'Picture/PictureUrl1 ne null and City ne null',
    $orderBy: 'TicketInfo desc',
  });

export const getScenesWithRemarks = async (
  count = 30,
): Promise<PTX.SceneRemark[]> => {
  const results = await apiGet<PTX.SceneRemark[]>('Tourism/ScenicSpot', {
    $top: (count * 5).toString(),
    $select: 'ID,Name,City,Remarks,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Remarks ne null and City ne null',
    $orderBy: 'Remarks desc, UpdateTime desc',
  });

  return results
    .sort((a, b) => (a.Remarks?.length > b.Remarks.length ? -1 : 1))
    .slice(0, count);
};

export const getScenes = async (count = 30): Promise<PTX.Scene[]> =>
  apiGet('Tourism/ScenicSpot', { $top: count.toString() });

export const getSceneTheme = async (count = 30): Promise<PTX.SceneTheme[]> => {
  const rawResults = await apiGet<PTX.RawSceneTheme[]>('Tourism/ScenicSpot', {
    $top: (count * 10).toString(),
    $select: 'ID,Class1,Class2,Class3,Picture',
    $filter: 'Picture/PictureUrl1 ne null and Class1 ne null',
    $orderBy: 'UpdateTime desc',
  });

  const classSet = new Set<PTX.SceneClass>();
  const results: PTX.SceneTheme[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const result of rawResults) {
    if (result.Class1 && !classSet.has(result.Class1)) {
      classSet.add(result.Class1);
      results.push({
        Class: result.Class1,
        ID: result.ID,
        Picture: result.Picture,
      });
    } else if (result.Class2 && !classSet.has(result.Class2)) {
      classSet.add(result.Class2);
      results.push({
        Class: result.Class2,
        ID: result.ID,
        Picture: result.Picture,
      });
    } else if (result.Class3 && !classSet.has(result.Class3)) {
      classSet.add(result.Class3);
      results.push({
        Class: result.Class3,
        ID: result.ID,
        Picture: result.Picture,
      });
    }
  }

  return results.filter((result) => result.Class !== '其他').slice(0, count);
};

export const getRestaurants = async (): Promise<PTX.Restaurant[]> =>
  new Array(10).fill(0).map((_, index) => ({
    id: `food${index}`,
    name: '胡切仔麵',
    city: `南投縣${index}`,
    address: '南投縣545埔里鎮新生路10號',
    openingHours: '16:00-22:00',
    contactNumber: '04-92994225',
    image: '/static/mock/food.png',
  }));

export const getHotels = async (): Promise<PTX.Hotel[]> => {
  const results = await getRestaurants();

  return results.map((result, index) => ({ ...result, id: `hotel${index}` }));
};

export const getCity = async (_slug: string): Promise<PTX.City> => ({
  id: '1',
  name: '台北市',
  description:
    '在臺北，您每個所到之處，多樣的文化特質都充沛鼓動著。雕龍畫棟的廟宇與現代的街道完美吻合，還有許多世界級餐廳隨時提供您最正統的各式中華料理。別忘了，美味的夜市小吃不僅僅帶給您口腹的滿足，更是引領您體驗臺灣生活的理想去處。',
  image: '/static/mock/scene.png',
});

export const getSceneById = async (
  id: string,
): Promise<PTX.Scene | undefined> => ({
  id,
  city: '台北',
  name: '台北101',
  image: '/static/mock/scene.png',
  address: '臺北市信義區信義路5段7號',
  contactNumber: '+886-2-81018800',
  openingHours: '星期一～五	11:00 - 21:00 星期六.日	   10:00 - 21:00',
  description:
    '臺北101購物中心為地上5樓，地下1樓的購物空間，23000坪，是臺灣首座國際頂級購物中心。擁有許多精品旗艦店，如BALLY、LV、Prada、Gucci、Cartier、DIOR及FENDI等，消費者可以享受到最多樣的選擇，與全球流行零時差，輕鬆擁有愉悅的購物時刻。',
});
