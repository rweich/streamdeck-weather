import { Icon } from '../../../api/types/Icon';
import { ThemeImage } from '../ThemeImage';
import ThemeInterface from '../ThemeInterface';

export default class Theme implements ThemeInterface {
  public getImage(icon: Icon): ThemeImage {
    const image: ThemeImage = {
      drawHeight: 70,
      drawWidth: 70,
      drawX: 37,
      drawY: 10,
      imageHeight: 70,
      imageWidth: 70,
      src: 'yr-weather-symbols/',
    };

    switch (icon.name) {
      case 'clear.sky':
        image.src += `clearsky_${icon.type}.png`;
        break;
      case 'clouds.few':
      case 'clouds.scattered':
      case 'clouds.broken':
        image.src += `partlycloudy_${icon.type}.png`;
        break;
      case 'clouds.overcast':
        image.src += `cloudy.png`;
        break;
      case 'drizzle.light':
      case 'rain.light':
        image.src += `lightrain.png`;
        break;
      case 'drizzle':
      case 'rain':
        image.src += `rain.png`;
        break;
      case 'drizzle.heavy':
      case 'rain.heavy':
        image.src += `heavyrain.png`;
        break;
      case 'rain.shower.light':
        image.src += `lightrainshowers_${icon.type}.png`;
        break;
      case 'rain.shower':
        image.src += `rainshowers_${icon.type}.png`;
        break;
      case 'rain.shower.heavy':
        image.src += `heavyrainshowers_${icon.type}.png`;
        break;
      case 'thunderstorm.rain.light':
      case 'thunderstorm.drizzle.light':
        image.src += `lightrainandthunder.png`;
        break;
      case 'thunderstorm.rain':
      case 'thunderstorm.drizzle':
        image.src += `rainandthunder.png`;
        break;
      case 'thunderstorm.rain.heavy':
      case 'thunderstorm.drizzle.heavy':
        image.src += `heavyrainandthunder.png`;
        break;
      case 'thunderstorm.hail':
        image.src += `heavysleetandthunder.png`;
        break;
      case 'snow.light':
        image.src += `lightsnow.png`;
        break;
      case 'snow':
        image.src += `snow.png`;
        break;
      case 'snow.heavy':
        image.src += `heavysnow.png`;
        break;
      case 'snow.shower.light':
        image.src += `lightsnowshowers_${icon.type}.png`;
        break;
      case 'snow.shower':
        image.src += `snowshowers_${icon.type}.png`;
        break;
      case 'snow.shower.heavy':
        image.src += `heavysnowshowers_${icon.type}.png`;
        break;
      case 'sleet.light':
        image.src += `lightsleet.png`;
        break;
      case 'sleet':
      case 'rain.freezing':
        image.src += `sleet.png`;
        break;
      case 'sleet.heavy':
        image.src += `heavysleet.png`;
        break;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'sand.dust':
      case 'fog':
      case 'fog.freezing':
        image.src += `fog.png`;
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const completeCheck: never = icon.name;
        throw new Error(`could not find mapping for ${icon.name}`);
    }

    return image;
  }
}
