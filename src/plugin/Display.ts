import ContextData from './ContextData';
import { Logger } from 'loglevel';
import { Plugin } from '@rweich/streamdeck-ts';
import Theme from './theme/yr-weather-symbols/Theme';
import { ThemeImage } from './theme/ThemeImage';
import { Weather } from '../api/types/Weather';

export default class Display {
  private readonly plugin: Plugin;
  private readonly logger: Logger;

  constructor(plugin: Plugin, logger: Logger) {
    this.plugin = plugin;
    this.logger = logger;
  }

  private static createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  public displayWeather(weather: Weather, contextData: ContextData): void {
    this.show(weather, contextData.context);
  }

  private show(weather: Weather, pluginContext: string): void {
    const canvas = Display.createCanvas(144, 144);
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('could not create 2d context in canvas');
    }
    context.fillStyle = 'white';
    context.font = `34px "Verdana"`;
    context.textAlign = 'center';
    context.fillText(String(Math.round(weather.temp)) + '°C', 72, 120, 144);

    let themeImage: ThemeImage;
    try {
      themeImage = new Theme().getImage(weather.icon);
      console.info('got themeimage', themeImage);
    } catch (error) {
      console.error(error);
      this.drawCanvas(canvas, pluginContext);
      return;
    }
    const image = new Image();
    const imageSource = `images/icons/${themeImage.src}`;
    image.addEventListener('load', () => {
      image.height = themeImage.imageHeight;
      image.width = themeImage.imageWidth;
      context.drawImage(image, themeImage.drawX, themeImage.drawY, themeImage.drawWidth, themeImage.drawHeight);
      this.drawCanvas(canvas, pluginContext);
    });
    image.addEventListener('error', () => {
      this.logger.error(`could not load image ${imageSource}`);
      this.drawCanvas(canvas, pluginContext);
    });
    image.src = imageSource;
  }

  private drawCanvas(canvas: HTMLCanvasElement, pluginContext: string): void {
    this.plugin.setImage(canvas.toDataURL('image/png'), pluginContext);
  }
}
