import axios, { AxiosInstance } from 'axios';
import { requestLogger, responseLogger, setGlobalConfig } from 'axios-logger';

import { CurrentType } from './types/CurrentType';
import IconMapper from './IconMapper';
import { Logger } from 'loglevel';
import { Weather } from '../types/Weather';
import WeatherGeneratorInterface from '../WeatherGeneratorInterface';
import assertType from '../../AssertType';

export default class WeatherGenerator implements WeatherGeneratorInterface {
  private static axiosInstance: AxiosInstance | undefined;
  private readonly logger: Logger;
  private apiKey = 'putithere';
  private cityId = 2867714;
  private iconMapper = new IconMapper();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public generateWeather(): Promise<Weather> {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('id', String(this.cityId));
    url.searchParams.append('appid', this.apiKey);
    url.searchParams.append('units', 'metric');
    return this.getAxiosInstance()
      .get(url.toString())
      .then(({ data }) => {
        assertType(CurrentType, data);
        console.log('got response', data);
        return {
          icon: this.iconMapper.mapIcon(data.weather[0].icon),
          temp: data.main.temp,
          text: data.weather[0].description,
        };
      });
  }

  private getAxiosInstance(): AxiosInstance {
    if (WeatherGenerator.axiosInstance === undefined) {
      WeatherGenerator.axiosInstance = this.createAxiosInstance();
    }
    return WeatherGenerator.axiosInstance;
  }

  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create();
    setGlobalConfig({
      logger: this.logger.info.bind(this),
      prefixText: 'Api',
    });
    instance.interceptors.request.use(requestLogger);
    instance.interceptors.response.use(responseLogger);
    return instance;
  }
}
