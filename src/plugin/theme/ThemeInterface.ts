import { Icon } from '../../api/types/Icon';
import { ThemeImage } from './ThemeImage';

export default interface ThemeInterface {
  getImage(icon: Icon): ThemeImage;
}
