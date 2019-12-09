import {
  ApplicationToolbarButton,
  ApplicationState,
  ApplicationDataEntry,
} from '../PredefinedConfig/ApplicationState';

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

  /**
   * Retrieves all the Key Value Pairs in the Application state
   */
  getApplicationDataEntries(): ApplicationDataEntry[];

  /**
   * Adds a new Application Data Entry
   *
   * @param applicationDataEntry Application Data Entry to add
   */
  addApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;

  /**
   * Creates a new Application Data Entry with the given key and value
   *
   * @param key the Application Data Entry key
   *
   * @param value the Application Data Entry value
   */
  createApplicationDataEntry(key: string, value: any): void;

  /**
   * Edits a given Application Data Entry
   *
   * @param applicationDataEntry Application Data Entry to edit
   */
  editApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;

  /**
   * Deletes a given Application Data Entry
   *
   * @param applicationDataEntry Application Data Entry to delete
   */
  deleteApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;

  /**
   * Gets the Application Data Entry which has the given key
   *
   * @param key the Key of the Application Data Entry to retrieve
   */
  getApplicationDataEntryByKey(key: string): ApplicationDataEntry | undefined;

  /**
   * Gets the Application Data Entry which has the given value
   *
   * @param value the Value of the Application Data Entry to retrieve
   */
  getApplicationDataEntriesByValue(value: any): ApplicationDataEntry[];

  /**
   * Sets the title of the Application Toolbar
   *
   * If not set, then the default is 'Application'
   *
   * @param title text to use for the Application toolbar
   */
  SetApplicationToolbarTitle(title: string): void;
}
