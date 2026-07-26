const handleArrayParam = (array?: string[]) =>
  array ? array.join(',') : undefined;

const apiGet = async <T>(
  url: string,
  params: Partial<Omit<OpenData.WeatherParam, 'locationName'>>,
): Promise<T> => {
  const { elementName, ...rest } = params;

  const searchParam = new URLSearchParams({
    Authorization: process.env.OPEN_DATA_CWB_API_KEY,
    elementName: handleArrayParam(elementName),
    format: 'JSON',
    sort: 'startTime',
    ...rest,
  });

  const response = await fetch(
    `${process.env.OPEN_DATA_CWB_BASE_URL}/${url}?${searchParam.toString()}`,
    {
      headers: {
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.ok && response.status < 400) {
    return response.json();
  }
  const text = await response.text();
  console.error(response.url);
  console.error(response.headers);
  console.error(text);

  throw new Error(response.statusText);
};

const getWeathers = async (): Promise<OpenData.CityWeather[]> => {
  const response = await apiGet<OpenData.WeatherResponse>('F-C0032-001', {
    elementName: ['Wx', 'MinT', 'MaxT'],
  });

  if (!response.success) {
    throw new Error('failed to get weather');
  }

  return response.records.location.map((location) => {
    const weatherName = location.weatherElement.find(
      (weather) => weather.elementName === 'Wx',
    );
    const minT = location.weatherElement.find(
      (weather) => weather.elementName === 'MinT',
    );
    const maxT = location.weatherElement.find(
      (weather) => weather.elementName === 'MaxT',
    );

    return {
      city: location.locationName,
      id: location.locationName,
      maxT: maxT?.time[0]?.parameter.parameterName,
      minT: minT?.time[0]?.parameter.parameterName,
      weather: weatherName?.time[0]?.parameter
        .parameterName as OpenData.Weather,
    };
  });
};

export default getWeathers;
