import { LIGHT_THEME, DARK_THEME } from '../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterTheme } from '../PredefinedConfig/RunTimeState/ThemeState';

export const StaticThemes: Array<AdaptableBlotterTheme> = [
  {
    Name: 'Light Theme',
    Description: 'Light Theme',
  },
  {
    Name: 'Dark Theme',
    Description: 'Dark Theme',
  },
];
declare var require: any;
export var ThemesContent = new Map<string, string>([
  // tslint:disable-next-line:no-var-requires
  [LIGHT_THEME, ''],
  // tslint:disable-next-line:no-var-requires
  [DARK_THEME, ''],
]);
