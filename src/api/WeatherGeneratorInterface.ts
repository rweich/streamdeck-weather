import { Weather } from './types/Weather';

export default interface WeatherGeneratorInterface {
  generateWeather(): Promise<Weather>;
}
