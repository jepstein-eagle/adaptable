import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface ThemeState extends RunTimeState {
  /**
   * The name of the currently applied theme or the theme to set at startup
   */
  CurrentTheme?: string;

  /**
   * Themes shipped by the Adaptable Blotter
   *
   * If you have useDefaultVendorGridThemes set to true in IAdaptableBlotterOptions then setting (or changing to) either of the shipped System Themes will set the theme of the vendor grid too.  See BlotterOptions.
   */
  SystemThemes?: AdaptableBlotterTheme[];

  /**
   * Themes provided by the User
   */
  UserThemes?: AdaptableBlotterTheme[];
}

export interface AdaptableBlotterTheme extends AdaptableBlotterObject {
  /**
   * The name of the css file which will be applied
   */
  Name: string;

  /**
   * Description of the Theme that will appear in the Dropdown
   */
  Description: string;
}
