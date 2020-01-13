import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Theme State section of Adaptable Predefined Config.
 *
 * Theme State is used to tell Adaptable which, if any, of the Shipped Themes ("Dark Theme" and "Light Theme") should be available.
 *
 * It also enables you to ship your instance of Adaptable with your own custom themes that you can create.
 *
 * All Adaptable themes are simply collections of [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
 *
 * ```ts
 * export default {
 * Theme: {
 *  CurrentTheme:"blue",
 *  UserThemes:[
 *    {
 *      Name:"blue",
 *      Description:"Blue Theme",
 *      VendorGridClassName: 'ag-theme-blue' // optional - sets the current theme of the underlying vendor grid to be used in association to the blue theme
 *     }
 *  ],
 *  }
 * } as PredefinedConfig;
 * ```
 */
export interface ThemeState extends RunTimeState {
  /**
   * The name of the currently applied theme or the theme to set at startup.
   *
   * If you want to use the Light Theme then you can leave this blank.
   *
   * If you want to use the Dark Theme then set this property to 'dark'.
   *
   * If you want to use a custom theme then set this property to the name of the theme you have created.
   */
  CurrentTheme?: string;

  /**
   * Which, if any, of the 2 themes shipped by Adaptable should be available.
   *
   * If you dont set anything then **both** themes are available; if you set an empty array then **neither** theme is available.
   *
   * If you have  [*useDefaultVendorGridThemes*]( https://api.adaptableblotter.com/interfaces/_adaptableOptions_generaloptions_.generaloptions.html#usedefaultvendorgridthemes) set to true in **generalOptions** section of *Adaptable Options* then setting (or changing to) either of the shipped System Themes will set the theme of the underlying vendor grid too.
   */
  SystemThemes?: (AdaptableTheme | string)[];

  /**
   * User / Custom themes provided by the User.
   *
   * Each User Theme has just 3 properties
   *
   * * the **css file name** that needs to be applied
   *
   * * a **description** of the theme (which will appear in the Theme Popup)
   *
   * * the **css class name for the Vendor Grid** that should be applied when the theme runs
   *
   * To learn how to create a Custom Theme please refer to the [Online Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360025111951-Themes).
   */
  UserThemes?: AdaptableTheme[];
}

/**
 * AdaptableTheme object used in the Theme function - required for when creating User (Custom) Themes.
 */
export interface AdaptableTheme extends AdaptableObject {
  /**
   * The name of the css file which will be applied
   */
  Name: string;

  /**
   * Description of the Theme that will appear in the Dropdown (in the Theme Toolbar or the Theme Popup).
   */
  Description: string;

  /**
   * The css className to be applied on the vendor grid - this can be used to style the vendor grid with a theme that matches the current theme of Adaptable
   */
  VendorGridClassName?: string;
}
