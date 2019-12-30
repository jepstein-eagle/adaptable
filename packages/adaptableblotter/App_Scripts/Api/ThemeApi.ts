import { ThemeState, AdaptableTheme } from '../PredefinedConfig/ThemeState';

/**
 * Provides full and comprehensive run-time access to the Theme function and associated state.
 */
export interface ThemeApi {
  /**
   * Retrieves all the Theme section from the Adaptable State
   */
  getThemeState(): ThemeState;

  /**
   * Sets the Adaptable to use the given theme
   * @param theme name of the theme to apply
   */
  loadTheme(theme: string): void;

  /**
   * Sets the Light Theme of the Adaptable
   *
   * This will also update the underlying vendor grid to match
   */
  loadLightTheme(): void;

  /**
   * Sets the Dark Theme of the Adaptable
   *
   * This will also update the underlying vendor grid theme to match
   */
  loadDarkTheme(): void;

  /**
   * Retrieves the name of the Current Theme
   */
  getCurrentTheme(): string;

  /**
   * Sets which System Themes are available. If an empty array is passed then **no** System Themes will be available.
   *
   * @param systemThemes system themes to use ('light', 'dark', both, or none)
   */
  setSystemThemes(systemThemes: AdaptableTheme[]): void;

  /**
   * Sets which user (a.k.a. custom) themes are available in the Adaptable
   *
   * @param userThemes user themes to use - each has a name and a description
   */
  setUserThemes(userThemes: AdaptableTheme[]): void;

  /**
   * Retrieves all the System Themes in the State
   */
  getAllSystemTheme(): AdaptableTheme[];

  /**
   * Retrieves all the User Themes in the State
   */
  getAllUserTheme(): AdaptableTheme[];

  /**
   * Retrieves all Themes - both System Theme and User Theme - in the State
   */
  getAllTheme(): AdaptableTheme[];

  /**
   * Opens the Theme popup screen
   */
  showThemePopup(): void;
}
