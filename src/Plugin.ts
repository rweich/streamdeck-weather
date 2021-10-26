import Display from './plugin/Display';
import { Streamdeck } from '@rweich/streamdeck-ts';
import WeatherPlugin from './plugin/WeatherPlugin';
import logger from './Logger';

const plugin = new Streamdeck().plugin();
new WeatherPlugin(plugin, new Display(plugin, logger), logger).init();

export default plugin;
