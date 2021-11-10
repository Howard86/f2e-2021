// TODO: replace mock with api call
export const getScenes = async (): Promise<TDX.Scene[]> =>
  new Array(10).fill(0).map((_, index) => ({
    id: `scene${index}`,
    city: '台北',
    name: `台北${101 + index}`,
    image: '/static/mock/scene.png',
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
