import { FontSize } from '../../PredefinedConfig/Common/Enums';

// export function getNamesAndValues<T extends number>(e: any) {
//     return EnumExtensions.getNames(e).map(n => ({ name: n, value: e[n] as T }));
// }

export function getNames(e: any) {
  return EnumExtensions.getObjValues(e).filter(v => typeof v === 'string') as string[];
}

export function getValues<T extends number>(e: any) {
  return EnumExtensions.getObjValues(e).filter(v => typeof v === 'number') as T[];
}

export function getObjValues(e: any): (number | string)[] {
  return Object.keys(e).map(k => e[k]);
}

export function getCssFontSizeFromFontSizeEnum(fontSize: any): string {
  switch (fontSize as FontSize) {
    case FontSize.XLarge:
      return 'x-large';
    case FontSize.Large:
      return 'large';
    case FontSize.Medium:
      return 'medium';
    case FontSize.Small:
      return 'small';
    case FontSize.XSmall:
      return 'x-small';
  }
}

export const EnumExtensions = {
  getNames,
  getValues,
  getObjValues,
  getCssFontSizeFromFontSizeEnum,
};

export default EnumExtensions;
