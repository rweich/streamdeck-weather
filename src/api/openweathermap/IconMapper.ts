import { Conditions } from '../types/Conditions';
import { Icon } from '../types/Icon';

export default class IconMapper {
  public mapIcon(icon: string): Icon {
    const type = icon.charAt(2) === 'd' ? 'day' : 'night';
    const code = icon.slice(0, 2);

    const map: { [k: string]: Conditions } = {
      '01': 'clear.sky',
      '02': 'clouds.few',
      '03': 'clouds.scattered',
      '04': 'clouds.broken',
      '09': 'rain.shower',
      '10': 'rain',
      '11': 'thunderstorm.rain',
      '13': 'snow',
      '50': 'mist',
    };

    if (map[code] === undefined) {
      throw new Error(`unkown icon: ${icon}`);
    }

    return { name: map[code], type };
  }
}
