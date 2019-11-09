import { ApplicationToolbarButton, ApplicationState } from '../PredefinedConfig/ApplicationState';

/**
 * Provides access to an empty Toolbar and Popup, allowing developers to populate it as they wish.
 *
 */
export interface ApplicationApi {
  /**
   * Retrieves the Application section from the Adaptable Blotter State - currently just a list of Application Toolbar butons
   */
  getApplicationState(): ApplicationState;

  /**
   * Retrieves all the Application Toolbar Buttons in the Application state
   */
  getApplicationToolbarButtons(): ApplicationToolbarButton[];

  /**
   * Returns the id of the 'div' element in the Application Toolbar that is assigned for uses to render themselves
   */
  getApplicationToolbarContentsDivId(): string;

  /**
   * Returns the 'div' element in the Application Toolbar that is assigned for uses to render themselves
   */
  getApplicationToolbarContentsDiv(): HTMLElement | null;
}
