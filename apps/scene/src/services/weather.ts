const handleArrayParam = (array?: string[]) =>
  array ? array.join(',') : undefined;

const apiGet = async <T>(
  url: string,
  params: Partial<Omit<OpenData.WeatherParam, 'locationName'>>,
): Promise<T> => {
  const { elementName, ...rest } = params;

  const searchParam = new URLSearchParams({
    format: 'JSON',
    elementName: handleArrayParam(elementName),
    sort: 'startTime',
    Authorization: process.env.OPEN_DATA_CWB_API_KEY,
    ...rest,
  });

  const response = await fetch(
    `${process.env.OPEN_DATA_CWB_BASE_URL}/${url}?${searchParam.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
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
      id: location.locationName,
      city: location.locationName,
      weather: weatherName?.time[0]?.parameter
        .parameterName as OpenData.Weather,
      maxT: maxT?.time[0]?.parameter.parameterName,
      minT: minT?.time[0]?.parameter.parameterName,
    };
  });
};

export default getWeathers;
