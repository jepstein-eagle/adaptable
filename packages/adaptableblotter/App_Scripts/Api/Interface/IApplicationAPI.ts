import {
  ApplicationToolbarButton,
  ApplicationState,
} from '../../PredefinedConfig/DesignTimeState/ApplicationState';

/**
 * Provides access to an empty Toolbar and Popup, allowing developers to populate it as they wish.
 *
 */
export interface IApplicationApi {
  /**
   * Retrieves the Application state - currently just like a list of Application Toolbar butons
   */
  getApplicationState(): ApplicationState;

  /**
   * Retrieves all the Application Toolbar Buttons in the Application state
   */
  getApplicationToolbarButtons(): ApplicationToolbarButton[];

  /**
   * Returns the id of the <div> in the Application Toolbar that is assigned for uses to render themselves
   */
  getApplicationToolbarContentsDivId(): string;

  /**
   * Returns the <div> in the Application Toolbar that is assigned for uses to render themselves
   */
  getApplicationToolbarContentsDiv(): HTMLElement | null;
}
