/* eslint-disable import/prefer-default-export */
// TODO: replace mock with api call
export const getWeathers = async (): Promise<Weather.City[]> =>
  new Array(10).fill(0).map((_, index) => ({
    id: `weather-${index}`,
    city: `台北市${index}`,
    temperature: 20 + index,
  }));
