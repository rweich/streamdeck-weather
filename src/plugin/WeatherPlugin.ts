import ContextData from './ContextData';
import { DidReceiveSettingsEvent } from '@rweich/streamdeck-events/dist/Events/Received';
import Display from './Display';
import { Logger } from 'loglevel';
import { Plugin } from '@rweich/streamdeck-ts';
import WeatherGenerator from '../api/openweathermap/WeatherGenerator';

export default class WeatherPlugin {
  private readonly plugin: Plugin;
  private readonly display: Display;
  private readonly logger: Logger;
  private readonly contextData: Map<string, ContextData> = new Map();

  constructor(plugin: Plugin, display: Display, logger: Logger) {
    this.plugin = plugin;
    this.display = display;
    this.logger = logger;
  }

  public init(): void {
    this.plugin.on('willAppear', ({ context }) => this.plugin.getSettings(context));
    this.plugin.on('didReceiveSettings', (event) => this.onDidReceiveSettings(event));
    // TODO: remove interval on willdisappear?
  }

  private onDidReceiveSettings(event: DidReceiveSettingsEvent): void {
    this.logger.debug('got settings', event.settings);
    this.contextData.get(event.context)?.clearInterval();
    const data = new ContextData(event.context, new WeatherGenerator(this.logger));
    this.contextData.set(event.context, data);
    this.initContextUpdater(data);
  }

  private initContextUpdater(contextData: ContextData): void {
    this.logger.debug('initializing updater ...');

    // TODO: take seconds from context..
    contextData.setInterval(() => this.updateWeatherData(contextData), 1000 * 60 * 10);
    this.updateWeatherData(contextData);
  }

  private updateWeatherData(contextData: ContextData): void {
    this.logger.debug('updating weather data ...');
    contextData.weatherGenerator
      .generateWeather()
      .then((weather) => {
        this.display.displayWeather(weather, contextData);
        return weather;
      })
      .catch((error) => this.logger.error(error));
  }
}
