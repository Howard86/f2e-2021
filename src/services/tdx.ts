// TODO: replace mock with api call
export const getScenes = async (): Promise<TDX.Scene[]> =>
  new Array(10).fill(0).map((_, index) => ({
    id: `scene${index}`,
    city: '台北',
    name: `台北${101 + index}`,
    image: '/static/mock/scene.png',
    address: '',
    contactNumber: '',
    description: '',
    openingHours: '',
  }));

export const getRestaurants = async (): Promise<TDX.Restaurant[]> =>
  new Array(10).fill(0).map((_, index) => ({
    id: `food${index}`,
    name: '胡切仔麵',
    city: `南投縣${index}`,
    address: '南投縣545埔里鎮新生路10號',
    openingHours: '16:00-22:00',
    contactNumber: '04-92994225',
    image: '/static/mock/food.png',
  }));

export const getHotels = async (): Promise<TDX.Hotel[]> => {
  const results = await getRestaurants();

  return results.map((result, index) => ({ ...result, id: `hotel${index}` }));
};

export const getCity = async (_slug: string): Promise<TDX.City> => ({
  id: '1',
  name: '台北市',
  description:
    '在臺北，您每個所到之處，多樣的文化特質都充沛鼓動著。雕龍畫棟的廟宇與現代的街道完美吻合，還有許多世界級餐廳隨時提供您最正統的各式中華料理。別忘了，美味的夜市小吃不僅僅帶給您口腹的滿足，更是引領您體驗臺灣生活的理想去處。',
  image: '/static/mock/scene.png',
});

export const getSceneById = async (
  id: string,
): Promise<TDX.Scene | undefined> => ({
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
