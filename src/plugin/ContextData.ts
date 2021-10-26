import WeatherGeneratorInterface from '../api/WeatherGeneratorInterface';

export default class ContextData {
  public readonly context: string;
  public readonly weatherGenerator: WeatherGeneratorInterface;
  private interval?: NodeJS.Timeout;

  constructor(context: string, weatherGenerator: WeatherGeneratorInterface) {
    this.context = context;
    this.weatherGenerator = weatherGenerator;
  }

  public setInterval(callback: () => void, ms: number): void {
    this.interval = setInterval(callback, ms);
  }

  public clearInterval(): void {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
    delete this.interval;
  }
}
