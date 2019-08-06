import { ThemeState, AdaptableBlotterTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';

/**
 * Provides full and comprehensive run-time access to the Theme function and associated state.
 */
export interface IThemeApi {
  /**
   * Retrieves all the Theme State
   */
  getThemeState(): ThemeState;

  /**
   * Sets the Adaptable Blotter to use the given theme
   * @param theme name of the theme to apply
   */
  setTheme(theme: string): void;

  /**
   * Sets the Light Theme of the Adaptable Blotter
   *
   * This will also update the underlying vendor grid to match
   */
  setLightTheme(): void;

  /**
   * Sets the Dark Theme of the Adaptable Blotter
   *
   * This will also update the underlying vendor grid theme to match
   */
  setDarkTheme(): void;

  /**
   * Retrieves the name of the Current Theme
   */
  getCurrentTheme(): string;

  /**
   * Sets which System Themes are available. If an empty array is passed then **no** System Themes will be available.
   *
   * @param systemThemes system themes to use ('light', 'dark', both, or none)
   */
  setSystemThemes(systemThemes: AdaptableBlotterTheme[]): void;

  /**
   * Sets which user (a.k.a. custom) themes are available in the Adaptable Blotter
   *
   * @param userThemes user themes to use - each has a name and a description
   */
  setUserThemes(userThemes: AdaptableBlotterTheme[]): void;

  /**
   * Retrieves all the System Themes in the State
   */
  getAllSystemTheme(): AdaptableBlotterTheme[];

  /**
   * Retrieves all the User Themes in the State
   */
  getAllUserTheme(): AdaptableBlotterTheme[];

  /**
   * Retrieves all Themes - both System Theme and User Theme - in the State
   */
  getAllTheme(): AdaptableBlotterTheme[];
}
