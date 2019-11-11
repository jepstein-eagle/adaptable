import { ApplicationToolbarButton, ApplicationState } from '../PredefinedConfig/ApplicationState';

/**
 * Provides access to an empty Toolbar and Popup, allowing developers to populate it as they wish.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardapplicationtoolbardemo/) | [State](_predefinedconfig_applicationstate_.applicationstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos] To come | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
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
