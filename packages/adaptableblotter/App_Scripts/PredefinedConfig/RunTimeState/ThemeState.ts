import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * Theme State is used to tell the Adaptable Blotter which, if any, of the Shipped Themes ("Dark Theme" and "Light Theme") should be available.
 *
 * It also enables you to ship your instance of the Adaptable Blotter with your own themes.
 *
 * All Adaptable Blotter themes are simply collections of [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
 */
export interface ThemeState extends RunTimeState {
  /**
   * The name of the currently applied theme or the theme to set at startup.
   *
   * If you want to use the Light Theme then you can leave this blank.  If you want to use the Dark Theme then set this property to 'dark'.
   */
  CurrentTheme?: string;

  /**
   * Which, if any, of the 2 themes shipped by the Adaptable Blotter should be available.
   *
   * If you dont set anything then **both** themes are available; if you set an empty array then **neither** theme is available.
   *
   * If you have *useDefaultVendorGridThemes* set to true in **generalOptions** section of *Blotter Options* then setting (or changing to) either of the shipped System Themes will set the theme of the underlying vendor grid too.
   */
  SystemThemes?: (AdaptableBlotterTheme | string)[];

  /**
   * Custom themes provided by the User.
   *
   * Each User Theme has just 2 properties - the **name** of the css file that needs to be applied.  And a **description** of the theme (which will appear in the Theme Popup).
   *
   * To learn how to create a Custom Theme please refer to the [Online Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360025111951-Themes).
   */
  UserThemes?: AdaptableBlotterTheme[];
}

export interface AdaptableBlotterTheme extends AdaptableBlotterObject {
  /**
   * The name of the css file which will be applied
   */
  Name: string;

  /**
   * Description of the Theme that will appear in the Dropdown (in the Theme Toolbar or the Theme Popup).
   */
  Description: string;
}
